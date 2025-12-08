// Run double nested loop over input to find two closest boxes and place them into map where coordinates => junction box
// number. 

import { readFile } from 'fs/promises';
import { Queue } from '@datastructures-js/queue';

async function solution() {
  let input = (await readFile('./08/sample.txt', 'utf8')).split('\n') as Array<string>;

  let circuitMap = new Map;
  let currentCircuit = 0;
  while (circuitMap.size < 10) {
    let minDistance = Infinity;
    let minPair: [string, string] = ['', ''];

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (i === j) continue;

        let boxA = input[i]!;
        let boxB = input[j]!;
        let distance = getDistance(boxA, boxB);

        if (distance < minDistance) {
          // Skip connected boxes
          if (circuitMap.has(boxA) && circuitMap.has(boxB)) continue;

          minDistance = distance;
          minPair = [boxA, boxB];
        }
      }
    }

    if (circuitMap.has(minPair[0])) {
      let circuit = circuitMap.get(minPair[0]);
      circuitMap.set(minPair[1], circuit);
    } else if (circuitMap.has(minPair[1])) {
      let circuit = circuitMap.get(minPair[0]);
      circuitMap.set(minPair[1], circuit);
    } else {
      currentCircuit++;
      circuitMap.set(minPair[0], currentCircuit);
      circuitMap.set(minPair[1], currentCircuit);
    }
  }

  let circuitToBoxMap = new Map<string, string[]>();

  for (let [box, circuit] of circuitMap) {
    if (!circuitToBoxMap.has(circuit)) circuitToBoxMap.set(circuit, []);
    circuitToBoxMap.get(circuit)?.push(box);
  }

  let sortedCircuits = Array.from(circuitToBoxMap.values()).sort(list => list.length);

  let result = 1;
  for (let i = 0; i < 3; i++) {
    result *= sortedCircuits[i]?.length ?? 1;
  }

  return result;
}

function getDistance(a: string, b: string): number {
  let [a1, a2, a3] = a.split(',').map(Number);
  let [b1, b2, b3] = b.split(',').map(Number);

  if (!a1 || !a2 || !a3 || !b1 || !b2 || !b3) throw 'Bad input';

  return Math.sqrt(Math.pow(a1 - b1, 2) + Math.pow(a2 - b2, 2) + Math.pow(a3 - b3, 2));
}

class UnionFind {
  parents: Map<string, string>;
  size: number;

  constructor() {
    this.parents = new Map;
    this.size = 0;
  }

  add(node: string) {
    this.parents.set(node, node);
    this.size++;
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
      this.parents.set(xParent, yParent);
      this.size--;
    }
  }
}

  



console.log(await solution());