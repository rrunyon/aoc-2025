import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./08/input.txt', 'utf8')).split('\n') as Array<string>;

  let distances: [number, [string, string]][] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      let a = input[i]!;
      let b = input[j]!;
      distances.push([getDistance(a, b), [a, b]]);
    }
  }

  distances.sort((a, b) => a[0] - b[0]);

  let uf = new UnionFind;
  for (let row of input) {
    uf.add(row);
  }

  let i = -1;
  while (uf.componentSize(input[0]!) < input.length) {
    i++;
    let pair = distances[i]![1];
    uf.merge(pair[0], pair[1]);
  }

  let pair = distances[i]![1].map(pos => pos.split(',').map(Number));
  return pair[0]![0]! * pair[1]![0]!;
}

function getDistance(a: string, b: string): number {
  let [a1, a2, a3] = a.split(',').map(Number);
  let [b1, b2, b3] = b.split(',').map(Number);

  if (![a1, a2, a3, b1, b2, b3].every(Number.isFinite)) throw 'Bad input';

  return Math.sqrt(Math.pow(a1! - b1!, 2) + Math.pow(a2! - b2!, 2) + Math.pow(a3! - b3!, 2));
}

class UnionFind {
  parents: Map<string, string>;
  // Track the size of each root. Only valid for root entries.
  sizes: Map<string, number>;

  constructor() {
    this.parents = new Map;
    this.sizes = new Map;
  }

  add(node: string) {
    if (this.parents.has(node)) return;
    this.parents.set(node, node);
    this.sizes.set(node, 1);
  }

  find(node?: string): string {
    if (!node) throw 'No node';

    let parent = this.parents.get(node);
    if (!parent) throw 'Parent not found';

    if (parent === node) {
      return node;
    } else {
      this.parents.set(node, this.find(this.parents.get(node)));

      parent = this.parents.get(node);
      if (!parent) throw 'Parent not found';

      return parent;
    }
  }

  merge(x: string, y: string): void {
    let xParent = this.find(x)
    let yParent = this.find(y);

    if (xParent !== yParent) {
      const xSize = this.sizes.get(xParent) ?? 1;
      const ySize = this.sizes.get(yParent) ?? 1;

      // Attach smaller tree to larger to keep depth down and update size.
      if (xSize < ySize) {
        this.parents.set(xParent, yParent);
        this.sizes.set(yParent, xSize + ySize);
      } else {
        this.parents.set(yParent, xParent);
        this.sizes.set(xParent, xSize + ySize);
      }
    }
  }

  componentSize(node: string): number {
    const root = this.find(node);
    return this.sizes.get(root) ?? 0;
  }
}


console.log(await solution());
