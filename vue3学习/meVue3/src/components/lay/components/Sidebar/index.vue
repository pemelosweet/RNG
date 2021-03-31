<template>
<!-- <Logo/> -->
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
                <div v-for="(item, index) in mljrouters" :key="item.route">
                    <el-link :href="item.route" @click.prevent>
                        <el-menu-item
                            :index="item.route"
                            :class="'layout-title__' + menuLevel"
                            @click="goToUrl(item.route)"
                            v-if="!item.children && !item.hidden"
                        >
                            <template #title>
                                <span class="layout-base-aside--1-title">
                                    <i
                                        v-if="item.icon"
                                        class="iconfont"
                                        :class="item.icon"
                                    ></i
                                    >{{item.meta&&item.meta.title }}{{1}}
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
                            <span>{{ item.meta&&item.meta.title }}{{2}}</span>
                        </template>
                        <el-menu-item
                            v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            @click="goToUrl(child.path,item.path)"
                            :class="'layout-title__' + 2"
                        >
                            <el-link
                              
                                :href="child.path"
                                @click.prevent
                            >
                                <span class="circle"></span>
                                {{ child.meta.title }}{{3}}
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
import { mapGetters } from 'vuex'
import  Logo from '/@/components/lay/components/Sidebar/logo.vue';
import '/@/assets/css/element-plus.scss';
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
        Logo
    },
    setup() {
        const menuLevel = ref(1);
        const isCollapse = ref(false);
        const menus = ref([
            {
        path: '/login',
      
        hidden: true
    },
    {
        path: '/404',
         hidden: true,
        meta: {
            title: '404页面',
        },
    },
    {
        path: '/', 
        name: 'home',
        meta: {
            title: '开始',
        },
      
        children: [
            {
                path: '/',
                name: 'index',
             
                meta: {
                    title: '首页',
                }
            },
        ]
    },
    {
        path: '/system',
        name: 'system',
    
        meta: {
            title: '系统学习',
            // role: ['study']
        },
        children: [
            {
                path: '/user',
              
                name: 'user',
                meta: {
                    title: '使用者',
                }
            },
        ]
    },
     {
        path: '/friend',
        meta: {
            title: '朋友呀',
        },
    },
    {
        path: "/:notFound(.*)",
        redirect: "/404",
        hidden: true
    }
        ]);
         // 获取store中的路由

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
    mounted(){
      console.log(this.mljrouters);
      
    },
      computed:{
    ...mapGetters([
      'mljrouters'
    ]),
    // 样式
    //   variables() {
    //   return variables
    // },
  }
});
</script>
<style scoped lang="scss">
$main-color: #409eff;
$main-color-light: #ecf5ff;
.logo {
  background: cadetblue;
  width: 210px;
  height: 10%;
  img {
    width: 100%;
    height: 100%;
  }
}
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
