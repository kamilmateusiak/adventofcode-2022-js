import * as readline from 'readline';
import * as fs from 'fs';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ] as const;

export const letterPriorityMap = letters.reduce<Record<string, number>>((acc, letter, index) => {
  const basePriority = index + 1;
  acc[letter] = basePriority;
  acc[letter.toLocaleUpperCase()] = basePriority + letters.length;
  return acc;
}, {});

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day3.txt'),
  });

  const data: string[] = [];

  for await (const line of rd) {
    data.push(line);
  }

  return data;
}