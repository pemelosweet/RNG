

<template>

  <div class="workFlow-opinion" v-if="opinionData.length>0" >
    <strong class="title">审批意见</strong>
    <div v-for="(item,index) in opinionData" :key="index" class="opinion clearfix">
      <div class="advice" style="word-wrap: break-word;word-break: break-all;overflow: hidden;">{{item.opinion}}</div>
      <div style="text-align:right" class="user-time">

        <span class="result" v-if="item.isAgree !== undefined">审批结果：{{item.isAgree === 'Y' ? '同意' :item.isAgree === 'd' ? '已处理': '不同意'}}</span>
        <span class="result" v-if="item.isAgree === undefined">审批结果：{{item.type === 'sendback' ? '退回' : ''}}</span>
        <span class="user">审批人：{{item.approverName}}</span>
        <span class="time">审批时间：{{item.time}}</span>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import { getOpinion } from '@/api/sys-monitoringAnalysis/workFlow/index.js'
export default {
  data() {
    return {
      opinionData: null,
      flag: false
    }
  },
  props: {
    workflowsxp: {
      type: Object
    }
  },
  computed: {
    // 获取业务传来的参数
    ...mapGetters(['formContent']),
    proInstId() {
      return this.$route.query.proInstId
    }
  },
  mounted() {
    this.getOpinionList()
    this.isFist()
  },
  methods: {
    // 获取意见
    getOpinionList() {
      getOpinion({ proInstId: this.proInstId }).then(res => {
        if (res.code === 200) {
          this.opinionData = res.data
        }
      }).catch()
    },
    // 是否第一次调取工作流
    isFist() {
      if (this.workflowsxp) {
        var arr = []
        if (this.workflowsxp.nodeAttributes && this.workflowsxp.nodeAttributes.length > 0) {
          this.workflowsxp.nodeAttributes.forEach(el => {
            arr.push(el.extendKey)
            this.flag = arr.indexOf('seeAppOptions') === -1
          })
        } else {
          this.flag = true
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.workFlow-opinion {
  border: 1px solid #7182a3;
  margin-top: 30px;
  padding: 28px;
  border-radius: 6px;
  position: relative;
  .title {
    display: inline-block;
    font-size: 16px;
    position: absolute;
    top: 0;
    margin-left: -12px;
    margin-top: -8px;
    padding: 0 10px;
    background: #fff;
  }

  .opinion {
    line-height: 32px;
    border-bottom: 1px solid #eee;
    .user-time,
    .advice {
      font-size: 14px;
      color: #333;
    }
    .advice{
      float: left
    }
    .user-time{
      width: 48%;
      float: right;
      .time,.user,.result{
        display: inline-block;
        padding: 0 10px
      }
      .result{
        float: left;
      }
      .user{
        float: left;
      }
      .time{
        float: right
      }
    }
  }
}
</style>

