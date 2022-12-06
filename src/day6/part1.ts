import { fileToData, findWhereUniqueCharactersSequenceStarts } from "./common";

const main = async () => {
  const data = await fileToData();

  return findWhereUniqueCharactersSequenceStarts(data, 4) + 4;
}

export default main;
