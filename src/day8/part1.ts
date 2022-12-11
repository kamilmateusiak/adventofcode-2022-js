import { fileToData } from "./common";

const sumVisibleTrees = (data: string[][]) => {
  return data.reduce((acc, row, i) => {
    // first and last row
    if (i === 0 || i === data.length - 1) {
      return acc + row.length;
    }

    const visibleInRow = row.reduce((rowAcc, cell, j) => {
      const tree = Number(cell);

      // first and last column
      if (j === 0 || j === row.length - 1) {
        return rowAcc + 1;
      }

      if (row.slice(0, j).every(t => Number(t) < tree) || row.slice(j+1).every(t => Number(t) < tree)) {
        return rowAcc + 1;
      }

      const columnTrees = data.map(row => row[j]);

      if (columnTrees.slice(0, i).every(t => Number(t) < tree) || columnTrees.slice(i+1).every(t => Number(t) < tree)) {
        return rowAcc + 1;
      }

      return rowAcc;
    }, 0)

    return acc + visibleInRow;
  }, 0)
}

const main = async () => {
  const data = await fileToData();

  return sumVisibleTrees(data);
}

export default main;