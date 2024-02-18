export default function useLocalStorage() {
  const get = (key: string, defaultValue?: any) => {
    const value = localStorage.getItem(`website-manager-app:${key}`);

    if (defaultValue !== undefined && value === null) {
      return defaultValue;
    }

    return value;
  };

  const set = (key: string, value: any) => {
    localStorage.setItem(`website-manager-app:${key}`, value);
  };

  return { get, set };
}
