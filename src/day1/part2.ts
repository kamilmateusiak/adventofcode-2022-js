import { calculateCalories, fileToData, sumCalories } from "./common";

const main = async () => {
  const data = await fileToData()
  const calories = await calculateCalories(data)

  const threeBestSum = sumCalories(calories.slice(0, 3))

  return threeBestSum;
}

export default main;
