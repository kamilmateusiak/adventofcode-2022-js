import { fileToData, getPairs } from "./common";

const main = async () => {
  const data = await fileToData();

  return getPairs(data, 'containing').length
}

export default main;
