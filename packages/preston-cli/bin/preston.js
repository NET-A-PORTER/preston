#!/usr/bin/env node

require('../src/global');

var cli = require('commander');

var styles;

cli
  .command('build [--outputDir] [--configDir] [--spriteDir]', 'build your style guide assets')
  .command('publish [--dir] [--configDir]', 'publish your style guide to S3')
  .parse(process.argv);
