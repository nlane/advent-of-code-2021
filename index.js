import days from "./src/index.js";

const dayToCode = {
  1: days.day1,
  2: days.day2,
  3: days.day3,
  4: days.day4,
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
