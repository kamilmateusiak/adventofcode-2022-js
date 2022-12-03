var fs = require('fs'),
    readline = require('readline');

const translationMap = {
  'YA': 'A',
  'YB': 'B',
  'YC': 'C',
  'ZA': 'B',
  'XA': 'C',
  'XB': 'A',
  'ZB': 'C',
  'ZC': 'A',
  'XC': 'B'
}

const translateResultToMyChoice = (result, opponentChoice) => {
  return translationMap[`${result}${opponentChoice}`]
}

const lineToObject = (line) => {
  const [opponent, result] = line.split(' ');

  const me = translateResultToMyChoice(result, opponent)

  return {
    me,
    result
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

const getPointsForOutcome = (result) => {
  switch(result) {
    case 'Z':
      return 6;
    case 'Y': 
      return 3;
    default: 
      return 0;
  }
}

const calculateRoundPoints = (round) => {
  const choicePoints = getPointsForChoice(round.me);
  const outcomePoints = getPointsForOutcome(round.result)

  return choicePoints + outcomePoints;
}

const main = async () => {
  const data = await fileToData();

  console.log(data.map((round) => calculateRoundPoints(round)));

  const myPointsSum = data.reduce((acc, round) => acc + calculateRoundPoints(round), 0);

  console.log(myPointsSum)
}

main()
