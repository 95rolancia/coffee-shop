/* eslint-disable */
export const storage = localStorage;

export const getItem = (key: string, defaultValue: any): any => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setItem = (key: string, value: string): void => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const removeItem = (key: string): void => {
  try {
    storage.removeItem(key);
  } catch {}
};
