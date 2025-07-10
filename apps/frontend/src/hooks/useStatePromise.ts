import React, { useEffect, useState } from 'react';

export type StatePromiseDispatch<T> = React.Dispatch<
  React.SetStateAction<T | Promise<T> | null>
>;

export function useStatePromise<T>(
  promise: Promise<T>,
): [T | null, StatePromiseDispatch<T>, string | null] {
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<void | T | null>(() => {
    promise.then(val => setValue(val)).catch(setError);
  });
  const [newValue, setNewValue] = useState<T | Promise<T> | null>(null);

  useEffect(() => {
    if (newValue instanceof Promise) {
      newValue.then(setValue).catch(setError);
    } else {
      setValue(newValue);
    }
  }, [newValue, setValue]);

  return [value as T | null, setNewValue, error];
}
