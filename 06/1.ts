import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./06/input.txt', 'utf8')).split('\n') as Array<string>;

  let operands: number[][] = [];
  let operators: string[] = [];

  for (let i = 0; i < input.length; i++) {
    let row = input[i]?.split(' ').filter(Boolean);
    for (let j = 0; j < (row?.length ?? 0); j++) {
      if (!operands[j]) operands[j] = [];

      if (i === input.length - 1) {
        operators.push(row?.[j] ?? "");
      } else {
        operands[j]!.push(Number(row?.[j] ?? 0));
      }
    }
  }

  let total = 0;

  for (let i = 0; i < operands.length; i++) {
    let currentOperands = operands[i];
    let operator = operators[i];
    if (operator === '+') {
      total += currentOperands?.reduce((prev, curr) => prev + curr, 0) ?? 0;
    } else {
      total += currentOperands?.reduce((prev, curr) => prev * curr, 1) ?? 0;
    }
  }

  return total;
}

console.log(await solution());