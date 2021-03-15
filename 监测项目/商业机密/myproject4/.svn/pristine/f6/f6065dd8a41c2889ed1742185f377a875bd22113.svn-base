<template>
  <div class="app-navbar">
    <el-row class="navbar" :style="navbarMenuBgImg">
      <el-col :span="11">
        <ul class="ul-inline">
          <li>
            <hamburger :toggleClick="toggleSideBar" :isActive="sidebar.opened" style="cursor: pointer;"></hamburger>
          </li>
          <li :class="language==='zh'?'global_title_zh': 'global_title_en'">{{$t('navbar.title')}}</li>
        </ul>
      </el-col>
      <el-col :span="13" style="padding-right: 16px">
        <ul class="ul-inline" style="float:right">
          <li>
            <!-- <el-dropdown> -->
              <span class="el-dropdown-link">
                {{name}}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <!-- <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handlePwd">密码修改</el-dropdown-item>
              </el-dropdown-menu> -->
            <!-- </el-dropdown> -->
            <em class="split"></em>
          </li>
          <!-- 错误日志 -->
          <li v-if="roles.indexOf('inter')!==-1">
            <lang-select class="international right-menu-item"></lang-select>
            <em class="split"></em>
          </li>
          <li>
            <!-- 退出 -->
            <el-button @click="logout" type="text" size="medium">
              <svg-icon icon-class="exit" /> {{$t('navbar.logOut')}}</el-button>
              
          </li>
        </ul>
      </el-col>
      <iframe style="display:none" :src="logoutMstr" frameborder="0"></iframe>
      <!-- 全屏功能 -->
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> -->

      <!-- 换肤 -->
      <!-- <el-tooltip effect="dark" content="换肤" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> -->
      <!-- </div> -->
      <!-- </el-menu> -->
    </el-row>
    <el-alert v-if="alert.isShow" :title="alert.title" type="warning" close-text="知道了" show-icon></el-alert>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
// import Screenfull from '@/components/Screenfull'
import ErrorLog from '@/components/ErrorLog'
// import titleUrl from '@/assets/navbar/title.png'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    // ThemePicker,
    ErrorLog,
    LangSelect
    // Screenfull
  },
  data() {
    return {
      logoutMstr: '',
      pwdLen: '',
      pwdComplex: '',
      navbarMenuBgImg: {
        backgroundImage: 'url(' + require('@/assets/navbar/header-bg.png') + ')',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'language', 'roles', 'alert', 'userName'])
  },
  watch: {
    pwdLen(val) {
      if (val) this.pwdLen = val
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // this.logoutMstr = 'http://172.16.41.138:8080/MicroStrategy/servlet/mstrWeb?evt=3008' // 测试
      this.logoutMstr = window.mstr
      this.$store
        .dispatch('FedLogOut')
        .then(() => {
          // 重定向到登录吧
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        .catch()
    }
    // handlePwd() {
    //   this.$router.push({ name: 'updataPassword' })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.app-navbar {
  color: #606266;
  .navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0px !important;
    background-color: #fff;
    & h3 {
      margin: 0;
    }
    & .el-button--text {
      color: #606266;
      font-weight: 400;
    }

    & .international-icon {
      font-size: 20px;
    }
  }
  & .global_title_zh {
    font-size: 22px;
    letter-spacing: 2px;
    padding-left: 0px;
  }
  & .global_title_en {
    font-size: 20px;
    padding-left: 0px;
  }
  & .el-alert__title {
    color: #333;
  }
  & .el-alert__closebtn {
    color: #333;
  }
  & .el-alert--warning {
    margin-top: 5px;
  }
  & .clean-border {
    & .el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
    }
    & .el-input-group__append {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
      background: none;
      padding: 0 10px 0;
    }
    &.el-icon-search {
      color: #ccc;
    }
  }
  & .clean-border-active {
    & .el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #409eff;
    }
    & .el-input-group__append {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #409eff;
      background: none;
      padding: 0 10px 0;
    }
    .el-icon-search {
      color: #409eff;
    }
  }

  & .el-icon-search {
    font-size: 20px;
    color: #3498db;
  }
}
</style>



