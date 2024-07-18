import { useGameCtx } from '@/contexts/gameCtx';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import Lottie from 'lottie-react';
import congratulation from '@/assets/con-ani.json';

const ModalWin = () => {
  const { questions, countdown, handelPlayAgain, level, setLevel } =
    useGameCtx();

  const shouldShowModal = useMemo(
    () => questions.every((q) => q.isAnswered) && questions.length > 0,
    [questions],
  );

  const star = useMemo(() => {
    if (countdown >= 60) return 3;
    if (countdown >= 30) return 2;

    return 1;
  }, [countdown]);

  useEffect(() => {
    if (shouldShowModal) {
      const audio = new Audio('/level-up.mp3');
      audio.play();
    }
  }, [shouldShowModal]);

  return (
    shouldShowModal && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[100] select-none">
        <Lottie
          animationData={congratulation}
          loop={true}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="w-[200px] h-48 relative">
          <span className="absolute top-1 transform -translate-x-1/2 left-1/2 z-10 font-bold text-xl text-[#964B2B] leading-none uppercase">
            Level up
          </span>
          <img
            src="/modal-level-root-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 flex-col gap-2">
            <span className="text-sm text-[#964B2B] leading-none italic">
              Time: {dayjs().startOf('day').second(countdown).format('mm:ss')}
            </span>
            <div className="relative w-20 h-[60px] flex items-center justify-center">
              <span className="text-[#964B2B] font-extrabold text-xl relative z-10 mb-4">
                {level}
              </span>
              <img
                src="/modal-level-bg.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="flex items-center justify-center absolute -bottom-2 w-full">
                {Array.from({ length: star }).map((_, i) => {
                  return (
                    <img
                      src="/modal-level-star.png"
                      key={i}
                      className="w-6 h-6 object-cover"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <button
            className="absolute bottom-0 w-[110%] h-10 transform -translate-x-1/2 left-1/2 flex items-center justify-center cursor-pointer z-20"
            onClick={
              level === 3 ? () => handelPlayAgain(1) : () => setLevel(level + 1)
            }
          >
            <span className="relative text-white font-bold text-sm z-10">
              {level === 3 ? 'Play again' : 'Next'}
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

export default ModalWin;
