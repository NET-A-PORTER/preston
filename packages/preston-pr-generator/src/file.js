const GitCommands = require('./github/commands');

function get(opts) {

  const methods = GitCommands(opts);

  return methods.getReference(opts.branch)
    .then((ref) => methods.getTree(ref))
    .then((tree) => {
        return tree.tree.find(entity => entity.path == opts.file)
    })
    .then((entity) => methods.getBlob(entity))
    .then((blob) => new Buffer(blob.content, blob.encoding).toString("ascii"))
}

module.exports = {
  get: get
};
