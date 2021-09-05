const repoListUrl = 'https://api.github.com/orgs/pd-cli/repos'
const getRequestUrl = repo => `pd-cli/${repo}#main`;

module.exports = {
  repoListUrl,
  getRequestUrl
}
