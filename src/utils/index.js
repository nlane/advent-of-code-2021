import { readFileSync } from "fs";

export const readNumericInput = (filename) =>
  readFileSync(filename)
    .toString("UTF8")
    .split("\n")
    .map((el) => Number(el));

export const readStringInput = (filename) =>
  readFileSync(filename).toString("UTF8").split("\n");

export const readDirectionalInput = (filename) => {
  return readFileSync(filename)
    .toString("UTF8")
    .split("\n")
    .map((el) => {
      let newEl = el.split(" ");
      newEl[1] = parseInt(newEl[1]);
      return newEl;
    });
};
