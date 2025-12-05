import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./04/input.txt', 'utf8')).split('\n') as Array<string>;

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let rowLength = input[0]?.length ?? 0;
    for (let j = 0; j < rowLength; j++) {
      let cell = input[i]![j];
      if (cell === "@") {
        if (getAdjacentRollCount(i, j, input) < 4) {
          result++;
        }
      }
    }
  }

  return result;
}

function getAdjacentRollCount(i: number, j: number, grid: string[]) {
  let count = 0;

  let dirs: [number, number][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  
  for (const dir of dirs) {
    let newI = i + dir[0];
    let newJ = j + dir[1];
    if (grid[newI]?.[newJ] === "@") count++;
  }

  return count;
}

console.log(await solution());