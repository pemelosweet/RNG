<template>
  <div class="intelligentAnalyze_business">
    <div class="header">
      <el-row>
        <el-col :span="24" style="textAlign:right">
          <el-button type="primary" plain>中心主要业务情况统计总表</el-button>
          <el-button type="primary" plain @click="visable=true">人民银行分支机构上报线索情况统计表</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="conditionBlock">
      <el-form :model="form">
        <el-row>
            <el-col :span="6" >
              <el-form-item label="时间：" label-width="60px">
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  :picker-options="form.pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  unlink-panels>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-button type="primary" style="marginLeft:30px"> 查 询 </el-button>
          </el-row>
      </el-form>
    </div>
    <div class="listBlock">
      <el-table :show-header=false :data="tableData" >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column type="fileName" label="文件名称" align="left">
          <template slot-scope="scope">
            <router-link :to="{path:(scope.row.fileName==='接收大额交易报告份数'||scope.row.fileName==='接收可疑交易报告份数')?'intelligentAnalyze/view':'/404',query:{key:scope.row.key}}">
              <span >{{scope.row.fileName}}</span>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
       
    </div>
    <el-dialog :visible.sync="visable" >
      <iframe 
      src="http://192.168.1.139:8080/MicroStrategy/servlet/mstrWeb?Server=DESKTOP-8ATJ77Q&Project=hongguan&Port=0&evt=2048001&src=mstrWeb.2048001&visMode=0&currentViewMedia=1&documentID=07AB10FC4DDE58E69110368516973D56&uid=administrator&pwd=&hiddensections=header,footer,path,dockTop,dockLeft" 
      frameborder="0"
      width="100%"
      height="600px"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visable: false,
        form: {
          time: '',
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          }

        },
        tableData: [
          {
            fileName: '接收大额交易报告份数',
            key: 'wholesale'
          },
          {
            fileName: '接收大额交易报告涉及客户数'
          },
          {
            fileName: '接收可疑交易报告份数',
            key: 'doubtful'
          },
          {
            fileName: '接收可疑交易报告涉及客户数'
          },
          {
            fileName: '评审分支机构上报分析申请数'
          },
          {
            fileName: '分支机构对外报告线索入库数'
          },
          {
            fileName: '中心自主分析移送线索数'
          },
          {
            fileName: '中心自主分析通报线索数'
          },
          {
            fileName: '中心接收协查份数'
          },
          {
            fileName: '中心接反馈查份数'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange() {},
      handleCurrentChange() {},
      change(obj) {
        console.log(obj)
      }
    }
  }
</script>

<style lang="scss">
.intelligentAnalyze_business{
  .conditionBlock{
    .el-input__inner{
      min-width: 250px;
      width: 100%
    }
  }
  .listBlock{
    margin-bottom: 30px;
    .mstrmojo-DocPanelStack{
      width: 200px
    }
  }
 

}

</style>