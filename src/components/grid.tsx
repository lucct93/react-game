import { GAME_LEVELS } from '@/constants';
import Question from './blocks/question';
import { useGameCtx } from '@/contexts/game-context';
import { useEffect, useState } from 'react';

const Grid = () => {
  const { questions, background, level } = useGameCtx();
  const [largeRowIndex, setLargeRowIndex] = useState<number[]>([]);

  const currentLevel = GAME_LEVELS[level];

  useEffect(() => {
    const row = currentLevel.row;

    setLargeRowIndex(
      Array.from({ length: row }, () => {
        return Math.floor(Math.random() * row);
      }),
    );
  }, [currentLevel]);

  return (
    <div className="border-8 border-[#603325] rounded max-w-2xl max-h-[320px] relative z-10 h-full w-full overflow-hidden">
      <div
        className={'grid  bg-cover bg-center bg-no-repeat w-full h-full'}
        style={{
          gridTemplateColumns: `repeat(${currentLevel.col}, 1fr)`,
          backgroundImage: `url(${background})`,
        }}
      >
        {Array.from({ length: currentLevel.row }, (_, i) => {
          return (
            <div
              className="grid"
              style={{
                gridTemplateRows: `repeat(${currentLevel.row + 1}, 1fr)`,
              }}
              key={i}
            >
              {Array.from({ length: currentLevel.col }, (_, j) => {
                const largeIndex = largeRowIndex[i];
                const question = i * currentLevel.col + j;

                if (questions[question] === undefined) {
                  return <div key={i * currentLevel.col + j}></div>;
                }

                return (
                  <div
                    className={largeIndex === j ? 'row-span-2 ' : 'row-span-1'}
                    key={i * currentLevel.col + j}
                  >
                    <Question question={questions[question]} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
