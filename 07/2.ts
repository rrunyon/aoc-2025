import { readFile } from 'fs/promises';
import { Queue } from '@datastructures-js/queue';

async function solution() {
  let input = (await readFile('./07/input.txt', 'utf8')).split('\n') as Array<string>;

  let startPosition: [number, number] = [-1, -1];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < (input[0]?.length ?? 0); j++) {
      if (input[i]![j] === 'S') {
        startPosition = [i, j];
      }
    }
  }

  let memo = new Map<string, number>();
  return countTimelines(startPosition[0], startPosition[1]);

  function countTimelines(i: number, j: number): number {
    let key = JSON.stringify([i, j]);
    let memoized = memo.get(key);
    if (memoized) return memoized;

    let currentCell = input[i]?.[j];
    if (!currentCell) return 1;

    let result = 0;
    if (currentCell === '.' || currentCell === 'S') {
      result = countTimelines(i + 1, j);
    } else {
      result = countTimelines(i, j - 1) + countTimelines(i, j + 1);
    }

    memo.set(key, result);
    return result;
  }
}

console.log(await solution());