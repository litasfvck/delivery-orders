import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const isMounted = useRef(true);

  const run = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    return asyncFn()
      .then((data) => {
        if (isMounted.current) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (isMounted.current) setState({ data: null, error, loading: false });
      });
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    run();
    return () => {
      isMounted.current = false;
    };
  }, [run]);

  return { ...state, refetch: run };
}
