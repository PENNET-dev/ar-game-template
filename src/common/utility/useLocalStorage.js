import { useEffect, useState } from "react";

export function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  //const initial = JSON.parse(saved);
  return saved || defaultValue;
}

export async function setStorageValue(key, value) {
  if (value == null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    setStorageValue(key, value);
  }, [key, value]);

  return [value, setValue];
};
