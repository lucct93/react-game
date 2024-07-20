import { GAME_LEVELS } from '@/constants';
import { useCountDown } from '@/hooks/useCountDown';
import { useDidUpdate } from '@/hooks/useDidUpdate';
import { TQuestion } from '@/types';
import { generateQuestion, randomizeQuestions } from '@/utils';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type TGameCtx = {
  questions: TQuestion[];
  background: string;
  answers: TQuestion[];
  setBackground: (background: string) => void;
  selectAnswer: TQuestion | null;
  handelDrop: (answer: TQuestion, question: TQuestion) => void;
  setSelectAnswer: React.Dispatch<React.SetStateAction<TQuestion | null>>;
  isStarted: boolean;
  handelStart: () => void;
  countdown: number;
  level: number;
  setLevel: (level: number) => void;
  handelPlayAgain: (newLevel?: number) => void;
  handelCheat: () => void;
};

const GameContext = createContext<TGameCtx | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [level, setLevel] = useState(1);
  const [selectAnswer, setSelectAnswer] = useState<TQuestion | null>(null);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [answers, setAnswers] = useState<TQuestion[]>([]);
  const [background, setBackground] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const {
    count: countdown,
    start: startCountDown,
    stop: stopCountDown,
    reset: resetCountDown,
  } = useCountDown({
    countStart: 90,
  });

  useEffect(() => {
    let background =
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg';

    switch (level) {
      case 1:
        background =
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg';
        break;
      case 2:
        background =
          'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=600';
        break;
      case 3:
        background =
          'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600';
        break;
      default:
        background =
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg';
        break;
    }

    setBackground(background);
  }, [level]);

  const handelCheat = () => {
    setIsStarted(true);
    setQuestions((prev) => {
      return prev.map((q) => {
        return { ...q, isAnswered: true };
      });
    });

    setAnswers((prev) => {
      return prev.map((q) => {
        return { ...q, isAnswered: true };
      });
    });
  };

  const handelDrop = (answer: TQuestion, question: TQuestion) => {
    const isCorrect = answer.answer === question.answer;

    setAnswers((prev) => {
      const targetQuestion = prev.find(
        (q) => q.answer === answer.answer && !q.isAnswered,
      );

      if (targetQuestion) {
        return prev.map((q) => {
          if (q.id === targetQuestion.id) {
            return { ...q, isCorrect };
          }
          return q;
        });
      }
      return prev;
    });
    setQuestions((prev) => {
      const targetQuestion = prev.find(
        (q) =>
          q.answer === question.answer &&
          !q.isAnswered &&
          q.row === question.row &&
          q.col === question.col,
      );

      if (targetQuestion) {
        return prev.map((q) => {
          if (q.id === targetQuestion.id) {
            return { ...q, isCorrect };
          }
          return q;
        });
      }
      return prev;
    });

    let timer: number | null = null;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      setQuestions((prev) => {
        return prev.map((q) => {
          if (q.isCorrect) {
            return { ...q, isAnswered: true };
          } else {
            return {
              ...q,
              isCorrect: undefined,
            };
          }
        });
      });

      setAnswers((prev) => {
        return prev.map((q) => {
          if (q.isCorrect) {
            return { ...q, isAnswered: true };
          } else {
            return {
              ...q,
              isCorrect: undefined,
            };
          }
        });
      });
    }, 500);

    setSelectAnswer(null);
  };

  const handelStart = () => {
    if (isStarted) return;

    setIsStarted(true);
    startCountDown();
  };

  const handelSetQuestions = useCallback(() => {
    const currentLevel = GAME_LEVELS[level as keyof typeof GAME_LEVELS];

    const newQuestions = Array.from({ length: currentLevel.row }, (_, i) =>
      Array.from({ length: currentLevel.col }, (_, j) =>
        generateQuestion(
          currentLevel.numCount,
          currentLevel.maxRange,
          currentLevel.operators,
          i,
          j,
        ),
      ),
    );

    setQuestions(randomizeQuestions(newQuestions.flat()));
    setAnswers(randomizeQuestions(newQuestions.flat()));
  }, [level]);

  const handelPlayAgain = (newLevel?: number) => {
    resetCountDown();
    handelSetQuestions();
    startCountDown();

    if (newLevel) {
      setLevel(newLevel);
    }
  };

  useEffect(() => {
    handelSetQuestions();
  }, [handelSetQuestions]);

  useEffect(() => {
    const isAllAnswered = questions.every((q) => q.isAnswered);

    if (!isAllAnswered) return;

    stopCountDown();
  }, [questions]);

  useDidUpdate(() => {
    resetCountDown();
    startCountDown();
  }, [level]);

  return (
    <GameContext.Provider
      value={{
        questions,
        background,
        setBackground,
        handelDrop,
        answers,
        isStarted,
        handelStart,
        countdown,
        level,
        selectAnswer,
        setSelectAnswer,
        setLevel,
        handelPlayAgain,
        handelCheat,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameCtx = () => {
  const ctx = useContext(GameContext);

  if (!ctx) {
    throw new Error('useGameCtx must be used within GameProvider');
  }

  return ctx;
};
