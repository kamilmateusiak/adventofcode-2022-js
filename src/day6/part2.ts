import { fileToData, findWhereUniqueCharactersSequenceStarts } from "./common";

const main = async () => {
  const data = await fileToData();

  return findWhereUniqueCharactersSequenceStarts(data, 14) + 14;
}

export default main;
