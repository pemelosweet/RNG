'use strict'
const path = require('path')  //node的path模块，对路径进行处理
const utils = require('./utils') //引入的工具包
const config = require('../config') //引入 config下的index.js文件
const vueLoaderConfig = require('./vue-loader.conf') //根据NODE_ENV这个变量分析是否是生产环境，然后根据不同的环境来加载，判断是否开启了sourceMap的功能

function resolve (dir) {
  return path.join(__dirname, '..', dir) //对路径进行处理，获取到绝对路径
}



module.exports = {
  context: path.resolve(__dirname, '../'), //对路径进行处理，跳到当前项目的根目录下
  entry: {   //入口文件，即项目要引入哪个js文件
    app: './src/main.js' //因为 context 中已经跳到了当前项目的根目录下，所以这里的路径是以 ./src 开头
  },
  output: {//输出文件，即项目要输出到哪里去
    path: config.build.assetsRoot, //输出到根目录下的dist问价夹里，具体地址可以在config下的index.js中进行修改
    filename: '[name].js',//以文件的原始名输出
    // process.env是从config/prod.env.js中获取的 {'process.env': {NODE_ENV: '"production"'} }
    publicPath: process.env.NODE_ENV === 'production'  //根据process.env.NODE_ENV 来判断是生产模式还是开发模式，将最终打包的项目要放到服务器的什么地方，默认是 '/' 即服务器的根目录下。
      ? config.build.assetsPublicPath   //发布的根目录,'/'
      : config.dev.assetsPublicPath    //根目录  '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //简化一些文件名，引入文件时可以不带后缀名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),  //简化文件的引入问题，如：本文件中要引入 src下的common里的demo.js，你就可以这样引入：@/common/demo.js
    }
  },
  module: {
    rules: [  // 配置各种loader，来处理对应的文件
      {
        test: /\.vue$/, //使用vue-loader处理以.vue结束的文件
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,     //使用babel-loader处理以.js结束的文件，即js文件
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  //使用url-loader处理各种格式的图片资源，最大限制10000KB,这里不处理src同级目录下的static里的图片。
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')//将处理后的放在img文件下，并且加上7位hash值。
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //使用url-loader处理视频文件。
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,   //使用url-loader处理字体文件。
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
