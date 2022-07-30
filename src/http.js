import axios from 'axios'
import { repoListUrl } from './url'

axios.interceptors.response.use(res => {
  return res.data;
})

// 获取模板列表
export async function getRepoList() {
  return axios.get(repoListUrl)
}