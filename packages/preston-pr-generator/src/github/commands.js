const github = require('./api/github');

module.exports = function (opts) {

  const methods = {

    getReference: function(branch) {
      return github.gitdata.getReference(Object.assign({
        ref: `heads/${branch}`
      }, this.base))
    },

    getBlob: function (ref) {
      return github.gitdata.getBlob(Object.assign({
        sha: ref.sha
      }, this.base))
    },

    createBlob: function (change) {
      return github.gitdata.createBlob(Object.assign({
        content: change.content,
        encoding: "utf-8"
      }, this.base))
    },

    getTree: function (ref) {
      return github.gitdata.getTree(Object.assign({
        recursive: true,
        sha: ref.object.sha
      }, this.base))
    },

    createTree: function(blob, baseTree) {
      return github.gitdata.createTree(Object.assign({
        tree: [{
          path: opts.change.file,
          mode: '100644',
          type: 'blob',
          sha: blob.sha
        }],
        base_tree: baseTree.sha
      }, this.base))
    },

    createCommit: function (ref, tree) {
      return github.gitdata.createCommit(Object.assign({
          message: opts.change.commitMessage,
          parents: [ref.object.sha],
          tree: tree.sha,
          author: Object.assign({
              date: new Date().toISOString()
          }, opts.change.author)
      }, this.base))
    },

    createBranch: function(name, commit) {
      return github.gitdata.createReference(Object.assign({
          ref: name,
          sha: commit.sha
      }, this.base));
    },

    createPullRequest: function (branch) {
      return github.pullRequests.create(Object.assign({
          title: opts.pullRequest.title,
          head: opts.pullRequest.branch,
          base: opts.pullRequest.mergeTo
      }, this.base))
    },

    addAssignees: function (number, assignees) {
      return github.issues.addAssigneesToIssue(Object.assign({
        number: number,
        assignees: assignees
      }, this.base))
    }

  }

  methods.base = {
      user: opts.user,
      repo: opts.repo
  }

  return methods;
}
