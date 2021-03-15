<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更新记录</span>
      <router-link :to="{name:'login'}">
        <el-button style="float: right; padding: 3px 0" size="medium" type="text">返回登录</el-button>
      </router-link>
    </div>

    <timeline timeline-theme="lightblue" style="margin-left:10%;">
      <template v-for="item in list">
        <timeline-title color="#f2d7e1" :key="item.version">{{item.version}}
          <i style="font-size:16px">{{item.date}}</i>
        </timeline-title>
        <template v-for="(c,i) in item.content">
          <div :key="i">
            <timeline-item v-if="c.type==='add'" color="#52c41a">{{c.desc}}</timeline-item>
            <timeline-item v-if="c.type==='update'" color="#fa8c16">{{c.desc}}</timeline-item>
            <timeline-item v-if="c.type==='delete'" color="#fa541c">{{c.desc}}</timeline-item>
            <timeline-item v-if="c.type==='optimize'" color="#722ed1">{{c.desc}}</timeline-item>
          </div>
        </template>
      </template>
    </timeline>
  </el-card>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import { changeLog } from '@/api/common/common'

export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      changeLog().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
.append {
  font-size: 0.8em;
  margin-top: 3px;
  color: #646c7c;
}
</style>
