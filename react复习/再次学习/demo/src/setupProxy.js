// const proxy= require('http-proxy-middleware')
// module.exports = function (app) {
//     app.use("/api",
//     proxy({
//         target: 'http://8.131.245.98:8888',
//         changeOrigin: true,
//         pathRewrite: {
//             "^/api": ""
//         }
//     })
// )
// }
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        "/api",createProxyMiddleware({
            target: 'http://8.131.245.98:8888',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    )
}
