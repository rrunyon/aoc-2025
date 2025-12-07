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


  let queue = new Queue<[number, number]>();
  let currentBeams = new Set<string>();
  queue.enqueue(startPosition);
  let splitCount = 0;

  while (queue.size) {
    let currentPosition = queue.dequeue();
    if (!currentPosition) break;

    let key = JSON.stringify(currentPosition);
    if (currentBeams.has(key)) {
      continue;
    } else {
      currentBeams.add(key);
    }
    let [i, j] = currentPosition;
    let currentCell = input[i]![j];

    if (currentCell === '.' || currentCell === 'S') {
      let nextI = i + 1;
      if (nextI < input.length - 1) {
        let nextPosition: [number, number] = [nextI, j];
        queue.enqueue(nextPosition);
      }
    } else if (currentCell === '^') {
      splitCount++;

      let dirs: [number, number][] = [[0, -1], [0, 1]];
      for (let dir of dirs) {
        let nextI = i;
        let nextJ = j + dir[1];

        if (nextJ >= 0 && nextJ <= (input[0]?.length ?? 0 - 1)) {
          queue.enqueue([nextI, nextJ]);
        }
      }
    }
  }

  return splitCount;
}

console.log(await solution());