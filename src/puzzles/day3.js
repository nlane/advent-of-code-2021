import { readStringInput } from "../utils/index.js";

let input = readStringInput("src/inputs/day3.txt");

input = input.map((el) => el.split("").map((digit) => parseInt(digit)));

const RATING_TYPE = {
  oxy: "OXYGEN",
  co: "CO2",
};

const findRating = (input, idx, type) => {
  if (input.length === 1) return input[0];
  const zeros = [];
  const ones = [];
  input.forEach((num) => {
    if (num[idx] === 1) ones.push(num);
    else zeros.push(num);
  });
  if (ones.length >= zeros.length && type === RATING_TYPE.oxy)
    return findRating(ones, idx + 1, type);
  else if (ones.length < zeros.length && type === RATING_TYPE.co)
    return findRating(ones, idx + 1, type);
  return findRating(zeros, idx + 1, type);
};

export default () => {
  // part 1
  const gamma = [];
  const epsilon = [];
  for (let j = 0; j < input[0].length; j++) {
    let runningSum = 0;
    for (let i = 0; i < input.length; i++) {
      runningSum += input[i][j];
    }
    if (runningSum < input.length / 2) {
      gamma.push(0);
      epsilon.push(1);
    } else {
      gamma.push(1);
      epsilon.push(0);
    }
  }

  const gammaDec = parseInt(gamma.join(""), 2);
  const epsilonDec = parseInt(epsilon.join(""), 2);

  console.log(gammaDec * epsilonDec);

  // part 2

  const oxy = findRating(input, 0, RATING_TYPE.oxy);

  const co2 = findRating(input, 0, RATING_TYPE.co);

  const oxyRating = parseInt(oxy.join(""), 2);
  const co2Rating = parseInt(co2.join(""), 2);

  console.log(oxyRating * co2Rating);
};
