import * as readline from 'readline';
import * as fs from 'fs';

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day8.txt'),
  });

  const data: string[][] = [];

  for await (const line of rd) {
    const row = line.split('');
    data.push(row)
  }

  return data;
}
