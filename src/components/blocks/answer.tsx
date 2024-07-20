import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants';
import { TQuestion } from '@/types';

import clsx from 'clsx';
import { useGameCtx } from '@/contexts/game-context';

type Props = {
  question: TQuestion;
};

const Answer = ({ question }: Props) => {
  const { isStarted, setSelectAnswer, selectAnswer } = useGameCtx();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.QUESTION,
      item: {
        ...question,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
      canDrag: isStarted,
    }),
    [question, isStarted],
  );

  return (
    <div
      ref={drag}
      style={{
        opacity,
        paddingTop: 'calc(100% * 16 / 15)',
      }}
      onClick={() => {
        setSelectAnswer((prev: TQuestion | null) => {
          if (prev === question) return null;
          const audio = new Audio('/select.mp3');
          audio.play();
          return question;
        });
      }}
      className={clsx(
        'flex items-center justify-center select-none !cursor-pointer flex-shrink-0 relative w-full duration-300',
        {
          'transform scale-105': selectAnswer === question,
        },
      )}
    >
      <img
        src="/answer.svg"
        alt=""
        className="absolute inset-0 w-full h-full"
        draggable="false"
      />
      {isStarted ? (
        <span
          className="text-[#982266] font-bold text-2xl absolute z-10
               inset-0 flex items-center justify-center w-full h-full"
        >
          {question.answer}
        </span>
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img
            src="/star.svg"
            className="w-6 h-6 relative z-10"
            draggable="false"
          />
        </div>
      )}
    </div>
  );
};

export default Answer;
