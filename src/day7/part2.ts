import { fileToData, fillSizes, getAllDirSizes } from "./common";

const getSmallDirToRemove = (dirSizes: number[], rootDirSize: number): number => {
  const currentEmptySpace = 70000000 - rootDirSize;
  const emptySpaceYetNeeded = 30000000 - currentEmptySpace
  const sortedSizes = dirSizes.sort((a, b) => a - b);

  return sortedSizes.find(size => size > emptySpaceYetNeeded) || 0;
}

const main = async () => {
  const data = await fileToData();

  fillSizes(data)

  const allSizes = getAllDirSizes(data);

  return getSmallDirToRemove(allSizes, data.size)
}

export default main;
