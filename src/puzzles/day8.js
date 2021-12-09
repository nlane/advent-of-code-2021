import { readSignalInput } from "../utils/index.js";

const findMapping = (inputRow) => {
  const digitTracker = {};
  const mapping = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
  };
  const byLength = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };
  const allData = [...inputRow.digits, ...inputRow.signals];
  allData.forEach((signal) => {
    if (signal.length === 3) digitTracker["7"] = signal;
    if (signal.length === 2) digitTracker["1"] = signal;
    if (signal.length === 4) digitTracker["4"] = signal;
    if (signal.length === 7) digitTracker["8"] = signal;
    byLength[String(signal.length)].push(signal);
  });

  // find a
  digitTracker["7"].split("").forEach((c) => {
    if (digitTracker["1"].search(c) === -1) {
      mapping.a = c;
    }
  });

  // find c and f
  const optionsCF = digitTracker["1"].split("");
  if (byLength["6"].every((signal) => signal.search(optionsCF[0]) !== -1)) {
    mapping.f = optionsCF[0];
    mapping.c = optionsCF[1];
  } else {
    mapping.f = optionsCF[1];
    mapping.c = optionsCF[0];
  }

  // find b and d
  let optionsBD = [];
  digitTracker["4"].split("").forEach((c) => {
    if (c !== mapping.c && c != mapping.f) {
      optionsBD.push(c);
    }
  });

  if (byLength["5"].every((signal) => signal.search(optionsBD[0]) !== -1)) {
    mapping.d = optionsBD[0];
    mapping.b = optionsBD[1];
  } else {
    mapping.d = optionsBD[1];
    mapping.b = optionsBD[0];
  }

  // find g
  const filteredFives = byLength["5"].map((signal) => {
    return signal
      .replace(mapping.a, "")
      .replace(mapping.b, "")
      .replace(mapping.c, "")
      .replace(mapping.d, "")
      .replace(mapping.f, "");
  });
  for (let i = 0; i < filteredFives.length; i++) {
    if (filteredFives[i].length === 1) {
      mapping.g = filteredFives[i];
      break;
    }
  }

  // find E

  for (let i = 0; i < filteredFives.length; i++) {
    if (filteredFives[i].length === 2) {
      mapping.e = filteredFives[i].replace(mapping.g, "");
    }
  }

  return mapping;
};

const mappingToDigits = (mapping) => {
  const digits = {};
  let signal = [
    mapping.a,
    mapping.b,
    mapping.c,
    mapping.e,
    mapping.f,
    mapping.g,
  ]
    .sort()
    .join("");
  digits[signal] = 0;

  signal = [mapping.c, mapping.f].sort().join("");
  digits[signal] = 1;

  signal = [mapping.a, mapping.c, mapping.d, mapping.e, mapping.g]
    .sort()
    .join("");
  digits[signal] = 2;

  signal = [mapping.a, mapping.c, mapping.d, mapping.f, mapping.g]
    .sort()
    .join("");
  digits[signal] = 3;

  signal = [mapping.b, mapping.c, mapping.d, mapping.f].sort().join("");
  digits[signal] = 4;

  signal = [mapping.a, mapping.b, mapping.d, mapping.f, mapping.g]
    .sort()
    .join("");
  digits[signal] = 5;

  signal = [mapping.a, mapping.b, mapping.d, mapping.e, mapping.f, mapping.g]
    .sort()
    .join("");
  digits[signal] = 6;

  signal = [mapping.a, mapping.c, mapping.f].sort().join("");
  digits[signal] = 7;

  signal = [
    mapping.a,
    mapping.b,
    mapping.c,
    mapping.d,
    mapping.e,
    mapping.f,
    mapping.g,
  ]
    .sort()
    .join("");
  digits[signal] = 8;

  signal = [mapping.a, mapping.b, mapping.c, mapping.d, mapping.f, mapping.g]
    .sort()
    .join("");
  digits[signal] = 9;

  return digits;
};

export default () => {
  const input = readSignalInput("src/inputs/day8.txt");
  let count = 0;
  const uniqueLens = [3, 4, 2, 7];
  for (const row of input) {
    row.digits.forEach((digit) => {
      if (uniqueLens.find((el) => el === digit.length)) count++;
    });
  }

  console.log(count);

  let sums = 0;
  input.forEach((row) => {
    const mapping = findMapping(row);
    const digits = mappingToDigits(mapping);

    const [d1, d2, d3, d4] = row.digits;
    sums += +`${digits[d1.split("").sort().join("")]}${
      digits[d2.split("").sort().join("")]
    }${digits[d3.split("").sort().join("")]}${
      digits[d4.split("").sort().join("")]
    }`;
  });

  console.log(sums);
};
