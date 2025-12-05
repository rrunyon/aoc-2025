import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./05/input.txt', 'utf8')).split('\n') as Array<string>;

  let parsingRanges = true;
  let ranges = [];
  let ingredients = [];
  
  for (let row of input) {
    if (row.length === 0) {
      parsingRanges = false;
      continue;
    }

    if (parsingRanges) {
      ranges.push(row.split('-').map(Number));
    } else {
      ingredients.push(Number(row));
    }
  }

  let freshCount = 0;

  for (let ingredient of ingredients) {
    for (let [min, max] of ranges) {
      if (min && max && ingredient >= min && ingredient <= max) {
        freshCount++;
        break;
      }
    }
  }

  return freshCount;
}

console.log(await solution());