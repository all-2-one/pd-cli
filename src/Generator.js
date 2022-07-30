const util = require('util')
const downloadGitRepo = require('download-git-repo')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

import { getRequestUrl } from './url'
import { getRepoList } from './http'
import { wrapLoading } from './loading'

class Generator {
  constructor (name, targetDir) {
    this.name = name
    this.targetDir = targetDir
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 用户选择哪个模板
  async getRepo() {
    const repoList = await getRepoList()
    if (!repoList) {
      return
    }
    
    const repoNames = repoList.map(item => item.name).filter(name => name.indexOf('template') > -1)
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repoNames,
      message: '请选择模板'
    })

    return repo
  }

  async create() {
    const repo = await this.getRepo()
    await this.download(repo)
  }

  async download(repo) {
    try {
      await wrapLoading(
        this.downloadGitRepo,
        'waiting download template',
        getRequestUrl(repo),
        path.resolve(process.cwd(), this.targetDir)
      )

      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
      console.log('  npm install or yarn \r\n')
      console.log('  npm run start or yarn start\r\n')
    } catch (e) {
      console.log('项目初始化失败', e)
    }
  }
}

export default Generator
