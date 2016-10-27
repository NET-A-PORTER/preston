var glob 	= require('glob');
var SVGSpriter = require('svg-sprite');
var pathUtil = require('path');
var File = require('vinyl');
var fs = require('fs');
var mkdirp = require('mkdirp');
var promisify = require('es6-promisify');

var config, defaultOptions, spritesConfig;

function resizer(opts) {
  return function(shape, sprite, callback) {
    shape.width = config.width * opts.width;
    shape.height = config.height * opts.height;
    callback(null);
  }
}

function getOptions(name, spritesheet, sprites, mapOutputDir, templateDir) {
  var options = Object.assign({}, defaultOptions);
  options.variables = { name: name };
  options.dest = spritesheet.directory;
  options.shape.transform.push({ resize: resizer(spritesConfig[name]) });
  options.mode.css.sprite = spritesheet.filename;
  options.mode.css.render.scss.template = templateDir + '/sprite-map.hbs';
  options.mode.css.render.scss.dest = mapOutputDir + '/_' + name + 'Icons';
  options.shape.align = templateDir + '/sprite-alignment.yml';
  return options;
}
function SpriteCompiler() {
  config 		= require('../../../core/config').get('sprite');

  spritesConfig = config.sprites;

  defaultOptions = {
    dest: 'icons/images',
    shape: {
      align: '',
      transform: []
    },
    mode: {
      css: {
        dest: '.',
        bust: false,
        sprite: 'icons',
        layout: config.layout,
        prefix: '.icon-%s',
        render: {
          scss: {
            template: "",
            dest: ""
          }
        }
      }
    }
  };

	return function * ({name, spritesheet, sprites, mapOutputDir, templateDir}) {

    var spriter = new SVGSpriter(getOptions(name, spritesheet, sprites, mapOutputDir, templateDir));
    var cwd = sprites.directory;
    var files = yield promisify(glob)('**/*.svg', {cwd: cwd})
    files.forEach(function(file) {
      var filePath = pathUtil.join(cwd, file);
      spriter.add(new File({
        path: filePath,
        base: cwd,
        contents: fs.readFileSync(filePath)
      }));
    });

    spriter.compile(function(err, result, data) {
      if(err) {
        console.log(err);
        return;
      }
      for (var type in result.css) {
        mkdirp.sync(pathUtil.dirname(result.css[type].path));
        fs.writeFileSync(result.css[type].path, result.css[type].contents);
      }
    });

	};
}

module.exports = SpriteCompiler;
