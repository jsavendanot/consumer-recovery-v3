import { useEffect, useRef } from 'react';

type Hook = (callback: () => void) => void;

const useInterval: Hook = callback => {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
};

export default useInterval;
