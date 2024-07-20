import { ItemTypes } from '@/constants';
import { useGameCtx } from '@/contexts/game-context';
import { useDidUpdate } from '@/hooks/useDidUpdate';
import { TQuestion } from '@/types';
import { cn } from '@/utils';
import { useDrop } from 'react-dnd';

type Props = {
  question: TQuestion;
};

const Question = ({ question }: Props) => {
  const { handelDrop, isStarted, selectAnswer } = useGameCtx();
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.QUESTION,
      drop: (item: TQuestion) => {
        handelDrop(item, question);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [question],
  );

  useDidUpdate(() => {
    if (question?.isCorrect === undefined) return;

    if (question?.isCorrect) {
      const audio = new Audio('/correct.mp3');
      audio.play();
    } else {
      const audio = new Audio('/error.mp3');
      audio.play();
    }
  }, [question?.isCorrect]);

  return (
    <div
      ref={drop}
      className={cn(
        'border-2 flex items-center justify-center select-none !cursor-pointer h-full bg-[#EACE8E] border-[#603325] w-full text-2xl font-medium relative ',
        {
          'opacity-0 invisible': question.isAnswered,
          'border-transparent': question.isCorrect,
        },
      )}
      data-row={question.row}
      data-col={question.col}
      onClick={() => {
        if (!isStarted) return;
        if (selectAnswer) {
          handelDrop(selectAnswer, question);
        }
      }}
    >
      {question.isCorrect !== undefined ? (
        question.isCorrect ? (
          <div className="bg-green-500/60 absolute inset-0 flex items-center justify-center">
            <img
              src="/correct-check.png"
              className="w-7 h-7 object-contain relative z-10"
            />
            <img
              src="/congratulations.png"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        ) : (
          <div className="bg-red-500/60 absolute inset-0 flex items-center justify-center">
            <img
              src="/in-correct-check.png"
              className="w-7 h-7 object-contain"
            />
          </div>
        )
      ) : null}
      {isStarted ? (
        question.question
      ) : (
        <img src="/star.svg" className="w-10 h-10" />
      )}
    </div>
  );
};

export default Question;
