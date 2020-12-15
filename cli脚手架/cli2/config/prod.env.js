'use strict'
 // 在生产模式下调用此文件
 // 在webpack.prod.config.js中的plugin中引用如下:
       //const env = require('../config/prod.env')
       // new webpack.DefinePlugin({
       //   'process.env': env
       // }),
module.exports = {
  NODE_ENV: '"production"'
}
