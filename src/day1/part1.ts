import { calculateCalories, fileToData } from "./common";

const main = async () => {
  const data = await fileToData()
  const calories = await calculateCalories(data)

  const max = calories[0];

  return max;
}

export default main;
