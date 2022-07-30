import program from 'commander'
import { version } from '../package.json'
import create from './create'

/**
Commands:
  create [options] <name>  创建项目
  test <aa>                测试
 */
program
  .version(version)
  .command('create <name>')
  .description('创建项目')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    create(name, options)
  })

program
  .command('test <file>')
  .description('测试')
  .option('-c', '测试配置文件')
  .action((file, options) => {
    // pd test a.js -c
    // file a.js
    // options { c: true }
    console.log(file, options)
  })


program.parse(process.argv)
