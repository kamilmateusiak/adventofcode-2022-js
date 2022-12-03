var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    console: false
});

const sumCalories = (input) => input.reduce((acc, calories) => acc + Number(calories), 0);

const calculateCalories = async () => {
  var rd = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    console: false
  });

  const data = [];

  let currentElfIndex = 0;

  for await (const line of rd) {
    if (!data[currentElfIndex]) {
      data[currentElfIndex] = [];
    }
    if (line) {
      data[currentElfIndex].push(line);
    } else {
      currentElfIndex += 1;
    }
  }
  
  return data.map(sumCalories).sort((a, b) => b-a);
}

const main = async () => {
  const calories = await calculateCalories()

  const max = calories[0];
  const threeBestSum = calories.slice(0, 3).re;

  console.log(sumCalories(calories.slice(0, 3)))
}

main()
