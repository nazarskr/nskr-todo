import { Priority } from '../enums';

export const priorityMap = () =>
  Object.keys(Priority)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key: key.toLowerCase(),
      value: Priority[key as keyof typeof Priority],
    }));
