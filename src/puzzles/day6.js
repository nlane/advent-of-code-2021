import { readArrayInput } from "../utils/index.js";

const iterateOneDay = (fishes) => {
  const newFish = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fishes.forEach((fish, idx) => {
    if (idx === 0) {
      newFish[6] = fish;
      newFish[8] = fish;
    } else {
      newFish[idx - 1] += fish;
    }
  });
  return newFish;
};

const convertInputIntoBuckets = (input) => {
  // we know that we have only 9 days in the cycle
  // so all fish fit into one of the buckets
  const buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((fish) => {
    buckets[fish] += 1;
  });
  return buckets;
};

export default () => {
  const input = readArrayInput("src/inputs/day6.txt");
  let fishes = convertInputIntoBuckets(input);
  for (let i = 0; i < 256; i++) {
    fishes = iterateOneDay(fishes);
  }

  const total = fishes.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  console.log(total);
};
