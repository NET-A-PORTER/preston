const GitCommands = require('./github/commands');

function raisePullRequest(opts) {

  const methods = GitCommands(opts);

  return methods.getReference(opts.pullRequest.mergeTo).then((ref) => {
    return Promise.all([
        methods.createBlob(opts.change),
        methods.getTree(ref)
    ]).then((values) => Promise.all([
        Promise.resolve(ref),
        methods.createTree(...values)
    ]))
  })
  .then((values) => methods.createCommit(...values))
  .then((commit) => methods.createBranch(`refs/heads/${opts.pullRequest.branch}`, commit))
  .then((branch) => methods.createPullRequest(branch))
  .then((pullRequest) => methods.addAssignees(pullRequest.number, opts.pullRequest.assignees))
}

module.exports = {
  raise: raisePullRequest
};
