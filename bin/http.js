const axios = require('axios')
const { repoListUrl } = require('./url')

axios.interceptors.response.use(res => {
  return res.data;
})

// 获取模板列表
async function getRepoList() {
  return axios.get(repoListUrl)
}

module.exports = {
  getRepoList
}