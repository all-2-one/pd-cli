#! /usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('create <name>')
  .description('创建项目')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('./create')(name, options)
  })

program.parse(process.argv)
