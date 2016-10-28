# Preston Pull Request Generator

Generates Pull Requests on [Preston](https://github.com/NET-A-PORTER/preston) when a new version of [Outnet-2015](https://github.com/NET-A-PORTER/outnet-2015) is released.

Hosted on: [https://preston-nap-pr-generator.herokuapp.com/webhook](https://preston-nap-pr-generator.herokuapp.com/webhook)

## Test

Running the test will create a pull request [here](https://github.com/damnhipster/preston-pr-test).

```
npm test
```

Check the generated pull request to see if it contains what you expect.


**NOTE:** this test requires a `test/auth.json` file to exist. If you don't have one, please create a repository on github and update `test/test-pull-request.js` with the repository details.
