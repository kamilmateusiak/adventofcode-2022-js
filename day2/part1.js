var fs = require('fs'),
    readline = require('readline');

const lineToObject = (line) => {
  const [opponent, me] = line.split(' ');

  return {
    opponent,
    me,
  }
}

const fileToData = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    console: false
  });

  const data = [];

  for await (const line of rd) {
    data.push(lineToObject(line))
  }

  return data;
}

const getPointsForChoice = (choice) => {
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

const translateOpponentChoice = (opponentChoice) => {
  switch(opponentChoice) {
    case 'A':
      return 'X';
    case 'B':
      return 'Y';
    case 'C':
      return 'Z';
  }
}

const getPointsForOutcome = (opponentChoice, myChoice) => {
  const translatedOpponentChoice = translateOpponentChoice(opponentChoice)
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

const calculateRoundPoints = (round) => {
  const choicePoints = getPointsForChoice(round.me);
  const outcomePoints = getPointsForOutcome(round.opponent, round.me)

  return choicePoints + outcomePoints;
}

const main = async () => {
  const data = await fileToData();

  const myPointsSum = data.reduce((acc, round) => acc + calculateRoundPoints(round), 0);

  console.log(myPointsSum)
}

main()
