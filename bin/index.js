#! /usr/bin/env node 
'use strict';

var program = require('commander');
var axios = require('axios');
var ora = require('ora');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var program__default = /*#__PURE__*/_interopDefaultLegacy(program);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

var version = "1.0.0";

const orgs = 'all-2-one';

const repoListUrl = `https://api.github.com/orgs/${orgs}/repos`;
const getRequestUrl = repo => `${orgs}/${repo}#main`;
// https://api.github.com/repos/all-2-one/react-template/tags

// export default {
//   repoListUrl,
//   getRequestUrl
// }

axios__default["default"].interceptors.response.use(res => {
  return res.data;
});

// 获取模板列表
async function getRepoList() {
  return axios__default["default"].get(repoListUrl)
}

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora__default["default"](message);
    spinner.text = '下载模板中';
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
        spinner.fail('Request failed, refetch ...');
    }
}

const util = require('util');
const downloadGitRepo = require('download-git-repo');
const path$1 = require('path');
const inquirer$1 = require('inquirer');
const chalk = require('chalk');

class Generator {
  constructor (name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 用户选择哪个模板
  async getRepo() {
    const repoList = await getRepoList();
    if (!repoList) {
      return
    }
    
    const repoNames = repoList.map(item => item.name).filter(name => name.indexOf('template') > -1);
    const { repo } = await inquirer$1.prompt({
      name: 'repo',
      type: 'list',
      choices: repoNames,
      message: '请选择模板'
    });

    return repo
  }

  async create() {
    const repo = await this.getRepo();
    await this.download(repo);
  }

  async download(repo) {
    try {
      await wrapLoading(
        this.downloadGitRepo,
        'waiting download template',
        getRequestUrl(repo),
        path$1.resolve(process.cwd(), this.targetDir)
      );

      console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
      console.log('  npm install or yarn \r\n');
      console.log('  npm run start or yarn start\r\n');
    } catch (e) {
      console.log('项目初始化失败', e);
    }
  }
}

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const create = async (name, options) => {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(cwd, name);

  // 目录是否已经存在
  if (fs.existsSync(targetDir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ]);

      if (!action) {
        return;
      }

      if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetDir);

  generator.create();
};

/**
Commands:
  create [options] <name>  创建项目
  test <aa>                测试
 */
program__default["default"]
  .version(version)
  .command('create <name>')
  .description('创建项目')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    create(name, options);
  });

program__default["default"]
  .command('test <file>')
  .description('测试')
  .option('-c', '测试配置文件')
  .action((file, options) => {
    // pd test a.js -c
    // file a.js
    // options { c: true }
    console.log(file, options);
  });


program__default["default"].parse(process.argv);
