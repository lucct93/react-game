import { useEffect, useRef } from 'react';

export const useDidUpdate = (fn: () => void, deps: unknown[]) => {
  const hasMount = useRef(false);
  useEffect(() => {
    if (hasMount.current) {
      fn();
    } else {
      hasMount.current = true;
    }
  }, deps);
};
