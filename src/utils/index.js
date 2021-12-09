import { readFileSync } from "fs";

const UTF = "UTF8";

export const readNumericInput = (filename) =>
  readFileSync(filename)
    .toString(UTF)
    .split("\n")
    .map((el) => Number(el));

export const readStringInput = (filename) =>
  readFileSync(filename).toString("UTF8").split("\n");

export const readDirectionalInput = (filename) => {
  return readFileSync(filename)
    .toString(UTF)
    .split("\n")
    .map((el) => {
      let newEl = el.split(" ");
      newEl[1] = parseInt(newEl[1]);
      return newEl;
    });
};

export const readBingoBoard = (filename) => {
  const contents = readFileSync(filename).toString(UTF).split("\n");
  const drawnNums = contents
    .shift()
    .split(",")
    .map((el) => parseInt(el));
  const boards = [];
  let boardCount = 0;
  contents.forEach((bingoBoard) => {
    if (bingoBoard === "") return;
    if (boardCount % 5 === 0) boards.push([]);
    boardCount += 1;
    boards[boards.length - 1].push(
      bingoBoard
        .split(" ")
        .filter((el) => el !== "")
        .map((el) => ({ marked: false, value: parseInt(el.trim()) }))
    );
  });
  return [drawnNums, boards];
};

export const readCoordInput = (filename) => {
  const contents = readFileSync(filename).toString(UTF).split("\n");
  return contents.map((row) =>
    row
      .split(" -> ")
      .map((coords) => coords.split(",").map((str) => parseInt(str)))
  );
};

export const readArrayInput = (filename) => {
  return readFileSync(filename)
    .toString(UTF)
    .split(",")
    .map((el) => parseInt(el));
};

export const readSignalInput = (filename) => {
  return readFileSync(filename)
    .toString(UTF)
    .split("\n")
    .map((row) => row.split(" | "))
    .map((row) => {
      const output = {};
      output.signals = row[0].split(" ");
      output.digits = row[1].split(" ");
      return output;
    });
};

export const read2D = (filename) => {
  return readFileSync(filename)
    .toString(UTF)
    .split("\n")
    .map((row) => row.split("").map((el) => parseInt(el)));
};
