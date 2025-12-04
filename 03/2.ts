import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./03/input.txt', 'utf8')).split('\n') as Array<string>;
  
  let result = BigInt(0);

  for (let bank of input) {
    const joltage = getMaxJoltage(bank.split(''));
    result += BigInt(joltage);
  }

  return result;
}

function getMaxJoltage(bank: String[], currentIndex = 0, currentConfiguration: String[] = [], cache = new Map): number {
  const current = currentConfiguration.join('');

  if (currentConfiguration.length === 12) {
    let currentJoltage = Number(currentConfiguration.join(''));
    if (!cache.get('max') || currentJoltage > cache.get('max')) {
      cache.set('max', currentJoltage);
    }

    return 0;
  }

  if (currentConfiguration.length > 0 && cache.get('max')) {
    let potentialJoltageStr = currentConfiguration.join('');
    while (potentialJoltageStr.length < 12) potentialJoltageStr += '9';
    let potentialJoltage = Number(potentialJoltageStr);
    if (cache.get('max') > potentialJoltage) return 0;
  }

  if (currentConfiguration.length + (bank.length - currentIndex + 1) < 12) return 0;

  if (currentIndex >= bank.length) return 0;

  getMaxJoltage(bank, currentIndex + 1, currentConfiguration, cache);

  let currentBattery = bank[currentIndex];
  if (currentBattery) {
    let nextConfiguration = [...currentConfiguration, currentBattery];
    getMaxJoltage(bank, currentIndex + 1, nextConfiguration, cache);
  }

  return cache.get('max');
}

console.log(await solution());