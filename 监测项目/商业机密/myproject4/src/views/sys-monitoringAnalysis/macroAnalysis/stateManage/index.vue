<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>报表规则管理</span>
      </div>

      <el-row style="marginBottom:20px">
        <el-col :span="10" :offset="6">
          <el-form :model="form">
            <el-form-item label="报表名称：" label-width="100px">
              <el-input v-model="form.name" placeholder="请输入报表名称"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-button type="primary" style="marginLeft:20px">查 询</el-button>
      </el-row>

      <el-table :data="tableData" class="expend_table">
        <el-table-column label="序号" type="index" width="100"></el-table-column>
        <el-table-column label="报表/图标名称" prop="name" align="left"></el-table-column>
        <el-table-column label="调度时间" align="right">
          <template slot-scope="scope">
            <el-button type="text" v-for="(item,index) in scope.row.diapatchName" :key="index">{{item}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.diapatchName.length==0" @click="clickDispatch(scope)">设置调度</el-button>
            <el-button type="text" @click="clickDispatch(scope)" v-else>编辑调度</el-button>
            <el-button type="text" @click="dialogVisible2=true">查看模板</el-button>
            <el-button type="text" @click="dialogVisible3=true">查看预警规则</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background>
      </el-pagination>
    </el-card>

    <!-- 弹层 -->
    <el-dialog title="设置调度" :visible.sync="dialogVisible" width="600px" @close="closeDialog">
      <el-form label-width="120px">
        <el-form-item label="设置调度：">
          <el-checkbox-group v-model="dialog.setting">
            <el-checkbox label="年">年</el-checkbox>
            <el-checkbox label="季">季</el-checkbox>
            <el-checkbox label="月">月</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹层2 -->
    <el-dialog title="mstr提供" :visible.sync="dialogVisible2" width="70%">
      <img :src="template" alt="加载失败">
      <div slot="footer">
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible2=false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 弹层3 -->
    <el-dialog title="mstr提供" :visible.sync="dialogVisible3">
      <img :src="warningRule" alt="加载失败">
      <div slot="footer">
        <el-button @click="dialogVisible3=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible3=false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import template from '@/assets/stateManage/template.png'
import warningRule from '@/assets/stateManage/warningRule.png'
export default {
  data() {
    return {
      template: template,
      warningRule: warningRule,
      form: {
        name: ''
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
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialog: {
        setting: ['年']
      }
    }
  },
  methods: {
    clickDispatch(scope) {
      this.dialogVisible = true
      this.activeIndex = scope.$index
    },
    closeDialog() {
      this.$set(this.tableData[this.activeIndex], 'diapatchName', this.dialog.setting)
    }
  }
}
</script>

<style scoped>

</style>
