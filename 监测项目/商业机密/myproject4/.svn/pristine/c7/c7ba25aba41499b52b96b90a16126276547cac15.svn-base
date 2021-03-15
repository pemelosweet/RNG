
<template>
  <div class="home-common-assembly">
    <el-card>
      <div slot="header" class="header">
        <i class="title-mark" :style="{background:titleMarkColor}"></i>
        <span style="vertical-align:middle">{{title}}</span>
      </div>
      <ul v-if="data.length>0">
        <li v-for="(item,index) in data" :key="index" class="item-content"  v-if="index<=3">
          <span class="item-title" @click="go2Detail(item.noteId)" v-bind:class="{ 'itme-content--small': isSmall }">{{item.title}}</span>
          <!-- <span class="item-date">{{item.noteCrDate | formatTime}}</span> -->
          <span class="item-date">{{item.noteCrDate | formatTime}}</span>
        </li>

      </ul>
      <div v-if="data.length<=0&&noDataFlag">
        暂无数据！
      </div> 
      <div class="cardmorebtn clearfix" v-if="data.length>=4">

          <el-button @click="go2More" type="text" class="button">更多></el-button>

      </div>
    </el-card>

  </div>

</template>
<script>
import { formatTime } from '@/utils'
export default {
  component() {
    formatTime
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    titleMarkColor: {
      type: String,
      default: '#0fd1dd'
    },
    size: {
      type: String,
      default: 'large'
    },
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
    isSmall() {
      return this.size === 'small'
    }
  },
  methods: {
    go2Detail(id) {
      this.$router.push({ name: 'notice_detail', params: { id: id }})
    },
    go2More() {
      this.$router.push({ name: 'institutionBuild_notice' })
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.home-common-assembly {
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
      font-weight: bold;
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
          font-size: 14px;
          color:#555;
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
  }
}
</style>


