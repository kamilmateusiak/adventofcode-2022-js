import { executeInstructions, fileToData, getTopCrates } from "./common";

const main = async () => {
  const data = await fileToData();

  executeInstructions(data.stacks, data.instructionsData, true);

  return getTopCrates(data.stacks);
}

export default main;
