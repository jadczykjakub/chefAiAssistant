import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { GroqApiWrapper } from '../infra/aiClient';
import z from 'zod';

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
      content:
        "Jesteś asystentem kulinarnym, który pomaga przygotować specyfikację wydarzenia dla prywatnego szefa kuchni.  \
          Na podstawie zamieszczonej poniżej rozmowy wygeneruj notatkę oraz listę pytań potrzebnych do doprecyzowania szczegółów.  \
          Notatkę przedstaw w formacie Markdown, dbając o estetyczne i przejrzyste formatowanie.  \
          Wynik końcowy zwróć w formacie JSON, zawierając pola:  \
          - 'note': notatka w Markdown,  \
          - 'questions': tablica obiektów w formacie {'id': 'id pytania np. time_guests_arrive', 'text': 'tekst pytania', \
          'category': GENERAL_INFO = Informacje o wydarzeniu, \
                      GUESTS = Goście, \
                      DIET_AND_ALLERGIES = Dieta i alergie, \
                      SERVING_STYLE = Styl i forma serwowania, \
                      TASTE_PREFERENCE = Preferencje smakowe, \
                      EQUIPMENT_AND_LOGISTIC = Wyposażenie i logistyka, \
                      SCHEDULE = Harmonogram, \
                      BUDGET = Budżet, \
                      SPECIALS = Oczekiwania specjalne, \
                      FINALIZING = Finalizacja",
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
      content:
        "Jesteś asystentem kulinarnym, który wspiera przygotowanie specyfikacji wydarzenia dla prywatnego szefa kuchni. \
      Na podstawie wcześniejszych wersji notatki oraz poniższej rozmowy wygeneruj nową notatkę oraz — w razie potrzeby — listę pytań \
      niezbędnych do doprecyzowania szczegółów. \
      Notatkę przedstaw w formacie **Markdown**, dbając o przejrzystość i estetykę. \
      Wynik końcowy zwróć w formacie **JSON**, zawierając następujące pola: \
      * **note** — notatka w formacie Markdown, \
      * **questions** — tablica obiektów o strukturze: \
        `{'id': 'np. time_guests_arrive', 'text': 'treść pytania', 'category': ...}` \
        Dostępne kategorie: \
        GENERAL_INFO — Informacje o wydarzeniu \
        GUESTS — Goście \
        DIET_AND_ALLERGIES — Dieta i alergie \
        SERVING_STYLE — Styl i forma serwowania \
        TASTE_PREFERENCE — Preferencje smakowe \
        EQUIPMENT_AND_LOGISTIC — Wyposażenie i logistyka \
        SCHEDULE — Harmonogram \
        BUDGET — Budżet \
        SPECIALS — Oczekiwania specjalne \
        FINALIZING — Finalizacja",
    },
    {
      role: 'system',
      content: 'Treść popraedniej notatki: ```' + lastNote + '```',
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
