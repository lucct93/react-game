import { useGameCtx } from '@/contexts/game-context';
import { useEffect, useMemo } from 'react';

const ModalLoss = () => {
  const { questions, countdown, handelPlayAgain } = useGameCtx();

  const shouldShowModal = useMemo(
    () =>
      questions.some((q) => !q.isAnswered) &&
      questions.length > 0 &&
      countdown === 0,
    [countdown, questions],
  );

  useEffect(() => {
    if (shouldShowModal) {
      const audio = new Audio('/game-over.mp3');
      audio.play();
    }
  }, [shouldShowModal]);

  return (
    shouldShowModal && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[100] select-none">
        <div className="w-[250px] h-48 relative">
          <span className="absolute top-1 transform -translate-x-1/2 left-1/2 z-10 font-bold text-xl text-[#964B2B] leading-none uppercase">
            Time out
          </span>
          <img
            src="/modal-level-root-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 flex-col gap-2">
            <span className="text-lg text-[#964B2B] leading-none italic text-center">
              I&lsquo;m sorry,
              <br />
              but you can try again
            </span>
            <div className="relative w-16 h-14">
              <img
                src="/modal-loss.png"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <button
            className="absolute bottom-0 w-[110%] h-10 transform -translate-x-1/2 left-1/2 flex items-center justify-center cursor-pointer z-20"
            onClick={() => handelPlayAgain()}
          >
            <span className="relative text-white font-bold text-sm z-10">
              Play again
            </span>
            <img
              src="/modal-btn.png"
              alt=""
              className="w-full h-full object-cover absolute inset-0"
              draggable="false"
            />
          </button>
        </div>
      </div>
    )
  );
};

export default ModalLoss;
