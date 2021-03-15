# 基本信息

## 离线文档
1. [本项目框架文档](http://192.168.1.222:3000)
2. [vuejs文档](http://192.168.1.222:4000)
3. [vue-router文档](http://192.168.1.222:4001)
4. [vuex文档](http://192.168.1.222:4002)
5. [ElementUI文档](http://192.168.1.222:8085)

## MOCK（测试数据）
[mock数据](http://192.168.1.222:7300/) **用户名/密码：** *data-reciving-system/fxq123456*

## 第三方插件

### v-charts（统计图表）
1. [v-charts在线文档](https://elemefe.github.io/v-charts/#/)
2. [echarts在线文档](http://echarts.baidu.com/index.html)

### vue-codemirror（文件对比插件）
[codemirror在线文档](http://codemirror.net/index.html)

### vue-treeselect（树形选择组件）
[vue-treeselect在线文档](https://vue-treeselect.js.org/)


## 开发
```bash

# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 安装依赖
npm install

# 启动服务
npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash

# 构建测试环境
npm run build:sit

# 构建生成环境
npm run build:prod
```

## 其它
```bash

# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## 目录结构
```
├── build                                    // 构建相关  
├── config                                   // 配置相关
├── src                                      // 源代码
│   ├── api                                  // 所有请求
│   ├── assets                               // 主题 字体等静态资源
│   ├── components                           // 全局公用组件
│   ├── directive                            // 全局指令
│   ├── filtres                              // 全局 filter
│   ├── icons                                // 项目所有 svg icons
│   ├── lang                                 // 国际化 language
│   ├── mock                                 // 项目mock 模拟数据
│   ├── router                               // 路由
│   ├── store                                // 全局 store管理
│   ├── styles                               // 全局样式
│   ├── utils                                // 全局公用方法
│   ├── vendor                               // 公用vendor
│   ├── views                                // view
│   │   ├── demo                             // 一些组件的使用示例
│   │   ├── errorLog                         // 错误日志
│   │   ├── errorPage                        // 公共的错误页
│   │   ├── home                             // 首页
│   │   ├── layout                           // 布局组件
│   │   ├── login                            // 登录、注册等
│   │   ├── svg-icons                        // svg图标
│   │   ├── sys-monitoringAnalysis           // 监测分析子系统
│   │   │   ├── cueManage                    // 线索管理
│   │   │   ├── dashboard                    // 仪表盘
│   │   │   ├── dataGovernance               // 数据治理
│   │   │   ├── dataHandl                    // 数据处理
│   │   │   ├── dataQuery                    // 数据查询
│   │   │   ├── InformationInteraction       // 信息交互
│   │   │   ├── macroAnalysis                // 宏观分析
│   │   │   ├── monitoringWarning            // 监测预警
│   │   ├──sys-reportingAgency               // 报送机构子系统系统
│   │   │   ├── center                       // 监测预警
│   │   │   │   ├── dataReceive              // 数据接收
│   │   │   ├── common                       // 监测预警
│   │   │   │   ├── artificialCorrection     // 人工补正
│   │   │   │   ├── detail                   // 详情页
│   │   │   │   ├── institutionBuild         // 机构能力建设
│   │   │   │   ├── institutionManage        // 机构管理
│   │   │   │   ├── list                     // 列表页
│   │   │   │   ├── systemManage             // 系统管理
│   │   │   │   ├── workPlatform             // 工作台
│   │   │   ├── report                       // 监测预警
│   │   │   │   ├── dataSubmit               // 数据报送
│   ├── App.vue                              // 入口页面
│   ├── main.js                              // 入口 加载组件 初始化等
│   └── permission.js                        // 权限管理
├── static                                   // 第三方不打包资源
├── .babelrc                                 // babel-loader 配置
├── eslintrc.js                              // eslint 配置项
├── .prettierrc                              // prettier 配置项
├── favicon.ico                              // favicon图标
├── index.html                               // html模板
└── package.json                             // package.json
```

## 样式目录结构

```
├── styles
│   ├── btn.scss                 # 按钮样式
│   ├── element-ui.scss          # 全局自定义 element-ui 样式
│   ├── index.scss               # 全局通用样式
│   ├── mixin.scss               # 全局mixin
│   ├── transition.scss          # vue transition 动画
│   └── variables.scss           # 全局变量
```

**工作流程是，全局样式都写在 src/styles 目录下，每个页面自己对应的样式都写在自己的 .vue 文件之中**





