import { useState, useEffect } from 'react';

// Baseado em https://stackoverflow.com/a/79584110

export default function useAsyncMemo<T>(
  factory: () => Promise<T>,
  deps: React.DependencyList,
): T | undefined {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    let cancelled = false;

    factory().then(value => {
      if (!cancelled) {
        setResult(value);
      }
    });

    return () => {
      cancelled = true;
    };
  }, deps);

  return result;
}
