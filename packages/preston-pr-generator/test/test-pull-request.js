const raisePullRequest = require('../src/pull-request').raise;

raisePullRequest({
  user: 'damnhipster',
  repo: 'preston-pr-test',
  change: {
    content: 'hello',
    file: 'README.md',
    commitMessage: 'test commit',
    author: {
      name: 'Preston PR Generator',
      email: 'hamant.brahmbhatt@net-a-porter.com',
    }
  },
  pullRequest: {
      title: 'Test pull request',
      branch: `${Date.now()}`,
      mergeTo: 'master',
      assignees: ['damnhipster']
  }
})
.then((pullRequest) => {
  console.log('SUCCESS! Pull request was created:', pullRequest.html_url);
  process.exit(0);
})
.catch((error) => {
  console.error('FAIL.\nError:', error);
  process.exit(1);
});
