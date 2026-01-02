import { getQuestions, sendQuestionAnswer } from '@/services/form';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const form = createQueryKeys('form', {
  questions: {
    queryFn: () => getQuestions(),
    queryKey: null,
  },
});
