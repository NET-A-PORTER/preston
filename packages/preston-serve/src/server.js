module.exports = require('koa')();

global.buildDir = `${process.env.PWD}/${process.env.BUILD_DIR.replace(/^\/|\/$/g, '')}`;
global.styleDir =  `${process.env.PWD}/${process.env.STYLE_DIR}`;
global.styleName = process.env.STYLE_NAME;

require('./global');
require('./core/serve');
require('./core/views');
require('./core/router');
require('./core/start');
