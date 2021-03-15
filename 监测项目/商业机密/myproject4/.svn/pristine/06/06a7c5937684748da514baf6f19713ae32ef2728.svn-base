<template>
  <div class="stateView-month">
    <el-row style="marginBottom:20px;paddingTop:20px" :gutter="20">
      <el-col :span="8" >
        <el-form :model="form">
          <el-form-item label="报表名称：" label-width="100px">
            <el-input v-model="form.name" placeholder="请输入报表名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <el-form :model="form">
          <el-form-item label="选择时间：" label-width="100px">
            <el-date-picker
              v-model="form.date"
              placeholder="选择季度"
              type="month">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.date2"
              placeholder="选择季度"
              type="month">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>

      <el-button type="primary" style="marginLeft:20px">查 询</el-button>
    </el-row>


    <el-table :data="tableData" class="expend_table" :show-header=false>
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="报表/图标名称" prop="name" align="left"></el-table-column>

    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      background
      >
    </el-pagination>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          date: '',
          date2: ''
        },
        currentPage: 1,
        tableData: [
          {
            name: '接收大额交易报告份数',
            diapatchName: []
          },
          {
            name: '接收大额交易报告涉及客户数',
            diapatchName: []
          },
          {
            name: '接收可疑交易报告涉及客户数',
            diapatchName: []
          },
          {
            name: '评审分支机构上报分析申请数',
            diapatchName: []
          },
          {
            name: '分支机构对外报告线索入库数',
            diapatchName: []
          }

        ],
        activeIndex: null,
        dispatchData: {},
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialog: {
          dispatch: ['年']
        }
      }
    },
    methods: {
      clickDispatch(scope) {
        this.dialogVisible = true
        this.activeIndex = scope.$index
      },
      closeDialog() {
        this.dialog.dispatch.map((item) => {
          this.tableData[this.activeIndex].diapatchName.push(item)
        })
        this.dialog.dispatch = ['年']
      }
    }

  }
</script>

<style lang="scss">
  .stateView-month{
    .el-date-editor{
      width: 120px
    }

  }



</style>
