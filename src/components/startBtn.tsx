import { useGameCtx } from '@/contexts/gameCtx';
import clsx from 'clsx';
import dayjs from 'dayjs';

const StartBtn = () => {
  const { handelStart, countdown, isStarted } = useGameCtx();

  return (
    <button
      className={clsx(
        'uppercase mt-10 bg-cover w-48 h-10 flex items-center justify-center font-bold text-xl text-white cursor-pointer z-10 relative',
        {
          'red-flashing': countdown <= 10,
        },
      )}
      style={{
        backgroundImage: 'url(/start-btn.png)',
      }}
      onClick={handelStart}
    >
      {isStarted
        ? dayjs().startOf('day').second(countdown).format('mm:ss')
        : 'Start'}
    </button>
  );
};

export default StartBtn;
