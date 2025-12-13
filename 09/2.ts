import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./09/input.txt', 'utf8')).split('\n') as Array<string>;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let row of input) {
    let [x, y] = row.split(',').map(Number);
    minX = Math.min(minX, x!);
    maxX = Math.max(maxX, x!);
    minY = Math.min(minY, y!);
    maxY = Math.max(maxY, y!);
  }

  let graph: string[][] = [];

  for (let i = minY; i <= maxY; i++) {
    graph.push(new Array(maxX - minX + 1));
  }

  for (let i = 0; i < input.length - 1; i++) {
    let prev = getPosition(input[i]!);
    let current = getPosition(input[i + 1]!);

    graph[prev[1]]![prev[0]] = '#'
    graph[current[1]]![current[0]] = '#'

    if (prev[1] === current[1]) {
      for (let i = prev[0] + 1; i < current[0]; i++) {
        graph[prev[1]]![i] = 'X';
      }
    } else {
      for (let i = prev[1] + 1; i < current[1]; i++) {
        graph[i]![prev[0]] = 'X';
      }
    }
  }

  return 0;
}

function getPosition(input: string): [number, number] {
  const split = input.split(',');
  if (split.length !== 2) throw 'Bad input';

  return [Number(split[0]), Number(split[1])];
}


console.log(await solution());
