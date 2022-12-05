import * as readline from 'readline';
import * as fs from 'fs';

type Instruction = { amount: number; from: number; to: number; };
const CRATES_ROW_INDEXES = [1, 5, 9, 13, 17, 21, 25, 29, 33];
const CRATES_LABEL = ' 1   2   3   4   5   6   7   8   9 '
const INTRUCTIONS_WORDS = ['move', 'from', 'to'];

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day5.txt'),
  });

  const stacks: string[][] = CRATES_ROW_INDEXES.map(() => []);
  const instructionsData: Instruction[] = []
  let isCreatingCratesData = true;

  for await (const line of rd) {
    if (!line || line === CRATES_LABEL) {
      isCreatingCratesData = false;
      continue;
    }
  
    if (isCreatingCratesData) {
      CRATES_ROW_INDEXES.forEach((crateIndex, index) => {
        if (line[crateIndex] !== ' ') {
          stacks[index].unshift(line[crateIndex]);
        }
      })
    } else {
      const [amount, from, to] = line.split(' ').filter(word => !INTRUCTIONS_WORDS.includes(word)).map(Number);
      instructionsData.push({amount, from, to})
    }
  }

  return {
    stacks,
    instructionsData
  };
}

export const executeInstructions = (crates: string[][], instructions: Instruction[], shouldPickOneByOne: boolean) => {
  instructions.forEach(({ from, to, amount }) => {
    const stackFrom = crates[from - 1];
    const stackTo = crates[to - 1];
    const moved = stackFrom.splice(stackFrom.length - amount, amount);
    stackTo.push(...(shouldPickOneByOne ? moved.reverse() : moved))
  })
}

export const getTopCrates = (stacks: string[][]) => {
  return stacks.reduce((acc, stack) => {
    if (stack[stack.length - 1]) {
      return acc + stack[stack.length - 1]
    }
    return acc;
   }, '')
}