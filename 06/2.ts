import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./06/input.txt', 'utf8')).split('\n') as Array<string>;

  let operands: number[][] = [];
  let operators: string[] = [];
  let currentOperands: string[] = [];

  for (let i = (input[0]?.length ?? 0) - 1; i >= 0; i--) {
    let currentOperand = "";

    for (let j = 0; j < input.length; j++) {
      let currentCell = input[j]?.[i];
      if (currentCell === "*" || currentCell === "+") {
        operators.push(currentCell);

        currentOperands.push(currentOperand);
        operands.push(currentOperands.map(operand => Number(operand.trim())).filter(Boolean));
        currentOperands = [];
      }

      currentOperand += currentCell;
    }

    currentOperands.push(currentOperand);
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