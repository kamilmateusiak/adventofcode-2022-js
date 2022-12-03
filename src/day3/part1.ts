import * as readline from 'readline';
import * as fs from 'fs';

type Data = [Set<string>, Set<string>][];

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ] as const;

const letterPriorityMap = letters.reduce<Record<string, number>>((acc, letter, index) => {
  const basePriority = index + 1;
  acc[letter] = basePriority;
  acc[letter.toLocaleUpperCase()] = basePriority + letters.length;
  return acc;
}, {});

const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data.txt`),
  });

  const data: Data = [];

  for await (const line of rd) {
    const indexToSplit = line.length/2;
    const compartments: Data[number] = [new Set(line.slice(0, indexToSplit)), new Set(line.slice(indexToSplit))];

    data.push(compartments);
  }

  return data;
}

const getSharedItems = (data: Data[number]) => {
  for (const item of data[0]) {
    if (data[1].has(item)) {
      return item;
    }
  }

  return '';
}

const main = async () => {
  const data = await fileToData();

  const shared = data.map(getSharedItems)

  const priorities = shared.map(letter => letterPriorityMap[letter] || 0);

  return priorities.reduce((acc, priority) => acc + priority, 0);
}

export default main;
