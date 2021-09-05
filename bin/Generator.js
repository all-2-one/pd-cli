const util = require('util')
const downloadGitRepo = require('download-git-repo')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { getRepoList } = require('./http')
const { getRequestUrl } = require('./url')

class Generator {
  constructor(name, targetDir) {
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
      message: 'Please choose a template to create project'
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

module.exports = Generator

const ora = require('ora')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  }
}