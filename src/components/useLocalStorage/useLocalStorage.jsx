import { useEffect, useState } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem(key));
    if (contacts) {
      return contacts.length === 0 ? defaultValue : contacts;
    } else {
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
