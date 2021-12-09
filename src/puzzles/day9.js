import { read2D } from "../utils/index.js";

const isLowPoint = (grid, [i, j]) => {
  const adjNums = [];
  if (i !== 0) adjNums.push(grid[i - 1][j]);
  if (j !== 0) adjNums.push(grid[i][j - 1]);
  if (i !== grid.length - 1) adjNums.push(grid[i + 1][j]);
  if (j !== grid[0].length - 1) adjNums.push(grid[i][j + 1]);
  return adjNums.every((el) => el > grid[i][j]);
};

const dfs = (grid, [i, j]) => {
  if (
    i > -1 &&
    j > -1 &&
    i < grid.length &&
    j < grid[0].length &&
    grid[i][j] !== 9
  ) {
    grid[i][j] = 9;
    return (
      1 +
      dfs(grid, [i + 1, j]) +
      dfs(grid, [i, j + 1]) +
      dfs(grid, [i - 1, j]) +
      dfs(grid, [i, j - 1])
    );
  }
  return 0;
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

  console.log("Part 1: ", sum);

  let basins = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== 9) {
        basins.push(dfs(input, [i, j]));
      }
    }
  }

  basins = basins.sort((a, b) => {
    if (a < b) return 1;
    else return -1;
  });

  console.log("Part 2: ", basins[0] * basins[1] * basins[2]);
};
