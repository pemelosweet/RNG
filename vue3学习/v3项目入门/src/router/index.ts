import { createRouter, createWebHistory } from 'vue-router';
import LayoutBase from '@/layouts/index.vue';
import { getToken } from '@/utils/auth';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/index.vue')
        },
        {
            path: '/',
            component: LayoutBase,
            name: 'home',
            children: [
                {
                    path: '/',
                    name: 'index',
                    //redirect: '/login',
                    component: () => import('@/views/index.vue'),
                    meta: {
                        title: '首页'
                    }
                }
            ]
        },
        {
            path: '/system',
            component: LayoutBase,
            name: 'system',
            meta: {
                title: '系统学习'
            },
            children: [
                {
                    path: '2ref',
                    name: '2ref',
                    component: () => import('../views/2ref/index.vue'),
                    meta: {
                        title: '2ref页面'
                    }
                },
                {
                    path: '3reactive',
                    name: '3reactive',
                    component: () => import('../views/3reactive/index.vue'),
                    meta: {
                        title: '3reactive页面'
                    }
                },
                {
                    path: '4toRefs',
                    name: '4toRefs',
                    component: () => import('../views/4toRefs/index.vue'),
                    meta: {
                        title: '4toRefs页面'
                    }
                },
                {
                    path: '5event',
                    name: '5event',
                    component: () => import('../views/5event/index.vue'),
                    meta: {
                        title: '5event页面'
                    }
                },
                {
                    path: '6computed',
                    name: '6computed',
                    component: () => import('../views/6computed/index.vue'),
                    meta: {
                        title: '6computed页面'
                    }
                },
                {
                    path: '7watch',
                    name: '7watch',
                    component: () => import('../views/7watch/index.vue'),
                    meta: {
                        title: '7watch页面'
                    }
                },
                {
                    path: '8router',
                    name: '8router',
                    component: () => import('../views/8router/index.vue'),
                    meta: {
                        title: '8router页面'
                    }
                },
                {
                    path: '9vuex',
                    name: '9vuex',
                    component: () => import('../views/9vuex/index.vue'),
                    meta: {
                        title: '9vuex页面'
                    }
                },
                {
                    path: '10comCommunication',
                    name: '10comCommunication',
                    component: () =>
                        import('../views/10comCommunication/index.vue'),
                    meta: {
                        title: '10comCommunication页面'
                    }
                },
                {
                    path: '11table',
                    name: '11table',
                    component: () => import('../views/11table/index.vue'),
                    meta: {
                        title: '11table页面'
                    }
                }
            ]
        }, {
            path: '/MediaManagement',
            component: LayoutBase,
            name: 'MediaManagement',
            meta: {
                title: '媒介管理'
            },
            children: [
                {
                    path: 'DMCComponentsPage',
                    name: 'DMCComponentsPage',
                    component: () => import('@/views/DMC/components.vue'),
                    meta: {
                        title: 'DMC组件管理'
                    }
                },
                {
                    path: 'ElementPlugins',
                    name: 'ElementPlugins',
                    component: () =>
                        import(
                            '@/views/DMC/elementPlugins.vue'
                        ),
                    meta: {
                        title: 'Element组件测试'
                    }
                },
                {
                    path: 'CooperativeManagement',
                    name: 'CooperativeManagement',
                    component: () =>
                        import(
                            '@/views/DMC/MediaManagement/CooperativeManagement/index.vue'
                        ),
                    meta: {
                        title: '合作管理'
                    }
                },
                {
                    path: 'ResourceManagement',
                    name: 'ResourceManagement',
                    component: () =>
                        import(
                            '@/views/DMC/MediaManagement/ResourceManagement/index.vue'
                        ),
                    meta: {
                        title: '资源管理'
                    }
                }
            ]
        },
        {
            path: '/Example',
            component: LayoutBase,
            name: 'Example',
            meta: {
                title: '测试'
            },
            children: [
                {
                    path: 'Example',
                    name: 'Example',
                    component: () => import('../views/Example/index.vue'),
                    meta: {
                        title: 'Mock测试Demo'
                    }
                },
                {
                    path: 'WebSocket',
                    name: 'WebSocket',
                    component: () => import('../views/websocket/index.vue'),
                    meta: {
                        title: 'WebSocket测试Demo'
                    }
                },
                {
                    path: 'WebSocket2',
                    name: 'WebSocket2',
                    component: () => import('../views/websocket2/index.vue'),
                    meta: {
                        title: 'WebSocket2'
                    }
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/ErrorPage/404/index.vue')
        },
        {
            path: '/cti',
            component: LayoutBase,
            name: 'cti',
            children: [
                {
                    path: '/cti',
                    name: 'cti',
                    component: () => import('@/views/CTI/index.vue'),
                    meta: {
                        title: 'CTI调试'
                    }
                }
            ]
        },
        {
            path: '/BI',
            component: LayoutBase,
            name: 'BI',
            meta: {
                title: '图表'
            },
            children: [
                {
                    path: 'column',
                    name: 'column',
                    component: () => import('../views/BI/column.vue'),
                    meta: {
                        title: '柱状图'
                    }
                },
                {
                    path: 'columPoly',
                    name: 'columPoly',
                    component: () => import('../views/BI/columPoly.vue'),
                    meta: {
                        title: '柱状折线混合图'
                    }
                },
                {
                    path: 'annular',
                    name: 'annular',
                    component: () => import('../views/BI/annular.vue'),
                    meta: {
                        title: '环形图'
                    }
                },
                {
                    path: 'area',
                    name: 'area',
                    component: () => import('../views/BI/area.vue'),
                    meta: {
                        title: '面积图'
                    }
                },
                {
                    path: 'pie',
                    name: 'pie',
                    component: () => import('../views/BI/pie.vue'),
                    meta: {
                        title: '饼状图'
                    }
                },
                {
                    path: 'curve',
                    name: 'curve',
                    component: () => import('../views/BI/curve.vue'),
                    meta: {
                        title: '常用折线图'
                    }
                },
                {
                    path: 'breakLine',
                    name: 'breakLine',
                    component: () => import('../views/BI/breakLine.vue'),
                    meta: {
                        title: '折线图'
                    }
                },
                {
                    path: 'stack',
                    name: 'stack',
                    component: () => import('../views/BI/stack.vue'),
                    meta: {
                        title: '堆叠条形图'
                    }
                },
                {
                    path: 'arch',
                    name: 'arch',
                    component: () => import('../views/BI/arch.vue'),
                    meta: {
                        title: '嵌套环形图'
                    }
                }
            ]
        },
        {
            path: "/label",
            name: "label",
            component: LayoutBase,
            meta: {
                title: '标签管理'
            },
            children: [
                {
                    path: "card",
                    name: "label-card",
                    component: () => import("@/views/LabelCard/index.vue"),
                    meta: {
                        title: '标签卡片'
                    }
                },
                {
                    path: "roster",
                    name: "label-roster",
                    component: () => import("@/views/LabelCard/Roster.vue"),
                    meta: {
                        title: '员工排班'
                    }
                }
            ]
        },
        {
            path: '/crm',
            component: LayoutBase,
            name: 'crm',
            meta: {
                title: 'CRM组件'
            },
            children: [
                {
                    path: 'editor',
                    name: 'editor',
                    component: () => import('../views/Editor/index.vue'),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    path: 'barcode',
                    name: 'barcode',
                    component: () => import('../views/BarCode/index.vue'),
                    meta: {
                        title: '条形码生成'
                    }
                }
            ]
        },
        {
            path: '/travel-components',
            component: LayoutBase,
            meta: {
                title: '旅程相关时间节点组件'
            },
            children: [
                {
                    path: '/travel-components',
                    name: 'travelComponents',
                    component: () => import('../views/Travel/index.vue'),
                    meta: {
                        title: '旅程相关时间节点组件'
                    }
                }
            ]
        },
        {
            path: "/:notFound(.*)",
            redirect: "/404"
        }
    ]
});
// 路由守卫
router.beforeEach((to, from, next) => {
    const cookie = getToken();
    if (to.meta.title) {
        // 设置页面title
        document.title = to.meta.title;
    }

    // if (to.name !== 'login' && !cookie) {
    //     next({ name: 'login' });
    // } else {
    //     if (to.name === 'login' && cookie) {
    //         return next('/');
    //     } else {
    //         return next();
    //     }
    // }
    next()
});

export default router;
