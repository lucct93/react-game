import { useGameCtx } from '@/contexts/gameCtx';
import { useEffect, useState } from 'react';

const MusicBtn = () => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const { isStarted } = useGameCtx();

  useEffect(() => {
    // load mp3 file
    const audio = new Audio('/sound.mp3');
    audio.loop = true;
    if (isMusicOn && isStarted) {
      audio.play();
      audio.volume = 0.1;
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [isMusicOn, isStarted]);

  return (
    <div
      className="w-16 h-16 flex items-center justify-center absolute top-2 left-2 z-10 cursor-pointer"
      onClick={() => setIsMusicOn(!isMusicOn)}
    >
      {isMusicOn ? (
        <img src="/music-on.svg" alt="" />
      ) : (
        <img src="/music-off.svg" alt="" />
      )}
    </div>
  );
};

export default MusicBtn;
