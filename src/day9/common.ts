import * as readline from 'readline';
import * as fs from 'fs';

export type Data = { direction: string; moveBy: number; }[];

export const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day9.txt'),
  });

  const data: Data = [];

  for await (const line of rd) {
    const row = line.split(' ');
    data.push({ direction: row[0], moveBy: Number(row[1])})
  }

  return data;
}

export const getNextHeadPosition = (currentPosition: [number, number], direction: string): [number, number] => {
  switch (direction ) {
    case 'U':
      return [currentPosition[0], currentPosition[1] + 1];
    case 'D':
      return [currentPosition[0], currentPosition[1] - 1];
    case 'L':
      return [currentPosition[0] - 1, currentPosition[1]];
    case 'R':
      return [currentPosition[0] + 1, currentPosition[1]];
    default:
      return currentPosition;
  }
}

export const calculateNextCoordinate = (currentCoordinate: number, distance: number) => {
  if (distance > 0) {
    return currentCoordinate + 1;
  }

  if (distance < 0) {
    return currentCoordinate - 1;
  }

  return currentCoordinate;
}

export const getNextKnotPosition = (currentPosition: [number, number], prevKnotPosition: [number, number]): [number, number] => {
  const distX = prevKnotPosition[0] - currentPosition[0];
  const distY = prevKnotPosition[1] - currentPosition[1];

  if (Math.abs(distX) < 2 && Math.abs(distY) < 2) {
    return currentPosition;
  }

  return [
    calculateNextCoordinate(currentPosition[0], distX),
    calculateNextCoordinate(currentPosition[1], distY)
  ]
}
