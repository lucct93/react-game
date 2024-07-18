import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'worker-timers';

export const useCountDown = ({
  countStart = 60,
  interval = 1000,
  countStop = 0,
}: {
  countStart?: number;
  interval?: number;
  countStop?: number;
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState(countStart);

  const stop = (timer?: number) => {
    if (timer) clearInterval(timer);
    setIsStarted(false);
  };

  const reset = () => {
    setCount(countStart);
  };

  const start = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === countStop) {
          stop(timer);
          return countStop;
        }
        return prev - 1;
      });
    }, interval);

    return () => {
      stop(timer);
    };
  }, [isStarted, countStop, interval]);

  return { count, start, reset, stop };
};
