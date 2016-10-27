var config 		= base.require('core/config');
var utils		= base.require('core/utils');
var Element		= require('./element');
var CopyMethod  = require('./compiler/method.copy');
var SpriteCompiler  = require('./compiler/compiler.sprite');


function Style(name, path) {
	this.name = name;
	this.path = path;
	return this;
}

Style.prototype = {
	getDefinition: function() {
		return utils
			.readFile(this.path + '/definition.json')
			.then((contents) => {
				var parsed = JSON.parse(contents);
				parsed.name = this.name;
				parsed.assets = (parsed.files || []).map((file) => {
          var fileName = file.split('.')[0]
          var fileExt = file.split('.')[1];
          var asset = config.get('assets').find(
              (asset) => asset.type === fileExt
          );
					return {
						name: asset.compiledType,
						url: asset.compiledPath + '/' + this.name + '.' + asset.compiledType
					};
				})
				return parsed;
			});
	},
	getElement: function * (name) {
    let element = Object.create(Element);
		return yield * Element.call(element, {
      dir: this.path + '/' + name,
      baseDir: this.name
    });
	},
  build: function * () {
    let files = (yield this.getDefinition()).files || [];

    for (const file of files) {
      let element = Object.create(Element);
      yield * Element.call(element, {
        dir: this.path,
        files: [file],
        baseDir: this.name
      });
    }

    // need to refactor;
    copy = new CopyMethod(`${global.buildDir}/css`);
    yield * copy({
      directory: `${global.buildDir}/css/${this.name}`,
      file: 'styles.css',
      name: this.name + '.css'
    })
  },
  sprite: function * (opts) {
    sprite = new SpriteCompiler();
    yield * sprite(opts);
  }
};

module.exports = Style;
