#!/usr/bin/env node

var cli = require('commander')
var utils = require('preston-core/src/core/utils');

cli
  .option('-path, --path [path]', 'Path to generated file', 'dist/index.html')
  .parse(process.argv);

utils
  .readFile(__dirname + '/../' + 'index.html')
  .then((data) => utils.writeFile(`${process.env.PWD}/${cli.path}`, data))
  .then(() => {
    console.log(`Generated ${cli.path}.`)
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Failed to generate ${cli.path}. Error: ${err}`)
    process.exit(1);
  });
