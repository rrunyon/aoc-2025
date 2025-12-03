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

  let result = BigInt(0);

  for (const [rangeMin, rangeMax] of ranges) {
    for (let i = rangeMin; i <= rangeMax; i++) {
      if (isInvalid(i)) result += BigInt(i);
    }
  }

  return result;
}

function isInvalid(id: number): boolean {
  let idString = String(id);

  for (let i = 1; i < idString.length; i++) {
    if (idString.length % i === 0) {
      let current = idString.slice(0, i);
      let next = "";
      let allMatching = true;

      for (let j = i; j < idString.length; j += i) {
        next = current;
        current = idString.slice(j, i + j);

        if (next !== current) {
          allMatching = false;
          break;
        }
      }

      if (allMatching) return true;
    }
  }

  return false;
}

console.log(await solution());