#!/usr/bin/env node

var cli = require('commander');

cli
  .command('build [--outputDir] [--configDir] [--spriteDir]', 'build your style guide assets')
  .command('publish [--dir] [--configDir]', 'publish your style guide to S3')
  .parse(process.argv);
