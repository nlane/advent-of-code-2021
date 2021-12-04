import { readBingoBoard } from "../utils/index.js";

// sum all the unmarked numbers
// multiply by num
const calcScore = (board, num) => {
  let sum = 0;
  board.forEach((row) => {
    sum += row.reduce((prev, curr) => {
      if (!curr.marked) return prev + curr.value;
      return prev;
    }, 0);
  });
  return sum * num;
};

// check to see if value is on the board
// return index if so
const searchVal = (board, num) => {
  let i, j;
  board.every((row, idx) => {
    i = idx;
    j = row.findIndex((el) => el.value === num);
    if (j !== -1) return false;
    return true;
  });
  if (j !== -1) return [i, j];
  return [];
};

// mark given spot on the board
const markBoard = (board, [i, j]) => {
  board[i][j].marked = true;
};

// check across a given row and col for winning condition
const hasBingo = (board, [i, j]) => {
  const hasRowBingo = board[i].every((spot) => spot.marked);
  if (hasRowBingo) return true;

  const hasColBingo = board.every((row) => row[j].marked);
  return hasColBingo;
};

// loop through all boards
// see if board has value
// if it does mark it
// if it does check that row + col for winning condition
const drawNumber = (boards, num) => {
  let winningBoard = [];
  for (let board of boards) {
    const foundIdx = searchVal(board, num);
    if (foundIdx.length) {
      markBoard(board, foundIdx);
      if (hasBingo(board, foundIdx)) {
        winningBoard = board;
        break;
      }
    }
  }
  return winningBoard;
};

const drawNumberPt2 = (boards, num) => {
  let winningBoards = [];
  boards.forEach((board) => {
    const foundIdx = searchVal(board, num);
    if (foundIdx.length) {
      markBoard(board, foundIdx);
      if (hasBingo(board, foundIdx)) {
        winningBoards.push(board);
      }
    }
  });
  return winningBoards;
};

export default () => {
  let [drawNums, boards] = readBingoBoard("src/inputs/day4.txt");

  // part 1
  for (let num of drawNums) {
    const board = drawNumber(boards, num);
    if (board.length) {
      console.log(calcScore(board, num));
      break;
    }
  }

  // part 2
  const setBoards = new Set(boards);
  let losingBoard = [];
  let num = 0;
  for (let i = 0; i < drawNums.length && setBoards.size > 0; i++) {
    const winningBoards = drawNumberPt2(boards, drawNums[i]);
    if (winningBoards.length) {
      for (let board of winningBoards) {
        losingBoard = board;
        num = drawNums[i];
        if (setBoards.has(board)) setBoards.delete(board);
        if (setBoards.size === 0) break;
      }
    }
  }

  console.log(calcScore(losingBoard, num));
};
