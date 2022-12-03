import * as fs from 'fs';
import * as readline from 'readline';

type Choice = 'A' | 'B' | 'C';
type Result = 'X' | 'Y' | 'Z';
type TranslationMap = Record<`${Result}${Choice}`, Choice>

const translationMap: TranslationMap = {
  'YA': 'A',
  'YB': 'B',
  'YC': 'C',
  'ZA': 'B',
  'XA': 'C',
  'XB': 'A',
  'ZB': 'C',
  'ZC': 'A',
  'XC': 'B'
} as const;

const translateResultToMyChoice = (result: Result, opponentChoice: Choice) => {
  return translationMap[`${result}${opponentChoice}`]
}

const lineToObject = (line: string) => {
  const [opponent, result] = line.split(' ');

  const me = translateResultToMyChoice(result as Result, opponent as Choice)

  return {
    me,
    result: result as Result
  }
}

const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('data/day2.txt'),
  });

  const data = [];

  for await (const line of rd) {
    data.push(lineToObject(line))
  }

  return data;
}

const getPointsForChoice = (choice: Choice) => {
  switch(choice) {
    case 'A':
      return 1;
    case 'B':
      return 2;
    case 'C':
      return 3;
    default:
      return 0;
  }
}

const getPointsForOutcome = (result: Result) => {
  switch(result) {
    case 'Z':
      return 6;
    case 'Y': 
      return 3;
    default: 
      return 0;
  }
}

const calculateRoundPoints = (round: { me: Choice, result: Result }) => {
  const choicePoints = getPointsForChoice(round.me);
  const outcomePoints = getPointsForOutcome(round.result)

  return choicePoints + outcomePoints;
}

const main = async () => {
  const data = await fileToData();

  const myPointsSum = data.reduce((acc, round) => acc + calculateRoundPoints(round), 0);

  return myPointsSum;
}

export default main;
