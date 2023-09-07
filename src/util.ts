export const INTEGER_MAX = 2147483647;

export const bound = (min: number, max: number, fraction: number) =>
  Math.floor(min + (max - min + 1) * fraction);
