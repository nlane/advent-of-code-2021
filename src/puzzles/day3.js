import { readStringInput } from "../utils/index.js";

let input = readStringInput("src/inputs/day3.txt");

input = input.map((el) => el.split("").map((digit) => parseInt(digit)));

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

  // find oxygen
  const filteredOxy = [];
  let currList = input;
  for (let j = 0; j < currList[0].length && currList.length > 1; j++) {
    const oneBucket = [];
    const zeroBucket = [];
    for (let i = 0; i < currList.length; i++) {
      if (currList[i][j] === 0) zeroBucket.push(currList[i]);
      else oneBucket.push(currList[i]);
    }
    if (oneBucket.length >= zeroBucket.length) currList = oneBucket;
    else currList = zeroBucket;
  }

  const oxy = currList[0];

  // find co2
  const filteredCO2 = [];
  currList = input;
  for (let j = 0; j < currList[0].length && currList.length > 1; j++) {
    const oneBucket = [];
    const zeroBucket = [];
    for (let i = 0; i < currList.length; i++) {
      if (currList[i][j] === 0) zeroBucket.push(currList[i]);
      else oneBucket.push(currList[i]);
    }
    if (oneBucket.length >= zeroBucket.length) currList = zeroBucket;
    else currList = oneBucket;
  }

  const oxyRating = parseInt(oxy.join(""), 2);
  const co2Rating = parseInt(currList[0].join(""), 2);

  console.log(oxyRating * co2Rating);
};
