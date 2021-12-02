import { readNumericInput } from "../utils/index.js";

const input = readNumericInput("src/inputs/day1.txt");

export default () => {
  const countPart1 = input.reduce((prev, curr, idx) => {
    if (idx === 0) return prev;
    if (input[idx - 1] < curr) return prev + 1;
    return prev;
  }, 0);

  console.log(countPart1);

  const countPart2 = input.reduce((prev, curr, idx) => {
    const prevSum = input[idx - 3] + input[idx - 2] + input[idx - 1];
    const currSum = input[idx - 2] + input[idx - 1] + input[idx];
    if (idx < 3 || currSum <= prevSum) return prev;
    return prev + 1;
  }, 0);

  console.log(countPart2);
};
