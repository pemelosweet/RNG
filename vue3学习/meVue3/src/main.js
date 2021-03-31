import { createApp } from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './index.css'
//以上为默认的
// import Antd from 'ant-design-vue'
import Element from 'element-plus'
import store from './store/index'
//样式
import 'ant-design-vue/dist/antd.css'
//自定义样式
import router from './router'
//权限控制以及路由
import '/@/permission' // permission control
createApp(App).use(Element).use(store).use(router).mount('#app')
