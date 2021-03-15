// modify 2020年12月31日 15点15分
process.env.VUE_APP_FEBUILDTIME = new Date().getTime();
process.env.VUE_APP_FEBUILDTIMEX = new Date();
module.exports = {
    outputDir: 'dist',
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map';
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'product',
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "~@/assets/css/element-plus.scss";'
            }
        }
    },
    productionSourceMap: false,
    //代理服务器
    devServer: {
        open: process.env.NODE_ENV !== 'product',
        proxy: {
            // 登录代理
            '/oauth': {
                target: 'http://server.staff.yuzhilin.net.cn/oauth',
                pathRewrite: {
                    '^/oauth': ''
                },
                changeOrigin: true
            },
            // crm接口代理
            '/crm': {
                target: 'http://192.168.32.94:8080/',
                pathRewrite: {
                    '^/crm': ''
                },
                changeOrigin: true
            },
            // ehr代理
            '/ehr': {
                target: 'http://server.staff.yuzhilin.net.cn/ehr',
                pathRewrite: {
                    '^/ehr': ''
                },
                changeOrigin: true
            },
            // bi代理
            '/bi': {
                target: 'http://server.staff.yuzhilin.net.cn/bi',
                pathRewrite: {
                    '^/bi': ''
                },
                changeOrigin: true
            },
            // ehr代理
            '/dmc': {
                target: 'http://server.staff.yuzhilin.net.cn/dmc',
                pathRewrite: {
                    '^/dmc': ''
                },
                changeOrigin: true
            },
        }
    }
};
