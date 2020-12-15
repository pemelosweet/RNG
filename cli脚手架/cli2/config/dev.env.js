'use strict'
// 当在开发环境下引用（webpack.dev.config.js中的plugin中）的是此文件，次文件指定了 开发模式: node-env ,
 //利用merge方法将prod.env.js与本文件进行合并，在开发模式下输出 NODE_ENV="development"
  //webpack.dev.config.js中的plugin引用如下:
       // new webpack.DefinePlugin({
        //   'process.env': require('../config/dev.env')
       // })
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
