import { createId } from '@paralleldrive/cuid2';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { cloneDeep } from 'lodash';
import { twMerge } from 'tailwind-merge';

export const generateQuestion = (
  numCount = 2,
  maxRange = 100,
  operators: string[] = ['+', '-'],
  row: number,
  col: number,
) => {
  let question = '';
  const numbers = [];
  let answer = 0;

  for (let i = 0; i < numCount; i++) {
    numbers.push(Math.floor(Math.random() * maxRange) + 1);
  }

  question = `${numbers[0]}`;
  answer = numbers[0];

  for (let i = 1; i < numCount; i++) {
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const currentNumber = numbers[i];

    if (operator === '-') {
      if (answer < currentNumber) {
        question = `${currentNumber}-${answer}`;
        answer = currentNumber - answer;
      } else {
        question += `-${currentNumber}`;
        answer -= currentNumber;
      }
    } else if (operator === '+') {
      question += `+${currentNumber}`;
      answer += currentNumber;
    } else if (operator === 'x') {
      question += `x${currentNumber}`;
      answer *= currentNumber;
    }
  }

  return {
    question: `${question}=`,
    answer,
    id: createId(),
    isAnswered: undefined,
    row,
    col,
  };
};

export const randomizeQuestions = (
  questions: ReturnType<typeof generateQuestion>[],
) => {
  const results = cloneDeep(questions);

  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }

  return results;
};

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};
