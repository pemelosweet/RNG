<template>
  <div class="home-operate-platform" :style="{height:'240px'}">
    <el-tabs type="border-card" class="firinline-box" @tab-click="tabClick" v-model="activePane" style="height:240px">
      <el-tab-pane name="todo">
        <el-badge slot="label">
          <span>待办事项</span>
        </el-badge>
        <operate-matter :data="list" :readType="'todo'" :roleType="'todo'" :noDataFlag="noDataFlag"></operate-matter>
      </el-tab-pane>
      <el-tab-pane name="doing">
        <el-badge slot="label">
          <span>在办事项</span>
        </el-badge>
        <operate-matter :data="list" :readType="'doing'" :roleType="'todo'" :noDataFlag="noDataFlag"></operate-matter>

      </el-tab-pane>

      <el-tab-pane name="doneAndFinished">
        <el-badge slot="label">
          <span>已办事项</span>
        </el-badge>
        <operate-matter :data="list" :readType="'doneAndFinished'" :roleType="'done'" :noDataFlag="noDataFlag"></operate-matter>
      </el-tab-pane>

      <!-- 由孙士宾提出修改 -->

      <el-tab-pane label="待阅事项" name="all">

        <operate-matter :data="list" :readType="'all'"  :noDataFlag="noDataFlag"></operate-matter>
      </el-tab-pane>
      <el-tab-pane label="事项提醒" name="matter">

        <operate-matter :data="list" :noDataFlag="noDataFlag"></operate-matter>

      </el-tab-pane>
    </el-tabs>

  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import { oparateData } from '@/api/home/index.js'
import { matterTooltip } from '@/api/sys-monitoringAnalysis/workPlatform/index.js'
import operateMatter from '@/views/home/components/operate-matter.vue'
export default {
  components: {
    operateMatter
  },
  data() {
    return {
      activePane: 'todo',
      list: [],
      noDataFlag: false
    }
  },
  computed: {
    ...mapGetters(['roles']),
    paramsObj() {
      const obj = {
        title: '',
        readType: this.activePane,
        pageNum: 1,
        pageSize: 4,
        startTime: '',
        endTime: ''
      }
      return obj
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.activePane === 'matter') {
        matterTooltip({ title: '',
          pageNum: 1,
          pageSize: 10,
          startDate: '',
          endDate: '' }).then(res => {
          if (res.code === 200) {
            this.list = res.data.page.map(item => {
              item.createtime = item.sendDate
              return item
            })
            this.noDataFlag = true
          }
        })
      } else {
        oparateData(this.paramsObj).then(res => {
          if (res.code === 200) {
            this.list = res.data.list
            this.noDataFlag = true
          }
        })
      }
    },
    tabClick(val) {
      // if (this.activePane !== '4' && this.activePane !== 'matter') {
      //   this.getList()
      // }
      this.getList()
    }
  }
}
</script>
<style lang="scss">
.home-operate-platform {
  position: relative;
  .el-badge__content.is-fixed {
    top: 10px;
  }

  .el-tabs__content {
    height: 201px;
    .cardmorebtn {
      position: absolute;
      bottom: -40px;
      right: 0;
      line-height: 40px;
      // margin-right: 20px;
    }
  }
}
</style>
