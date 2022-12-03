import * as fs from 'fs';
import * as readline from 'readline';

type OpponentChoice = 'A' | 'B' | 'C';
type MyChoice = 'X' | 'Y' | 'Z';

const lineToObject = (line: string) => {
  const [opponent, me] = line.split(' ');

  return {
    opponent: opponent as OpponentChoice,
    me: me as MyChoice,
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

const getPointsForChoice = (choice: MyChoice) => {
  switch(choice) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
    default:
      return 0;
  }
}

const translateOpponentChoice = (opponentChoice: OpponentChoice): MyChoice => {
  switch(opponentChoice) {
    case 'A':
      return 'X';
    case 'B':
      return 'Y';
    case 'C':
      return 'Z';
  }
}

const getPointsForOutcome = (opponentChoice: OpponentChoice, myChoice: MyChoice) => {
  const translatedOpponentChoice = translateOpponentChoice(opponentChoice);

  if (translatedOpponentChoice === myChoice) {
    return 3;
  }

  if (translatedOpponentChoice === 'X') {
    return myChoice === 'Y' ? 6 : 0
  }

  if (translatedOpponentChoice === 'Y') {
    return myChoice === 'Z' ? 6 : 0
  }

  return myChoice === 'X' ? 6 : 0
}

const calculateRoundPoints = (round: {
  opponent: OpponentChoice,
  me: MyChoice
}) => {
  const choicePoints = getPointsForChoice(round.me);
  const outcomePoints = getPointsForOutcome(round.opponent, round.me)

  return choicePoints + outcomePoints;
}

const main = async () => {
  const data = await fileToData();

  const myPointsSum = data.reduce((acc, round) => acc + calculateRoundPoints(round), 0);

  return myPointsSum;
}

export default main;
