import { read2D } from "../utils/index.js";

const isLowPoint = (grid, [i, j]) => {
  const adjNums = [];
  if (i !== 0) adjNums.push(grid[i - 1][j]);
  if (j !== 0) adjNums.push(grid[i][j - 1]);
  if (i !== grid.length - 1) adjNums.push(grid[i + 1][j]);
  if (j !== grid[0].length - 1) adjNums.push(grid[i][j + 1]);
  return adjNums.every((el) => el > grid[i][j]);
};

export default () => {
  const input = read2D("src/inputs/day9.txt");

  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (isLowPoint(input, [i, j])) {
        sum += input[i][j] + 1;
      }
    }
  }

  console.log(sum);
};
