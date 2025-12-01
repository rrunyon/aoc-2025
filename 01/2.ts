import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./01/input.txt', 'utf8')).split('\n') as Array<string>;

  let dial = 50;
  let zeroCount = 0;
  
  for (const rotation of input) {
    let direction = rotation.charAt(0);
    let turns = Number(rotation.slice(1));

    if (direction === 'L') {
      for (let i = 0; i < turns; i++) {
        dial--;
        if (dial === 0) zeroCount++;
        if (dial === -1) dial = 99;
      }
    } else {
      for (let i = 0; i < turns; i++) {
        dial++;
        if (dial === 100) {
          zeroCount++;
          dial = 0;
        }
      }
    }
  }

  return zeroCount;
}

console.log(await solution());