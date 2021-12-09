import days from "./src/index.js";

const dayToCode = {
  1: days.day1,
  2: days.day2,
  3: days.day3,
  4: days.day4,
  5: days.day5,
  6: days.day6,
  7: days.day7,
  8: days.day8,
  9: days.day9,
};

const main = () => {
  const day = process.argv[2];

  if (!day || !dayToCode[day]) {
    console.log("Please provide a valid day number");
    return;
  }

  dayToCode[day]();
};

main();
