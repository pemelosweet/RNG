<template>
  <div class="conjointAnalysis-statistics">
    <el-card>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :key="index" v-for="(item, index) in tableData"  :label="item.name"  :name="item.name">
          <iframe :style="style" :src="item.url+'&mtoken='+user_name" frameborder="0"></iframe>
        </el-tab-pane>
      </el-tabs> -->
      <span></span>
      <el-button type="primary" plain>分支机构参与联合分析情况统计</el-button>
      <el-button type="primary" plain>联合（分支机构）分析情况状态统计</el-button>
      <el-button type="primary" plain>联合（分支机构）分析详细情况状态统计</el-button>
      
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUrl, login } from '@/api/sys-monitoringAnalysis/conjointAnalysis/statistics.js'
export default {
  data() {
    return {
      activeName: '',
      tableData: [],
      style: {
        width: '100%',
        height: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user_name'])
  },
  methods: {
    grtHeight() {
      this.style.height = window.innerHeight - 161 + 'px'
    },
    getTable() {
      getUrl('').then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.activeName = this.tableData[0].name
        }
      })
    },
    isLogin() {
      login('').then(res => {
        // eslint-disable-next-line no-empty
        if (res.code === 200) {

        }
      })
    },
    handleClick(tab, event) {
      this.isLogin()
      console.log(tab, event)
    }
  },
  mounted() {
    this.grtHeight()
    this.isLogin()
    this.getTable()
    console.log(this.user_name)
  }
}
</script>

<style lang="scss">
</style>