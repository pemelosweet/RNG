<template>
  <div class="home-oprate-matter">
    <ul v-if="data.length>0">
      <li v-for="(item,index) in data" :key="index" class="item-content">
        <span class="item-title" @click="go2Frorm(item)">{{item.title}}</span>
        <span class="item-date">{{item.createtime | formatTime}}</span>
      </li>

    </ul>
    <div v-if="data.length<=0&&noDataFlag" style="color:#666">
      暂无数据！
    </div>
     <div class="cardmorebtn clearfix" v-if="data.length>=4">
        <router-link to="/workPlatform">
          <el-button style="" type="text" class="button">更多></el-button>
        </router-link>
      </div>
  </div>
</template>
<script>
import { formatTime } from '@/utils'
export default {
  component() {
    formatTime
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    readType: {
      type: String,
      default: ''
    },
    roleType: {
      type: String,
      default: ''
    },
    noDataFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  filters: {
    formatTime(date, option) {
      return formatTime(date, option)
    }
  },
  mounted() {
    // console.log(this)
  },
  methods: {

    go2Frorm(obj) {
      if (this.readType) {
        this.$router.push({
          name: 'reportingAgencyWorkFlow',
          query: {
            proInstId: obj.proInstId,
            workitemId: obj.workitemId,
            actInstId: obj.actInstId,
            actDefId: obj.actDefId,
            pkgId: obj.pkgId,
            readType: this.readType,
            roleType: this.roleType
          }
        })
      } else {
        if (obj.rootPath) {
          this.$router.push(obj.rootPath)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.home-oprate-matter {
  position: relative;
  .item-content {
    border-bottom: 1px dashed #e5e5e5;
    .itme-content--small.item-title {
      width: 60%;
    }
    .item-title {
      font-size: 14px;
      color: #666;
      display: inline-block;
      width: 75%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 36px;
      line-height: 36px;
      vertical-align: bottom;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
    .item-date {
      text-align: right;
      width: 25%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: right;
      font-size: 12px;
      color: #999;
      padding-top: 12px;
    }
  }
  // .cardmorebtn {
  //     position: absolute;
  //   bottom: -40px;
  //   right: 0;
  //   line-height: 40px;
  // }
}
</style>

