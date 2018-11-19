#!/usr/bin/env node

import commander from 'commander';

const program = commander;

program
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
