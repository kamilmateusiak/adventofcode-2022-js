import { Data, fileToData, getNextHeadPosition, getNextKnotPosition } from "./common";

const calculateVisitedPositionsCount = (data: Data) => {
  const visitedPositions = new Set(['0-0'])
  let tailingKnots: [number, number][] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(knot => [0, 0]);
  let head: [number, number] = [0, 0];

  data.forEach(({ direction, moveBy }) => {
    for (let move = 0; move < moveBy; move++) {
      head = getNextHeadPosition(head, direction);
      for (let j = 0; j <  tailingKnots.length; j++) {
        tailingKnots[j] = getNextKnotPosition(tailingKnots[j], tailingKnots[j-1] || head)
      }

      const tail = tailingKnots[tailingKnots.length - 1];
      visitedPositions.add(`${tail[0]}-${tail[1]}`)
    }
  })

  return visitedPositions.size;
}

const main = async () => {
  const data = await fileToData();

  return calculateVisitedPositionsCount(data);
}

export default main;