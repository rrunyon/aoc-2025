import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./05/input.txt', 'utf8')).split('\n') as Array<string>;

  let ranges = [];
  
  for (let row of input) {
    if (row.length === 0) {
      break;
    }

    ranges.push(row.split('-').map(Number));
  }

  ranges.sort((a, b) => {
    let aMin = a[0];
    let aMax = a[1];
    let bMin = b[0];
    let bMax = b[1];

    if (aMin === bMin) {
      return (aMax ?? 0) - (bMax ?? 0)
    } else {
      return (aMin ?? 0) - (bMin ?? 0)
    }
  });

  let merged = [];

  let mergedMin = ranges[0]?.[0]!;
  let mergedMax = ranges[0]?.[1]!;

  for (let [min, max] of ranges) {
    if (!min || !max) break;

    if (min > mergedMax) {
      merged.push([mergedMin, mergedMax]);
      mergedMin = min
    } 

    if (max > mergedMax) {
      mergedMax = max;
    }
  }

  merged.push([mergedMin, mergedMax]);

  let total = BigInt(0);

  for (let [min, max] of merged) {
    if (!min || !max) break;

    total += BigInt(max - min + 1);
  }

  return total;
}

console.log(await solution());