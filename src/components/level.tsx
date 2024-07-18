import { useGameCtx } from '@/contexts/gameCtx';

const Level = () => {
  const { level } = useGameCtx();

  return (
    <div
      className="w-24 h-10 flex items-center justify-center top-5 right-0 absolute z-10 text-white font-bold text-sm"
      style={{
        backgroundImage: 'url(/level.png)',
      }}
    >
      Level {level}
    </div>
  );
};

export default Level;
