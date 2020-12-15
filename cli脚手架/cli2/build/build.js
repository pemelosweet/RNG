'use strict'
require('./check-versions')() //该文件用于检测node和npm的版本，实现版本依赖

process.env.NODE_ENV = 'production'

const ora = require('ora') //在node端加载动画模块
const rm = require('rimraf')//用来删除文件和文件夹的
const path = require('path')
const chalk = require('chalk') //修改控制台中字符串的样式
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')//引入了webpack.prod.conf.js，因此build.js才是生产环境所需的webpack文件。

const spinner = ora('building for production...')  //设置一个动画的内容为 "building for production..."
spinner.start()  //加载动画

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  //利用 rm 模块先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余
  if (err) throw err
  webpack(webpackConfig, (err, stats) => { //将以下配置内容与 webpack.prod.conf.js中的配置进行合并
    spinner.stop()  //停止动画
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
