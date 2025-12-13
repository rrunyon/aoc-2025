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

function countPathsOut(graph: Map<string, string[]>, node: string = 'you'): number {
  if (node === 'out') {
    return 1;
  }

  let count = 0;
  let nodes = graph.get(node) ?? [];
  for (let node of nodes) {
    count += countPathsOut(graph, node);
  }

  return count;
}

console.log(await solution());
