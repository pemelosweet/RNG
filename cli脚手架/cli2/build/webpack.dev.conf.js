'use strict'
const utils = require('./utils')  //引入的工具包
const webpack = require('webpack') //引入webpack包
const config = require('../config') //引入 config下的index.js文件
const merge = require('webpack-merge') //合并配置文件
const path = require('path') //node的path模块，对路径进行处理
const baseWebpackConfig = require('./webpack.base.conf')//将生产和开发环境下共用的配置文件进行了抽离形成了该文件
const CopyWebpackPlugin = require('copy-webpack-plugin')//拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//加载html模块
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //友好的错误提示插件
const portfinder = require('portfinder')  //在当前机器上找一个可打开的端口号，默认是8080,如果端口号被占用则重新寻找可打开的端口号。 

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, { //利用merge插件将 baseWebpackConfig 配置与当前配置进行合并
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })  //引入utils中一些css-loader和postcss-loader
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool, //控制是否生成以及如何生成源码映射，这里引入的是config下的index.js的 “devtool: 'cheap-module-eval-source-map'”,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning', //当使用inline mode，devTools的命令行中将会显示一些调试信息
    historyApiFallback: { //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, //启用 webpack 的模块热替换特性
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host, //要开启的域名，可在package.json中的“dev”命令中进行配置
    port: PORT || config.dev.port, //要开启的端口号，可在package.json中的“dev”命令中进行配置
    open: config.dev.autoOpenBrowser, //是否自动在浏览器中打开，可在package.json中的“dev”命令中进行配置
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,  //当出现跨域时设置代理，这里引入了config下的index.js的配置
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [//插件部分
    new webpack.DefinePlugin({   //配置全局变量
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),  // 模块热替换它允许在运行时更新各种模块，而无需进行完全刷新
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id。
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ //打包时生成index.html并且自动加载app.js文件  <!-- built files will be auto injected -->
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),//将static整个文件夹原封不动地拷贝到dist目录下。
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port   //获取当前的端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
