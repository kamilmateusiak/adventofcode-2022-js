import { fileToData } from "./common";

const getSingleSideScenicScore = (data: string[], tree: number) => {
  if (!data.length) {
    return 0;
  }

  const higherTreeIndex = data.findIndex(t => Number(t) >= tree);

  if (higherTreeIndex === -1) {
    return data.length;
  }

  return higherTreeIndex + 1;
}

const getHeighestScenicScore = (data: string[][]) => {
  let heighestScenicScore = 1;

  data.forEach((row, i) => {
    row.forEach((cell, j) => {
      const tree = Number(cell);

      const treesToLeft = row.slice(0, j).reverse();
      const leftScore = getSingleSideScenicScore(treesToLeft, tree);

      const treesToRight = row.slice(j+1);
      const rightScore = getSingleSideScenicScore(treesToRight, tree);

      const treesInColumn = data.map(row => row[j]);

      const treesToTop = treesInColumn.slice(0, i).reverse();
      const topScore = getSingleSideScenicScore(treesToTop, tree)

      const treesToBottom = treesInColumn.slice(i+1);
      const bottomScore = getSingleSideScenicScore(treesToBottom, tree)

      heighestScenicScore = Math.max(bottomScore * topScore * leftScore * rightScore, heighestScenicScore)
    })
  })

  return heighestScenicScore;
}

const main = async () => {
  const data = await fileToData();

  return getHeighestScenicScore(data);
}

export default main;