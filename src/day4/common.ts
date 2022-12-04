import * as readline from 'readline';
import * as fs from 'fs';

type Data = { start: number; end: number; }[][];

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

export const getPairs = (data: Data, relationType: 'overlaping' | 'containing') => {
  const checkingFn = relationType === 'overlaping' ? 'some' : 'every';

  return data.filter((pair) => {
    const [ firstElf, secondElf ] = pair;

    if ([firstElf.start, firstElf.end][checkingFn](num => num >= secondElf.start && num <= secondElf.end)) {
      return true;
    }

    if ([secondElf.start, secondElf.end][checkingFn](num => num >= firstElf.start && num <= firstElf.end)) {
      return true;
    }

    return false;
  });
}
