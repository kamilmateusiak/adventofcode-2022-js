import * as readline from 'readline';
import * as fs from 'fs';

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day6.txt'),
  });

  let code = '';

  for await (const line of rd) {
    code += line;
  }

  return code;
}

export const findWhereUniqueCharactersSequenceStarts = (code: string, uniqueCharactersCount: number, startIndex = 0): number => {
  const sequence = code.slice(startIndex, startIndex + uniqueCharactersCount);
  
  const charactersSet = new Set(sequence);

  if (charactersSet.size === sequence.length) {
    return startIndex;
  }

  return findWhereUniqueCharactersSequenceStarts(code, uniqueCharactersCount, startIndex + 1);
}
