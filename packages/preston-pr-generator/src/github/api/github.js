const GitHubApi = require("github");
const token = process.env.GITHUB_API_TOKEN || require("../../../test/auth.json")["token"]

const github = new GitHubApi({
    // optional
    // debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    headers: {
        "user-agent": "preston-pr-generator" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000,
    Promise: Promise
});

github.authenticate({
    type: "oauth",
    token: token
});

module.exports = github;
