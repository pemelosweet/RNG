const path = require('path')
 const { override,addWebpackAlias, fixBabelImports,addLessLoader  } = require('customize-cra');
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   //配置根目录
     addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  // 配置主题
  addLessLoader({
      javascriptEnabled: true,//y允许用js修改底层less样式
      modifyVars: { '@primary-color': '#1DA57A' },
    }),
 );