# preston-pr-generator

Generates Pull Requests when a new version of a style guide is released.

## Test

Running the test will create a pull request [here](https://github.com/damnhipster/preston-pr-test).

```
npm test
```

Check the generated pull request to see if it contains what you expect.


**NOTE:** this test requires a `test/auth.json` file to exist. If you don't have one, please create a repository on github and update `test/test-pull-request.js` with the repository details.
