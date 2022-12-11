import { Data, fileToData, getNextHeadPosition, getNextKnotPosition } from "./common";

const calculateVisitedPositionsCount = (data: Data) => {
  const visitedPositions = new Set(['0-0'])
  let tail: [number, number] = [0, 0];
  let head: [number, number] = [0, 0];

  data.forEach(({ direction, moveBy }, i) => {
    for (let move = 0; move < moveBy; move++) {
      head = getNextHeadPosition(head, direction);
      tail = getNextKnotPosition(tail, head)
      visitedPositions.add(`${tail[0]}-${tail[1]}`)
    }
  })

  return visitedPositions.size
}

const main = async () => {
  const data = await fileToData();

  return calculateVisitedPositionsCount(data);
}

export default main;