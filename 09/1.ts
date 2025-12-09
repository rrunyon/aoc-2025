import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./09/input.txt', 'utf8')).split('\n') as Array<string>;
  let maxArea = -Infinity;

  for (let posA of input) {
    for (let posB of input) {
      let [x1, y1] = posA.split(',').map(Number);
      let [x2, y2] = posB.split(',').map(Number);

      maxArea = Math.max(maxArea, (Math.abs(x1! - x2!) + 1) * (Math.abs(y1! - y2!) + 1));
    }
  }

  return maxArea;
}


console.log(await solution());
