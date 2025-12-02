// Build map of id => number of invalid ids up to and including the current id. Then to count invalid ids per range,
// subtract the number of invalids at the lower end from the upper end. Sum the differences for all ranges.

import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./02/input.txt', 'utf8')).split('\n') as Array<string>;
  
  let ranges: Array<[number, number]> = [];
  for (const line of input) {
    const rangeStrings = line.split(',');

    for (const range of rangeStrings) {
      let [left, right] = range.split('-').map(Number);
      if (left && right) ranges.push([left, right]);
    }
  }

  let result = 0;

  for (const [rangeMin, rangeMax] of ranges) {
    for (let i = rangeMin; i <= rangeMax; i++) {
      if (isInvalid(i)) result += i;
    }
  }

  return result;
}

function isInvalid(id: number): boolean {
  let idString = String(id);
  let length = idString.length;
  if (length % 2 === 1) return false;

  let left = idString.slice(0, length / 2);
  let right = idString.slice(length / 2);

  return left === right;
}

console.log(await solution());