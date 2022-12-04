import { Data, fileToData } from "./common";

const getPairsWithContainingAssignments = (data: Data) => {
  return   data.filter((pair) => {
    const [ firstElf, secondElf ] = pair;

    if ([firstElf.start, firstElf.end].every(num => num >= secondElf.start && num <= secondElf.end)) {
      return true;
    }

    if ([secondElf.start, secondElf.end].every(num => num >= firstElf.start && num <= firstElf.end)) {
      return true;
    }

    return false;
  });
}

const main = async () => {
  const data = await fileToData();

  return getPairsWithContainingAssignments(data).length
}

export default main;
