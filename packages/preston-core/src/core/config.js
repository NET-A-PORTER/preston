var convict = require('convict');
var schema = base.require('../config/schema.json');

var conf = convict(schema);

try {
  conf.loadFile(`${global.configDir}/default.json`);
} catch (e) {
  console.error('Couldn\'t load config for default');
}

try {
  conf.loadFile(`${global.configDir}/${conf.get('env')}.json`);
} catch (e) {
  console.error('Couldn\'t load config for', conf.get('env'));
}

module.exports = conf;
