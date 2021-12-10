import { read2DStr } from "../utils/index.js";

const LEFT = { "(": ")", "[": "]", "{": "}", "<": ">" };
const SCORE = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const SCORE_PT2 = { ")": 1, "]": 2, "}": 3, ">": 4 };

const checkLine = (line) => {
  const stack = [];
  const result = {};
  for (const c of line) {
    if (LEFT[c]) {
      stack.push(c);
    } else {
      const match = stack.pop();
      if (LEFT[match] !== c) {
        result.status = "CORRUPT";
        result.character = c;
        return result;
      }
    }
  }
  result.rest = stack.map((c) => LEFT[c]);
  return result;
};

export default () => {
  const input = read2DStr("src/inputs/day10.txt");

  let score = 0;
  let scores = [];
  input.forEach((row) => {
    const result = checkLine(row);
    if (result.status === "CORRUPT") {
      score += SCORE[result.character];
    } else {
      // get the end part
      scores.push(
        result.rest.reverse().reduce((prev, curr) => {
          return prev * 5 + SCORE_PT2[curr];
        }, 0)
      );
    }
  });

  console.log(score);
  scores.sort((a, b) => (a < b ? -1 : 1));
  const middle = (scores.length - 1) / 2;
  console.log(scores[middle]);
};
