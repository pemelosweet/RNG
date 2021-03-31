import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from './components/lay/index.vue'
const history = createWebHashHistory()
export const routes = [
    {
        path: '/login',
        component: () => import('./view/login/login.vue'),
        hidden: true
    },
    {
        path: '/', 
        name: 'home',
        meta: {
            title: '开始',
        },
        component: Layout,
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('./view/home/home.vue'),
                meta: {
                    title: '首页',
                }
            },
        ]
    },
    {
        path: '/system',
        name: 'system',
        component: Layout,
        meta: {
            title: '系统学习',
            // role: ['study']
        },
        children: [
            {
                path: '/system/user',
                component: () => import('./view/system/user.vue'),
                name: 'user',
                meta: {
                    title: '使用者',
                }
            },
        ]
    },
    {
        path: '/404',
        component: () => import('./view/404/404.vue'),
        hidden: true,
        meta: {
            title: '404页面',
        },
    },
     //放到最后
    {
        path: "/:notFound(.*)",
        hidden: true,
        redirect: "/404",
        
    }
]
export const roleRoutes  = [
   
]
const router = createRouter(
    {
        history,
        routes,
    }
)
export default router

