<template>
  <div class="conjointAnalysis-statistics">

    <el-card :style="style">
      <!-- <div style="margin-top:10px;">
        <p>接收报表</p>
        <a style="margin-right:20px;" :href="item.url+'&mtoken='+user_name" v-for="(item, index) in accept" :key="index">{{item.name}}</a>
        </div>
        <div style="margin-top:10px;">
        <p>机构报表</p>
        <a style="margin-right:20px;" :href="item.url+'&mtoken='+user_name" v-for="(item, index) in organization" :key="index">{{item.name}}</a>
        </div> -->
      <el-table
        :data="tableData"
        :span-method="cellMerge"
        border
        :height="maxHeight()"
        :style="style"
        @row-click="openWindow"
        :cell-style="cellStyle"
      >
        <el-table-column
          prop="type"
          label="类别"
          width="180"
        >
        </el-table-column>
        <el-table-column
          style="font-size:18px;"
          prop="name"
          label="报表名称"
        >
        <template slot-scope="scope">
            <span style="cursor:pointer;color:#4e72b8;">{{scope.row.name}}</span>
        </template>
        </el-table-column>        
      </el-table>
    </el-card>

    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :key="index" v-for="(item, index) in tableData"  :label="item.name"  :name="item.name">
          <iframe :style="style" :src="item.url+'&mtoken='+user_name" frameborder="0"></iframe>
        </el-tab-pane>
      </el-tabs> -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :key="index" v-for="(item, index) in tableData"  :label="item.name"  :name="item.name">          
          <iframe :style="style" :src="iframeUrl" frameborder="0"></iframe>
        </el-tab-pane>        
      </el-tabs> -->

    <!-- <iframe :style="style" src="http://202.189.3.29:8642/MicroStrategy/servlet/mstrWeb?Server=WIN-OQRGOM8UCK1&Project=FXQ2&Port=0&evt=2048001&src=mstrWeb.2048001&documentID=68181C2F4740509AB277568C498A2272&currentViewMedia=1&visMode=0&hiddensections=path&mtoken=luoyubing" frameborder="0"></iframe> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getData, login } from '@/api/sys-monitoringAnalysis/conjointAnalysis/statistics.js'
export default {
  data() {
    return {
      iframeUrl: '',
      activeName: '',
      accept: [], // 接收报文
      organization: [], // 机构报文
      clue: [], // 线索报表
      monitor: [], // 监测报表
      inter: [], // 国际报表
      contribution: [], // 贡献报表
      union: [], // 联合分析报表
      risk: [], // 风险报表
      laundering: [], // 洗钱报表
      tableData: [],
      table: [],
      spanArr: [],
      pos: '',
      style: {
        width: '100%',
        height: this.grtHeight(),
        marginBottom: 10
      }
    }
  },
  computed: {
    ...mapGetters(['user_name'])
  },
  methods: {
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 指定坐标
        return 'font-size:18px'
      } else {
        return ''
      }
    },
    openWindow(row, event, column) {
      login('').then(res => {
        if (res.code === 200) {
          window.open(row.url + '&mtoken=' + this.user_name, '_blank')
        } else {
          this.$router.push({ name: 'login' })
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   }
      // }

      // if (row.type === '接收报表') {
      //   return {
      //     rowspan: row.num,
      //     colspan: 1
      //   }
      // } else {
      //   return {
      //     rowspan: row.num,
      //     colspan: 1
      //   }
      // }
    },
    grtHeight() {
      // eslint-disable-next-line no-return-assign
      return window.innerHeight - 100 + 'px'
    },
    maxHeight() {
      return window.innerHeight - 181 + 'px'
    },
    getTable(www) {
      login('').then(res => {
        if (res.code === 200) {
          getData('').then(res => {
            if (res.code === 200) {
              // this.table = res.data
              // if (www === '') {
              //   this.tableData = this.table
              //   this.iframeUrl = this.table[0].url + '&mtoken=' + this.user_name
              //   this.activeName = this.tableData[0].name
              // } else {
              //   this.table.forEach(el => {
              //     if (www === el.name) {
              //       this.iframeUrl = el.url + '&mtoken=' + this.user_name
              //     }
              //   })
              //   this.tableData = this.table
              //   this.activeName = www
              // }
              if (res.data.accept !== undefined) {
                this.accept = res.data.accept
                res.data.accept.forEach(element => {
                  element.type = '接收报表'
                  element.num = res.data.accept.length
                })
              }
              if (res.data.organization !== undefined) {
                this.organization = res.data.organization
                res.data.organization.forEach(element => {
                  element.type = '机构报表'
                  element.num = res.data.organization.length
                })
              }
              this.tableData = this.accept.concat(this.organization)
              if (res.data.monitor !== undefined) {
                this.monitor = res.data.monitor
                res.data.monitor.forEach(element => {
                  element.type = '监测报表'
                  element.num = res.data.monitor.length
                })
              }
              this.tableData = this.tableData.concat(this.monitor)
              if (res.data.inter !== undefined) {
                this.inter = res.data.inter
                res.data.inter.forEach(element => {
                  element.type = '国际报表'
                  element.num = res.data.inter.length
                })
              }
              this.tableData = this.tableData.concat(this.inter)
              if (res.data.clue !== undefined) {
                console.log(res.data.clue, '-------------------------------')
                this.clue = res.data.clue
                res.data.clue.forEach(element => {
                  element.type = '线索报表'
                  element.num = res.data.clue.length
                })
              }
              this.tableData = this.tableData.concat(this.clue)
              if (res.data.contribution !== undefined) {
                this.contribution = res.data.contribution
                res.data.contribution.forEach(element => {
                  element.type = '贡献报表'
                  element.num = res.data.contribution.length
                })
              }
              this.tableData = this.tableData.concat(this.contribution)
              if (res.data.union !== undefined) {
                this.union = res.data.union
                res.data.union.forEach(element => {
                  element.type = '联合报表'
                  element.num = res.data.union.length
                })
              }
              this.tableData = this.tableData.concat(this.union)
              if (res.data.risk !== undefined) {
                this.risk = res.data.risk
                res.data.risk.forEach(element => {
                  element.type = '风险报表'
                  element.num = res.data.risk.length
                })
              }
              this.tableData = this.tableData.concat(this.risk)
              if (res.data.laundering !== undefined) {
                this.laundering = res.data.laundering
                res.data.laundering.forEach(element => {
                  element.type = '洗钱报表'
                  element.num = res.data.laundering.length
                })
              }
              this.tableData = this.tableData.concat(this.laundering)
              for (var i = 0; i < this.tableData.length; i++) {
                if (i === 0) {
                  this.spanArr.push(1)
                  this.pos = 0
                } else {
                  // 判断当前元素与上一个元素是否相同
                  if (this.tableData[i].type === this.tableData[i - 1].type) {
                    this.spanArr[this.pos] += 1
                    this.spanArr.push(0)
                  } else {
                    this.spanArr.push(1)
                    this.pos = i
                  }
                }
              }
            } else {
              this.tableData = []
              this.$router.push({ name: 'login' })
            }
          })
        }
      })
    },
    isLogin() {
      login('').then(res => {
        // eslint-disable-next-line no-empty
        if (res.code === 200) {
        } else {
          this.$router.push({ name: 'login' })
        }
      })
    }
  },
  mounted() {
    this.getTable()
    this.grtHeight()
    console.log(this.style.height, 2222)
  }
}
</script>
<style scoped>
  .cell{
    cursor:pointer;
    font-size: 14px
  }
</style>
