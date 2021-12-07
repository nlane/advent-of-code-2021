import { readArrayInput } from "../utils/index.js";

const calculateFuelPt1 = (position, crabs) => {
  let sum = 0;
  crabs.forEach((crab) => (sum += Math.abs(position - crab)));
  return sum;
};

const calculateFuelPt2 = (position, crabs) => {
  let sum = 0;

  crabs.forEach((crab) => {
    const diff = Math.abs(position - crab);
    sum += (diff * (diff + 1)) / 2;
  });

  return sum;
};

export default () => {
  const input = readArrayInput("src/inputs/day7.txt");

  let positions = {};
  let minFuel = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    const position = input[i];
    if (!positions[position]) {
      positions[position] = calculateFuelPt1(position, input);
      if (positions[position] < minFuel) minFuel = positions[position];
    }
  }

  console.log(minFuel);

  positions = {};
  minFuel = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    const position = input[i];
    if (!positions[position]) {
      positions[position] = calculateFuelPt2(position, input);
      if (positions[position] < minFuel) minFuel = positions[position];
    }
  }

  console.log(minFuel);
};
