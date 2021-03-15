<template>
  <div class="home-file-missive">
    <el-card>
      <div slot="header" class="header">
        <i class="title-mark" style="background:#fbc32e"></i>
        <span style="vertical-align:middle;font-weight:bold;">文件公函</span>
      </div>
      <ul v-if="data.length>0">
        <li v-for="(item,index) in data" :key="index" class="item-content" v-if="index<=3">
          <span class="item-title  itme-content--small" @click="go2Detail(item)">{{item.docTitle}}</span>
          <span class="item-date">{{item.creDate | formatTime}}</span>
        </li>

      </ul>
      <div v-if="data.length<=0&&noDataFlag" style="color:#666">暂无数据！</div>
      <div class="cardmorebtn" v-if="data.length>=4">
        <el-button type="text" class="button" @click="go2More">更多></el-button>
      </div>
    </el-card>

  </div>

</template>
<script>
import { mapGetters } from 'vuex'
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
    noDataFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  filters: {
    formatTime(date, option) {
      return formatTime(date, option)
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    go2Detail(scope) {
      if (this.roles[0].indexOf(this.GLOBAL.CENTER) !== -1) {
        this.$router.push({
          name: 'institutionBuild_officialDocuments_center_look',
          params: { id: scope.docId }
          // params: { id: scope.docId }
        })
      } else {
        this.$router.push({
          name: 'officialDocuments_detail',
          params: {
            id: scope.docId
          },
          query: {
            replay: '1'
          }
        })
      }
    },
    go2More() {
      if (this.roles.indexOf(this.GLOBAL.REPORT) !== -1) {
        this.$router.push({ name: 'dataReceive_officialDocuments' })
      } else {
        this.$router.push({ name: 'institutionBuild_officialDocuments_send' })
      }
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.home-file-missive {
  .el-card {
    height: 240px;
    .title-mark {
      display: inline-block;
      height: 18px;
      width: 4px;
      vertical-align: middle;
    }

    .el-card__header {
      padding: 0;
      line-height: 39px;
      padding-left: 18px;
    }
    .el-card__body {
      padding: 10px 20px;
      height: 201px;
      position: relative;

      .item-content {
        border-bottom: 1px dashed #e5e5e5;
        .itme-content--small.item-title {
          width: 60%;
        }
        .item-title {
          color: #555;
          font-size: 14px;
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
          width: 25%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: right;
          font-size: 12px;
          color: #555;
          padding-top: 12px;
          text-align: right;
        }
      }
      .cardmorebtn {
        position: absolute;
        line-height: 32px;
        margin-right: 20px;
        bottom: 0;
        right: 0;
        line-height: 40px;
        margin-right: 20px;
      }
    }
  } // .el-card {
  height: 240px;
  .title-mark {
    display: inline-block;
    height: 18px;
    width: 4px;
    vertical-align: middle;
  }

  .el-card__header {
    padding: 0;
    line-height: 39px;
    padding-left: 18px;
  }
  .el-card__body {
    padding: 10px 20px;
    height: 201px;
    position: relative;

    .item-content {
      border-bottom: 1px dashed #e5e5e5;
      .itme-content--small.item-title {
        width: 60%;
      }
      .item-title {
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
        width: 75px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: right;
        font-size: 12px;
        color: #999;
        padding-top: 10px;
      }
    }
    .cardmorebtn {
      position: absolute;
      line-height: 32px;
      margin-right: 20px;
      bottom: 0;
      right: 0;
      line-height: 40px;
      margin-right: 20px;
    }
  }
}
</style>
