import * as readline from 'readline';
import * as fs from 'fs';

export type Data = { start: number; end: number; }[][];

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day4.txt'),
  });

  const data: Data = [];

  for await (const line of rd) {
    const pairs = line.split(',').map(elf => {
      const [start, end] = elf.split('-').map(Number);

      return ({ start, end })
    })

    data.push(pairs);
  }

  return data;
}
