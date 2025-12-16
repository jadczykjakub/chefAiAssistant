import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { GroqApiWrapper } from '../infra/aiClient';
import z from 'zod';
import { INITIAL_NOTE_BASE_PROMPT, REFINE_NOTE_BASE_PROMPT } from '../agents/chefAgent';

const groqInstance = new GroqApiWrapper();

export type SendMessageToModelArguments = {
  systemMessage: string;
  userMessage: string;
};

export const modelResponseSchema = z.object({
  note: z.string(),
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      category: z.string(),
    }),
  ),
});

export type ModelResponse = z.infer<typeof modelResponseSchema>;

export const generateInitialNote = async (conversation: SendMessageToModelArguments[]) => {
  const conversationMessages: ChatCompletionMessageParam[] = conversation.flatMap((item) => [
    {
      role: 'system',
      content: item.systemMessage,
    },
    {
      role: 'user',
      content: item.userMessage,
    },
  ]);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: INITIAL_NOTE_BASE_PROMPT,
    },
    ...conversationMessages,
  ];

  return sendMessageToModel(messages);
};

export const generateRefinedNote = (
  conversation: SendMessageToModelArguments[],
  lastNote: string,
) => {
  const conversationMessages: ChatCompletionMessageParam[] = conversation.flatMap((item) => [
    {
      role: 'system',
      content: item.systemMessage,
    },
    {
      role: 'user',
      content: item.userMessage,
    },
  ]);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: REFINE_NOTE_BASE_PROMPT,
    },
    {
      role: 'system',
      content: 'Previous note content: ```' + lastNote + '```',
    },
    ...conversationMessages,
  ];

  return sendMessageToModel(messages);
};

const sendMessageToModel = async (conversationTranscription: ChatCompletionMessageParam[]) => {
  try {
    console.log('Requesting completion...');
    const modelResponse = await groqInstance.generateChatCompletion(conversationTranscription);

    const responseRawJSON = modelResponse.choices[0].message.content;
    if (!responseRawJSON) throw new Error('Model not answering');

    console.log('\n✅ Groq API Success!');
    console.log(`Model Used: ${modelResponse.model}`);
    console.log(`Assistant's Response:\n---`);
    console.log(responseRawJSON);
    console.log(`---`);
    console.log(`Total Tokens Used: ${modelResponse.usage?.total_tokens}`);

    return parseModelResponse(responseRawJSON);
  } catch (error) {
    console.error('❌ Application Error:', error);

    throw new Error('Model not answering');
  }
};

const parseModelResponse = (rawJson: string | null): ModelResponse => {
  return modelResponseSchema.parse(JSON.parse(rawJson ?? ''));
};
