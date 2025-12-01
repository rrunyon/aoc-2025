import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./01/input.txt', 'utf8')).split('\n') as Array<string>;

  let dial = 50;
  let zeroCount = 0;
  
  for (const rotation of input) {
    let direction = rotation.charAt(0);
    let turns = Number(rotation.slice(1));

    if (direction === 'L') {
      dial = (dial - turns + 100) % 100;
    } else {
      dial = (dial + turns) % 100;
    }

    if (dial === 0) zeroCount++;
  }

  return zeroCount;
}

console.log(await solution());