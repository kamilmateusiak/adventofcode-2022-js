import { executeInstructions, fileToData, getTopCrates } from "./common";

const main = async () => {
  const data = await fileToData();

  executeInstructions(data.stacks, data.instructionsData, false);

  return getTopCrates(data.stacks);
}

export default main;
