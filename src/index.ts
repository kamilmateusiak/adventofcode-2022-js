#!/usr/bin/env node

import { program } from 'commander'

const main = async () => {
  program
    .version('0.0.2')
    .description("Advent of code 2022")
    .requiredOption('-d, --day <day>', 'Specify day you are interested in')
    .requiredOption('-p, --part <part>', 'Specify part of day challenge you are interested in')
    .parse();

  const { day, part } = program.opts<{ day: string, part: string }>();

  const { default: solution } = await import(`./day${day}/part${part}`);

  const result = await solution();

  console.log(`Result is ${result}.`);
}

main()
