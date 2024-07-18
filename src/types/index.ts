import { generateQuestion } from '@/utils';

export type TQuestion = Omit<
   ReturnType<typeof generateQuestion>,
   'isAnswered'
> & {
   isCorrect?: boolean;
   isAnswered?: boolean;
};
