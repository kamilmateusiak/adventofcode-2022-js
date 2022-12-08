import { fileToData, fillSizes, getAllDirSizes } from "./common";

const sumSmallDirSizes = (dirSizes: number[]): number => {
  return dirSizes.reduce((acc, size) => {
    if (size < 100000) {
      acc += size
    }

    return acc;
  }, 0)
}

const main = async () => {
  const data = await fileToData();

  fillSizes(data)

  const allSizes = getAllDirSizes(data);

  return sumSmallDirSizes(allSizes)
}

export default main;
