#!/usr/bin/env node

require('preston-core/src/global');

var cli = require('commander')
var yield = require('co');

cli
  .option('-o, --outputDir [dir]', 'Directory for built assets', 'dist/')
  .option('-c, --configDir [dir]', 'Directory where config is held', 'config/')
  .option('-s, --spriteDir [dir]', 'Directory of images (and templates) to generate sprites from')
  .parse(process.argv);

//remove first and last slash
global.buildDir = `${process.env.PWD}/${cli.outputDir.replace(/^\/|\/$/g, '')}`;
global.configDir = `${process.env.PWD}/${cli.configDir.replace(/^\/|\/$/g, '')}`;
if(cli.spriteDir) cli.spriteDir = `${process.env.PWD}/${cli.spriteDir.replace(/^\/|\/$/g, '')}`;

var styleName = require(process.env.PWD + '/definition.json').name;

var build = base.require('controllers/styles').build;
var utils = base.require('core/utils');

yield(function * main() {
  var opts = { sprite: [] };
  if(cli.spriteDir) {
    var dirs = yield utils.getDirs(`${cli.spriteDir}/images/sprite`);
    for (spriteDir of dirs) {
      opts.sprite.push({
        name: spriteDir,
        spritesheet: {
          filename: spriteDir + '-icons',
          directory: `${cli.spriteDir}/images/`,
        },
        sprites: {
          directory: `${cli.spriteDir}/images/sprite/${spriteDir}`
        },
        mapOutputDir: `${cli.spriteDir}/maps`,
        templateDir: `${cli.spriteDir}/templates`
      })
    }
  }
  yield * build(styleName, opts);
  if(cli.spriteDir) console.log('Generated spritesheets for', dirs);
  console.log('Generated', styleName, 'in', global.buildDir);
}).catch(function(err) {
  console.error('Failed to build. Error:', err);
  process.exit(1);
});
