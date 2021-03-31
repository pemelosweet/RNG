//vue实例方法
import { createApp } from 'vue';

//入口文件
import App from './App.vue';

//路由
import router from './router';

//状态管理
import store from './store';

//element组件按需引入
import installElementPlus from './theme/index';

//自定义样式
import '@/assets/css/common.scss';

//开启mock数据
if (process.env.NODE_ENV === 'mock') {
    import('./mock');
}

const app = createApp(App);
app.use(router);
app.use(store);
app.use(installElementPlus);
app.mount('#app');
