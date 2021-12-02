import { readDirectionalInput } from "../utils/index.js";

const input = readDirectionalInput("src/inputs/day2.txt");

export default () => {
  // part 1
  let coords = [0, 0];
  input.forEach(([dir, units]) => {
    if (dir === "forward") {
      coords[1] += units;
    } else {
      coords[0] = dir === "up" ? coords[0] - units : coords[0] + units;
    }
  });

  console.log(coords);
  console.log(coords[0] * coords[1]);

  // part 2
  coords = [0, 0, 0];
  input.forEach(([dir, units]) => {
    if (dir === "forward") {
      coords[1] += units;
      coords[0] = coords[0] + coords[2] * units;
    } else {
      coords[2] = dir === "up" ? coords[2] - units : coords[2] + units;
    }
  });

  console.log(coords);
  console.log(coords[0] * coords[1]);
};
