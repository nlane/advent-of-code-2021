import { readFileSync } from 'fs';

export const readNumericInput = filename =>
  readFileSync(filename)
    .toString('UTF8')
    .split('\n')
    .map(el => Number(el));
