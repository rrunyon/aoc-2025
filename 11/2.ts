import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./11/input.txt', 'utf8')).split('\n') as Array<string>;
  let graph = new Map;

  for (let row of input) {
    let [from, to] = row.split(": ");
    let toNodes = to?.split(' ') ?? [];

    for (let node of toNodes) {
      if (!graph.has(from)) graph.set(from, []);
      graph.get(from).push(node);
    }
  }

  return countPathsOut(graph);
}

function countPathsOut(graph: Map<string, string[]>, node: string = 'svr', seenDac = false, seenFft = false, memo = new Map): number {
  let key = JSON.stringify([node, seenDac, seenFft]);
  if (memo.has(key)) return memo.get(key);

  if (node === 'out' && seenDac && seenFft) {
    return 1;
  } else if (node === 'dac') {
    seenDac = true;
  } else if (node === 'fft') {
    seenFft = true;
  }

  let count = 0;
  let nodes = graph.get(node) ?? [];
  for (let node of nodes) {
    count += countPathsOut(graph, node, seenDac, seenFft, memo);
  }

  memo.set(key, count);
  return count;
}

console.log(await solution());
