import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./03/input.txt', 'utf8')).split('\n') as Array<string>;
  
  let result = 0;

  for (let bank of input) {
    let leftDigit = -Infinity;
    let rightDigit = -Infinity;
    let leftIndex = -1;

    for (let i = 0; i < bank.length - 1;  i++) {
      let battery = Number(bank.charAt(i));
      if (battery > leftDigit) {
        leftDigit = battery;
        leftIndex = i;
      }
    }

    for (let i = leftIndex + 1; i < bank.length;  i++) {
      let battery = Number(bank.charAt(i));
      if (battery > rightDigit && i !== leftIndex) {
        rightDigit = battery;
      }
    }

    let joltage = Number(String(leftDigit) + String(rightDigit));
    // console.log(joltage);

    result += joltage;
  }

  return result;
}

console.log(await solution());