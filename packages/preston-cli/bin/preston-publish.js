#!/usr/bin/env node

require('preston-core/src/global');

var cli = require('commander')

cli
  .option('-d, --dir [dir]', 'Directory of assets to publish', 'dist/')
  .option('-c, --configDir [dir]', 'Directory where config is held', 'config/')
  .parse(process.argv);

global.configDir = `${process.env.PWD}/${cli.configDir.replace(/^\/|\/$/g, '')}`;
var buildDir = `${process.env.PWD}/${cli.dir.replace(/^\/|\/$/g, '')}`;
var style = require(process.env.PWD + '/definition.json').name;

var utils = base.require('core/utils');
var publisher = base.require('core/publish');
var publish = publisher.publish;

publisher.setVersion(require(`${process.env.PWD}/package.json`).version);

utils.glob('css/' + style + '.css', { cwd: buildDir })
  .then(function(files) {
    var promises = [
      publish(buildDir, files, {
        'Content-Type': 'text/css'
      } )
    ];
    return Promise.all(promises);
  })
  .then(function() {
    return utils.glob('images/*.*', { cwd: buildDir });
  })
  .then(function(files) {
    if(files.length > 0) return publish(buildDir, files, {
      'Content-Type': 'image/svg+xml'
    });
  })
  .then(function() {
    return utils.glob('fonts/*.*', { cwd: buildDir });
  })
  .then(function(files) {
    if(files.length > 0) return publish(buildDir, files);
  })
  .then(function() {
    return utils.glob('index.html', { cwd: buildDir });
  })
  .then(function(files) {
    if(files.length > 0) return publish(buildDir, files, {
      'Content-Type': 'text/html; charset=utf-8'
    });
  })
  .then(function() {
    console.log('Finished publishing.');
    process.exit(0);
  })
  .catch(function(error) {
    console.error('Failed to publish. Error:', error);
    process.exit(1);
  });
