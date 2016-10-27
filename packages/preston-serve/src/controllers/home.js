var config = require('preston-core/src/core/config');
var build = require('preston-core/src/controllers/styles').build;

function * render() {
  if(config.get('env') == 'local') {
    yield * build(global.styleName);
    yield * build('preston');
  }
	yield this.render('home');
}

module.exports = {
	render: render
};
