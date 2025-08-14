// debounce.tsx
export const debounce = <A extends unknown[]>(
  func: (...args: A) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
