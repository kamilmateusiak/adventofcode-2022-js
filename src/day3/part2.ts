import { fileToData, letterPriorityMap } from "./common";

const getGroups = (data: string[]) => {
  let currentIndex = 0;
  return data.reduce<string[][]>((acc, rucksack) => {
    if (acc[currentIndex].length < 3) {
      acc[currentIndex].push(rucksack);
    } else {
      currentIndex++;
      acc.push([rucksack])
    }

    return acc;
  }, [[]]);
}

const getItemSharedInGroup = (group: string[]) => {
  const sets = group.map(rucksack => new Set(rucksack.split('')))
  for (const item of sets[0]) {
    if (sets[1].has(item) && sets[2].has(item)) {
      return item;
    }
  }

  return '';
}

const main = async () => {
  const data = await fileToData();

  const groups = getGroups(data);
  const shared = groups.map(getItemSharedInGroup);

  const priorities = shared.map(letter => letterPriorityMap[letter] || 0);

  return priorities.reduce((acc, priority) => acc + priority, 0);
}

export default main;
