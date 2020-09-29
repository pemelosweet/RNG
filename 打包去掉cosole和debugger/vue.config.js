'use strict'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '信息化项目管理系统' // page title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // '/': {
      //   ws: false,
      //   target: '',
      //   changeOrigin: true
      // }
      // '/purchase/*': {
      //   target: 'http://192.168.1.133:8084',
      //   changeOrigin: true
      // },

      '/achieve/*': {
        target: 'http://192.168.3.96:8084',
        changeOrigin: true
      },
      // 综合管理
      '/noticeexcellent/*': {
        target: 'http://192.168.200.54:8765',
        changeOrigin: true
      },
      '/api/*': {
        // target: 'http://192.168.200.54:8765',
        target: 'http://192.168.200.131:8765',
        // target: 'http://10.10.121.107:8765',
        changeOrigin: true
      },
      '/pmis/*': {
        // target: 'http://10.10.121.107:8765',
        target: 'http://192.168.137.68:8765',
        changeOrigin: true
      },
      '/desktopSetting/*': {
        // target: 'http://10.10.121.107:8765',
        target: 'http://192.168.3.246:8084',
        logLevel: 'debug',
        changeOrigin: true
      }
      // '/': {
      //   target: 'http://192.168.200.227:8771',
      //   changeOrigin: true,
      //   ws: false, // 值为false防止控制台报错★★★★★★★★
      //   pathRewrite: {
      //     // ▼或者后台接口统一加一个前缀如api，然后这里不写 '^/' 写 '^/api'。
      //     '^/': ''
      //   }
      // }
      // '/api/*': {
      //   // target: 'http://192.168.200.131:4000',
      //   changeOrigin: true
      // }
    }
    // before: require('./mock/mock-server.js')
  },
  // before: require('./mock/mock-server.js')
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config.plugin('js').use(new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true, // 生产环境自动删除debugger
                drop_console: true // 生产环境自动删除console
              },
              warnings: false
            },
            sourceMap: false,
            parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
          }))
        }
      )
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
