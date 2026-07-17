import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Выполняет асинхронную функцию и следит за состояниями
 * loading / error / data. deps аналогичны зависимостям useEffect —
 * запрос перезапускается при их изменении.
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    run();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return { ...state, refetch: run };
}
