import { fileToData, letterPriorityMap } from "./common";

type Data = [Set<string>, Set<string>][];

const splitItemsToCompartments = (data: string[]): Data => {
  return data.map(rucksack => {
    const indexToSplit = rucksack.length/2;
    const compartments: Data[number] = [new Set(rucksack.slice(0, indexToSplit)), new Set(rucksack.slice(indexToSplit))];

    return compartments;
  })
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
  const splitedItems = splitItemsToCompartments(data);

  const shared = splitedItems.map(getSharedItems)

  const priorities = shared.map(letter => letterPriorityMap[letter] || 0);

  return priorities.reduce((acc, priority) => acc + priority, 0);
}

export default main;
