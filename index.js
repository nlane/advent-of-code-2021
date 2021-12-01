import days from './src/index.js';

const dayToCode = {
  "1" : days.day1
}

const main = () => {
  const day = process.argv[2];

  if (!day || !dayToCode[day]) {
    console.log("Please provide a valid day number");
    return
  }

  dayToCode[day]();
}

main();
