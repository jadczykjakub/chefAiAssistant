import { z } from 'zod';
import { apiUrls } from './config';

const questionsSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      category: z.string(),
    })
  ),
});

export type Questions = z.infer<typeof questionsSchema>;

export const getQuestions = async (): Promise<Questions> => {
  const response = await fetch(apiUrls.form.getQuestions);

  if (!response.ok) throw new Error('Failed to fetch questions');

  const data = await response.json();
  return questionsSchema.parse(data);
};

export const sendQuestionAnswer = async ({
  sessionId,
  questionId,
  userAnswer,
}: {
  sessionId: string;
  questionId: string;
  userAnswer: string;
}) => {
  const response = await fetch(apiUrls.form.step, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      data: {
        questionId,
        userAnswer,
      },
    }),
  });

  if (!response.ok) throw new Error('Failed to fetch questions');
};
