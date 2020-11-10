import { generator } from "random-number";

export const useImageRandomizer = generator({
  min: 1,
  max: 3,
  integer: true,
});
