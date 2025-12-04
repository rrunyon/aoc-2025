import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./03/input.txt', 'utf8')).split('\n') as Array<string>;
  
  let result = 0;

  for (let bank of input) {
    const joltage = getMaxJoltage(bank.split(''));
    console.log(joltage);
    result += joltage;
  }

  return result;
}

function getMaxJoltage(bank: String[], currentIndex = 0, currentConfiguration: String[] = [], currentMax = 0): number {
  if (currentConfiguration.length === 12) {
    return Number(currentConfiguration.join(''));
  }

  if (currentIndex >= bank.length) return 0;

  let left = getMaxJoltage(bank, currentIndex + 1, currentConfiguration, currentMax);

  let right = 0;
  let currentBattery = bank[currentIndex];
  if (currentBattery) {
    let nextConfiguration = [...currentConfiguration, currentBattery];
    right = getMaxJoltage(bank, currentIndex + 1, nextConfiguration);
  }

  return Math.max(left, right);
}

console.log(await solution());