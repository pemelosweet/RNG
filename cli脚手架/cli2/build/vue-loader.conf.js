'use strict'
//根据NODE_ENV这个变量分析是否是生产环境，然后根据不同的环境来加载，判断是否开启了sourceMap的功能。方便之后在cssLoaders中加上sourceMap功能。然后判断是否设置了cacheBusting属性，
4 // 它指的是缓存破坏，特别是进行sourceMap debug时，设置成false是非常有帮助的。最后就是一个转化请求的内容，video、source、img、image等的属性进行配置。具体的还是需要去了解vue-loader这个
5 // webpack的loader加载器
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
  //处理项目中的css文件，生产环境和测试环境默认是打开sourceMap，而extract中的提取样式到单独文件只有在生产环境中才需要

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {//在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为require调用，以便目标资源可以由 webpack 处理.
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
