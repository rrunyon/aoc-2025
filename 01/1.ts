import { readFile } from 'fs/promises';

async function solution() {
  let input = (await readFile('./01/input.txt', 'utf8')).split('\n');

}

await solution();