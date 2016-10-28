const getFile = require('../src/file').get;

getFile({
  user: 'damnhipster',
  repo: 'preston-pr-test',
  branch: 'master',
  file: 'README.md'
}).then((pullRequest) => {
  console.log('SUCCESS! file was retrieved');
  process.exit(0);
}).catch((error) => {
  console.error('FAIL.\nError:', error);
  process.exit(1);
});
