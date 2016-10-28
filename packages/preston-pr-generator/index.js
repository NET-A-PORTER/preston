var http = require('http');
var fetch = require('node-fetch');
var getFile = require('./src/file').get;
var raisePullRequest = require('./src/pull-request').raise;
var createHandler = require('travisci-webhook-handler')


var handler;

module.exports = function(callback) {
  fetch('https://api.travis-ci.org/config')
    .then((res) => res.text())
    .then(function(body) {
      handler = createHandler({
        path: '/webhook',
        public_key: JSON.parse(body).config.notifications.webhook.public_key
      })
    })
    .then(function() {
        http.createServer(function (req, res) {
          handler(req, res, function (err) {
            console.log(err);
            res.statusCode = 404
            res.end('no such location')
          })
        }).listen(process.env.PORT || 7777)


        handler.on('error', function (err) {
          console.error('Error:', err.message)
        })

        handler.on('success', function (event) {
          if(event.payload.tag) {
            var version = event.payload.tag;
            callback(version);
          }
        })

        handler.on('failure', function (event) {
          console.log('Build failed!')
        })

        handler.on('start', function (event) {
          console.log('Build started!')
        })
    });
}
