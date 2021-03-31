<template>
    <el-aside
        class="layout-base-aside"
        :class="{ 'layout-base-aside--isclose': isCollapse }"
    >
        <el-scrollbar class="scroll">
            <el-menu
                class="menu"
                :default-active="activeMenu"
                :collapse="isCollapse"
            >
                <div v-for="(item, index) in menus" :key="item.route">
                    <el-link :href="item.route" @click.prevent>
                        <el-menu-item
                            :index="item.route"
                            :class="'layout-title__' + menuLevel"
                            @click="goToUrl(item.route)"
                            v-if="!item.children && item.show"
                        >
                            <template #title>
                                <span class="layout-base-aside--1-title">
                                    <i
                                        v-if="item.icon"
                                        class="iconfont"
                                        :class="item.icon"
                                    ></i
                                    >{{ item.name }}
                                </span>
                            </template>
                        </el-menu-item>
                    </el-link>
                    <el-submenu
                        :index="index + ''"
                        :class="'layout-children__' + menuLevel"
                        v-if="item.children"
                    >
                        <template #title>
                            <i
                                v-if="item.icon"
                                class="iconfont"
                                :class="item.icon"
                            ></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item
                            v-for="child in item.children"
                            :index="child.route"
                            :key="child.route"
                            @click="goToUrl(child.route)"
                            :class="'layout-title__' + 2"
                        >
                            <el-link
                                v-if="child.show"
                                :href="child.route"
                                @click.prevent
                            >
                                <span class="circle"></span>
                                {{ child.name }}
                            </el-link>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </el-scrollbar>
        <div class="bootom">
            <i
                v-show="isCollapse"
                class="el-icon-s-unfold"
                @click="isCollapse = false"
            ></i>
            <i
                v-show="!isCollapse"
                class="el-icon-s-fold"
                @click="isCollapse = true"
            ></i>
        </div>
    </el-aside>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    ElAside,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubmenu,
} from 'element-plus';
export default defineComponent({
    name: 'lefter',
    components: {
        ElAside,
        ElMenu,
        ElMenuItem,
        ElMenuItemGroup,
        ElSubmenu,
    },
    setup() {
        const menuLevel = ref(1);
        const isCollapse = ref(false);
        const menus = ref([
            {
                name: '首页',
                icon: 'el-icon-s-home',
                route: '/',
                show: true,
            },
            {
                name: '系统学习',
                icon: 'el-icon-menu',
                children: [
                    {
                        name: 'Ref使用',
                        route: '/system/2ref',
                        show: true,
                    },
                    {
                        name: 'Reactive使用',
                        route: '/system/3reactive',
                        show: true,
                    },
                    {
                        name: 'toRefs使用',
                        route: '/system/4toRefs',
                        show: true,
                    },
                    {
                        name: 'event定义&调用',
                        route: '/system/5event',
                        show: true,
                    },
                    {
                        name: 'computed使用',
                        route: '/system/6computed',
                        show: true,
                    },
                    {
                        name: 'watch使用',
                        route: '/system/7watch',
                        show: true,
                    },
                    {
                        name: 'router使用',
                        route: '/system/8router',
                        show: true,
                    },
                    {
                        name: 'vuex使用',
                        route: '/system/9vuex',
                        show: true,
                    },
                    {
                        name: '父子组件使用',
                        route: '/system/10comCommunication',
                        show: true,
                    },
                    {
                        name: 'table使用',
                        route: '/system/11table',
                        show: true,
                    },
                ],
            },
            {
                name: '媒介管理',
                icon: 'el-icon-phone',
                children: [
                    {
                        name: 'DMC系统公共组件',
                        route: '/MediaManagement/DMCComponentsPage',
                        show: true,
                    },
                    {
                        name: 'Element组件测试',
                        route: '/MediaManagement/ElementPlugins',
                        show: true,
                    },
                    {
                        name: '合作管理',
                        route: '/MediaManagement/CooperativeManagement',
                        show: true,
                    },
                    {
                        name: '资源管理',
                        route: '/MediaManagement/ResourceManagement',
                        show: true,
                    },
                ],
            },
            {
                name: '测试',
                icon: 'el-icon-menu',
                children: [
                    {
                        name: 'mock',
                        route: '/Example/Example',
                        show: true,
                    },
                    {
                        name: 'websocket',
                        route: '/Example/WebSocket',
                        show: true,
                    },
                    {
                        name: 'WebSocket2',
                        route: '/Example/WebSocket2',
                        show: true,
                    },
                ],
            },
            {
                name: 'CTI调试',
                icon: 'el-icon-menu',
                route: '/cti',
                show: true,
            },
            {
                show: true,
                name: '图表',
                icon: 'el-icon-menu',
                children: [
                    {
                        name: '柱状图',
                        route: '/BI/column',
                        show: true,
                    },
                    {
                        name: '柱状折线混合图',
                        route: '/BI/columPoly',
                        show: true,
                    },
                    {
                        name: '环形图',
                        route: '/BI/annular',
                        show: true,
                    },
                    {
                        name: '面积图',
                        route: '/BI/area',
                        show: true,
                    },
                    {
                        name: '饼状图',
                        route: '/BI/pie',
                        show: true,
                    },
                    {
                        name: '常用折线图',
                        route: '/BI/curve',
                        show: true,
                    },
                    {
                        name: '折线图',
                        route: '/BI/breakLine',
                        show: true,
                    },
                    {
                        name: '堆叠条形图',
                        route: '/BI/stack',
                        show: true,
                    },
                    {
                        name: '嵌套环形图',
                        route: '/BI/arch',
                        show: true,
                    },
                ],
            },
            {
                name: '标签管理',
                show: true,
                icon: 'el-icon-menu',
                children: [
                    {
                        name: '标签卡片',
                        route: '/label/card',
                        show: true,
                    },
                    {
                        name: '员工排班',
                        route: '/label/roster',
                        show: true,
                    },
                ],
            },
            {
                name: 'CRM组件',
                show: true,
                icon: 'el-icon-menu',
                children: [
                    {
                        name: '富文本编辑器',
                        route: '/crm/editor',
                        show: true,
                    },
                    {
                        name: '条形码生成',
                        route: '/crm/barcode',
                        show: true,
                    },
                ],
            },
            {
                name: '旅行时间节点组件',
                show: true,
                icon: 'el-icon-menu',
                children: [
                    {
                        name: '组件示例',
                        route: '/travel-components',
                        show: true,
                    },
                ],
            },
        ]);
        //获取当前上下文
        const router = useRouter();
        const route = useRoute();
        // 定位当前选中导航
        const activeMenu = computed(() => {
            let menu = '';
            if (route.meta.parentMenu) {
                menu = route.meta.parentMenu;
            } else {
                menu = route.path;
            }
            return menu;
        });
        // 点击导航跳转
        const goToUrl = (route: any) => {
            router.push({ path: route });
        };
        return {
            menuLevel,
            isCollapse, // 导航是否折叠
            menus, //导航渲染内容
            goToUrl, // 导航跳转事件
            activeMenu, //当前选中的导航
        };
    },
});
</script>
<style scoped lang="scss">
.system-logo-content {
    text-align: center;

    .system-logo {
        text-align: inherit;
    }

    .system-name {
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
}

.layout-base-aside {
    position: relative;
    width: 264px !important;
    animation: openBase 0.5s;
    background-color: #fff;
    overflow: hidden;
    padding-top: 16px;
    height: 100%;

    .scroll {
        height: calc(100% - 42px);

        > ::v-deep(.el-scrollbar__wrap) {
            overflow-x: hidden;
        }
    }

    .bootom {
        box-sizing: border-box;
        border-top: 1px solid #e5e5e5;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 42px;
        color: #222;
        background: #fff;

        .logo {
            height: 20px;
            padding: 10px;
        }

        i {
            opacity: 0.5;
            float: right;
            margin: 12px 19px;
            cursor: pointer;
            font-size: 18px;
        }

        i:hover {
            opacity: 0.8;
        }
    }

    .menu.el-menu.el-menu--collapse {
        width: 56px !important;
    }

    .menu {
        background: #fff !important;
        border-right-width: 0;
        margin-top: -4px;

        .el-link {
            display: block;
        }

        .el-link.is-underline:hover::after {
            border: none;
        }

        .el-menu {
            background: #fff !important;
        }

        .el-icon-arrow-down:before {
            content: '\E6DF' !important;
        }

        .el-submenu__icon-arrow {
            color: #666;
            font-size: 14px;
        }

        .iconfont {
            margin-right: 8px;
        }

        .el-icon-arrow-down {
            font-size: 14px;
        }

        .el-icon-arrow-down:before {
            content: '\E6DF' !important;
        }

        .layout-title__1,
        .layout-children__1 .el-submenu__title {
            background: #fff !important;
            color: #222 !important;
            height: 56px !important;
            line-height: 56px !important;
            margin: 4px 0;
            font-weight: 400;
            padding: 0 16px 0 12px !important;
        }

        .layout-title__1.is-active {
            color: $main-color !important;
        }

        .el-submenu__title {
            height: 40px !important;
            line-height: 40px !important;
            color: #222 !important;
            i {
                color: #666;
            }
        }

        .el-submenu.is-active
            :deep(.el-submenu__icon-arrow.el-icon-arrow-down) {
            color: $main-color !important;
        }
        .el-submenu.is-active :deep(.el-submenu__title) {
            color: $main-color !important;
            .iconfont {
                color: $main-color !important;
            }
        }

        .layout-title__2,
        .layout-title__3 {
            font-weight: 400;
            min-width: 160px;
            color: #222 !important;
            height: 40px !important;
            line-height: 40px !important;
            font-size: 14px;
            margin: 4px 0;
            padding: 0 16px 0 12px !important;
            .el-link {
                border-radius: 4px;
                padding-left: 24px;
                .circle {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border: 1px solid #999999;
                    border-radius: 50%;
                    margin: -3px 14px 0 0;
                }
            }
        }

        [class*='el-icon-'] {
            color: #999 !important;
            width: 16px !important;
            font-size: 16px;
            padding-left: 8px;
            margin-right: 16px;
        }

        .el-menu-item:focus,
        .el-menu-item:hover,
        .el-submenu__title:focus,
        .el-submenu__title:hover {
            font-weight: 500;
            outline: 0;
            font-family: 'PingFangSC-Medium';
            background-color: $main-color-light !important;
            color: $main-color !important;

            [class^='el-icon-'] {
                color: $main-color !important;
            }

            span {
                color: $main-color !important;
            }

            .iconfont {
                color: $main-color !important;
            }

            .circle {
                border: 1px solid $main-color !important;
            }
        }
        .el-menu-item {
            .layout-base-aside--1-title {
                padding: 0 8px !important;
                box-sizing: border-box !important;
            }
        }
        .el-menu-item.is-active {
            opacity: 1;
            font-family: 'PingFangSC-Medium';
            border-left: 4px solid $main-color !important;
            border-radius: 2px 0px 0px 2px;
            [class*='icon-pre-'] {
                color: $main-color !important;
            }

            .layout-base-aside--1-title {
                color: #fff !important;
                background: $main-color !important;
                height: 56px;
                line-height: 56px;
                display: inline-block;
                width: 100%;
                border-radius: 4px;
                padding: 0 4px !important;
            }

            .iconfont,
            [class^='el-icon-'] {
                color: #fff !important;
            }

            .el-link {
                color: #fff !important;
                background: $main-color !important;
                border-radius: 4px;
                padding-left: 20px;
                .circle {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border: 1px solid #ffffff;
                    border-radius: 50%;
                    margin: -3px 14px 0 0;
                }
            }
        }

        .el-menu-item.is-active:focus,
        .el-menu-item.is-active:hover {
            .el-link {
                .circle {
                    border: 1px solid #ffffff !important;
                }
            }
        }

        .el-icon-arrow-down:before {
            content: '\e790';
        }
    }
}

.layout-base-aside--isclose {
    overflow-y: hidden;
    overflow-x: hidden;
    width: 56px !important;
    animation: closeBase 0.2s;
    /*处理导航关闭文字消失延迟问题*/
    span {
        display: none;
    }

    .el-menu-item.is-active .el-icon-caret-left {
        display: none;
    }

    .el-menu--inline .el-menu-item {
        display: none;
    }

    .el-scrollbar__view {
        overflow: hidden;
    }

    /*处理导航关闭文字消失延迟问题 end*/
}

.el-aside.layout-base-aside {
    overflow: hidden;
}

.el-aside.layout-base-aside .el-scrollbar__bar.is-vertical {
    right: 0px;
}

@keyframes openBase {
    from {
        width: 56px;
    }
    to {
        width: 264px;
    }
}

@keyframes closeBase {
    from {
        width: 264px;
    }
    to {
        width: 56px;
    }
}
</style>
