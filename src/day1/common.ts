import * as readline from 'readline';
import * as fs from 'fs';

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data.txt`),
  });

  const data: string[][] = [];

  let currentElfIndex = 0;

  for await (const line of rd) {
    if (!data[currentElfIndex]) {
      data[currentElfIndex] = [];
    }
    if (line) {
      data[currentElfIndex].push(line);
    } else {
      currentElfIndex += 1;
    }
  }

  return data;
}

export const sumCalories = (collection: (number | string)[]) => {
  return collection.reduce<number>((acc, calories) => {
    const caloriesValue =  Number(calories);
    return acc + caloriesValue;
  }, 0);
}

export const calculateCalories = async (data: string[][]) => {
  return data.map(sumCalories).sort((a, b) => b - a);
}
