import { readCoordInput } from "../utils/index.js";

const diagonalCase = (board, [x1, y1], [x2, y2], globalCount) => {
  const xModifier = x1 < x2 ? 1 : -1;
  const yModifier = y1 < y2 ? 1 : -1;
  let newX = x1;
  let newY = y1;
  while (newX !== x2 && newY !== y2) {
    board[newX][newY] += 1;
    if (board[newX][newY] === 2) globalCount++;
    newX = newX + xModifier;
    newY = newY + yModifier;
  }
  board[newX][newY] += 1;
  if (board[newX][newY] === 2) globalCount++;
  return globalCount;
};

const drawLine = (board, [x1, y1], [x2, y2], globalCount) => {
  if (x1 !== x2 && y1 !== y2)
    return diagonalCase(board, [x1, y1], [x2, y2], globalCount);
  if (Math.abs(x1 - x2) !== 0) {
    // fill in the Xs
    let smaller = x1 < x2 ? x1 : x2;
    const bigger = x1 < x2 ? x2 : x1;
    while (smaller <= bigger) {
      board[smaller][y1] += 1;
      if (board[smaller][y1] == 2) globalCount++;
      smaller++;
    }
  } else if (Math.abs(y1 - y2) !== 0) {
    // fill in the Ys
    let smaller = y1 < y2 ? y1 : y2;
    const bigger = y1 < y2 ? y2 : y1;
    while (smaller <= bigger) {
      board[x1][smaller] += 1;
      if (board[x1][smaller] == 2) globalCount++;
      smaller++;
    }
  } else {
    // technically I don't think we have to cover this case but let's see
    board[x1][y1] += 1;
    if (board[x1][y1] === 2) globalCount++;
  }
  return globalCount;
};

export default () => {
  const input = readCoordInput("src/inputs/day5.txt");
  const board = Array.from(Array(1000), () => new Array(1000).fill(0));
  let count = 0;
  input.forEach((row) => {
    count = drawLine(board, row[0], row[1], count);
  });
  console.log(count);
};
