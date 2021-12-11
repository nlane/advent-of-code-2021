import { read2D } from "../utils/index.js";

const increaseEnergy = (octos) => {
  const flashers = [];
  octos.forEach((row, rowIdx) => {
    row.forEach((octo, octIdx) => {
      octos[rowIdx][octIdx] += 1;
      if (octo === 9) flashers.push([rowIdx, octIdx]);
    });
  });
  return flashers;
};

const increaseAdjEnergy = ([i, j], octos) => {
  const newFlashers = [];
  for (let row = i - 1; row <= i + 1; row++) {
    for (let col = j - 1; col <= j + 1; col++) {
      if (row > -1 && col > -1 && row < octos.length && col < octos[0].length) {
        octos[row][col] += 1;
        if (octos[row][col] === 10) newFlashers.push([row, col]);
      }
    }
  }
  return newFlashers;
};

const flash = (octos, flashers, total) => {
  let newTotal = total;
  while (flashers.length) {
    newTotal += 1;
    const [i, j] = flashers.pop();
    const newFlashers = increaseAdjEnergy([i, j], octos);
    flashers.unshift(...newFlashers);
  }
  return newTotal;
};

const resetFlashers = (octos) => {
  let numReset = 0;
  octos.forEach((row, rowIdx) => {
    row.forEach((octo, octIdx) => {
      if (octo > 9) {
        octos[rowIdx][octIdx] = 0;
        numReset++;
      }
    });
  });
  return numReset;
};

export default () => {
  const input = read2D("src/inputs/day11.txt");

  let count = 0;
  for (let i = 0; i < 100; i++) {
    const newFlashers = increaseEnergy(input);
    count = flash(input, newFlashers, count);
    resetFlashers(input);
  }

  console.log(count);

  let stepCount = 0;

  count = 0;
  while (1) {
    stepCount++;
    const newFlashers = increaseEnergy(input);
    const newCount = flash(input, newFlashers, count);
    resetFlashers(input);
    if (newCount - count === 100) break;
    count = newCount;
  }

  console.log("Part 2: ", stepCount + 100);
  //   console.log(input);
};
