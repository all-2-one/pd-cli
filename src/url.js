const orgs = 'all-2-one'

export const repoListUrl = `https://api.github.com/orgs/${orgs}/repos`
export const getRequestUrl = repo => `${orgs}/${repo}#main`;
// https://api.github.com/repos/all-2-one/react-template/tags
