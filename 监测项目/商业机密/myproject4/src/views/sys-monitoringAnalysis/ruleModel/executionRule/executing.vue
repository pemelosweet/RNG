<template>
  <div class="executionwrap">
    <el-card>
      <div slot="header"><span class="spantitle">规则001-主体网银交易总金额排名规则</span><b>/</b><span class="spantitle2">规则执行ID为101</span></div>
      <div class="prompt">本规则针对主体名下所有账户网银交易金额加总，（区分机构和个人）（区分本外币），创建时间2019年1月8</div>
      <div class="ruleinfo">
        <span><label>规则创建者：</label>规则创建者001</span><span><label>修改时间：</label>2019-01-08 10:30:00</span>
      </div>
      <div class="divider-horizontal"></div>
      <el-form label-width="150px">
        <el-row>
          <el-form-item label="当前的规则表达式：">
            <span>sum(column01) > 50000 AND  column02 >=10 OR column03 >20</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="规则执行状态：">
              <span>执行中</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行用户：">
              <span>规则执行者001 </span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="时间间隔：">
              <span>0 sec </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="启动时间：">
              <span>2019-01-16 14:05:00 </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间：">
              <span>2019-01-16 14:10:00 </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="executingtitle">规则执行输出结果：</div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <el-badge slot="label"><span>本币（机构）</span></el-badge>
            <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading.body="listLoading">
              <el-table-column prop="mainname" label="主体名称" min-width="140"></el-table-column>
              <el-table-column prop="maintype" label="主体类型" min-width="140"></el-table-column>
              <el-table-column prop="nationality" label="主体国籍" min-width="140"></el-table-column>
              <el-table-column prop="madenum" label="使用账户数量" min-width="105"></el-table-column>
              <el-table-column prop="offshorenum" label="离岸账户数量" min-width="100"></el-table-column>
              <el-table-column prop="ftotal" label="外币总金额" min-width="140"></el-table-column>
              <el-table-column prop="tradetotal" label="网银本币交易总额(元)" min-width="140"></el-table-column>
            </el-table>
         </el-tab-pane>
        <el-tab-pane>
          <el-badge slot="label"><span>本币（个人）</span></el-badge>
          <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading.body="listLoading">
              <el-table-column prop="mainname" label="主体名称" min-width="140"></el-table-column>
              <el-table-column prop="maintype" label="主体类型" min-width="140"></el-table-column>
              <el-table-column prop="nationality" label="主体国籍" min-width="140"></el-table-column>
              <el-table-column prop="madenum" label="使用账户数量" min-width="105"></el-table-column>
              <el-table-column prop="offshorenum" label="离岸账户数量" min-width="100"></el-table-column>
              <el-table-column prop="ftotal" label="外币总金额" min-width="140"></el-table-column>
              <el-table-column prop="tradetotal" label="网银本币交易总额(元)" min-width="140"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <el-badge slot="label"><span>外币（机构）</span></el-badge>
          <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading.body="listLoading">
              <el-table-column prop="mainname" label="主体名称" min-width="140"></el-table-column>
              <el-table-column prop="maintype" label="主体类型" min-width="140"></el-table-column>
              <el-table-column prop="nationality" label="主体国籍" min-width="140"></el-table-column>
              <el-table-column prop="madenum" label="使用账户数量" min-width="105"></el-table-column>
              <el-table-column prop="offshorenum" label="离岸账户数量" min-width="100"></el-table-column>
              <el-table-column prop="ftotal" label="外币总金额" min-width="140"></el-table-column>
              <el-table-column prop="tradetotal" label="网银外币交易总额(美元)" min-width="140"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <el-badge slot="label"><span>外 币（个人）</span></el-badge>
          <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading.body="listLoading">
            <el-table-column prop="mainname" label="主体名称" min-width="140"></el-table-column>
            <el-table-column prop="maintype" label="主体类型" min-width="140"></el-table-column>
            <el-table-column prop="nationality" label="主体国籍" min-width="140"></el-table-column>
            <el-table-column prop="madenum" label="使用账户数量" min-width="105"></el-table-column>
            <el-table-column prop="offshorenum" label="离岸账户数量" min-width="100"></el-table-column>
            <el-table-column prop="ftotal" label="外币总金额" min-width="140"></el-table-column>
            <el-table-column prop="tradetotal" label="网银外币交易总额(美元)" min-width="140"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
              :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
      <el-row class="btnrow">
        <el-button type="primary" @click="logdialogVisible = true">查看执行日志</el-button>
      </el-row>

      <!-- 日志的弹框 -->
      <el-dialog
        title="执行日志"
        :visible.sync="logdialogVisible">
        <span>
          15-01-2019 12:53:23 CST basic_flow INFO - Assigned executor : localhost:12321 <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Running execid:7 flow:basic_flow project:6 version:1 <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Updating initial flow directory. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Fetching job and shared properties. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Starting flows <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Running flow 'basic_flow'. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Configuring Azkaban metrics tracking for jobrunner object <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Submitting job 'basic_step_1.cmd' to run. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Created file appender for job basic_step_1.cmd <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Attached file appender for job basic_step_1.cmd <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Job Started: basic_step_1.cmd <br>
          15-01-2019 12:53:23 CST basic_flow INFO - No attachment file for job basic_step_1.cmd written. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Job basic_step_1.cmd finished with status SUCCEEDED in 0 seconds <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Configuring Azkaban metrics tracking for jobrunner object <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Submitting job 'basic_step_2.cmd' to run. <br>
          15-01-2019 12:53:23 CST basic_flow INFO - Created file appender for job basic_step_2.cmd 
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="logdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logdialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getExcutingList } from '@/api/ruleModel'

export default {
  data() {
    return {
      logdialogVisible: false, // 弹框
      list: [], // tablelist
      listLoading: true,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData(listQuery)
  },
  methods: {
    fetchData(listQuery) {
      this.listLoading = true
      getExcutingList(this.listQuery).then(response => {
        this.list = response.data.executingList
        this.listLoading = false
      })
    },
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    }
  }
}
</script>

<style lang="scss">
.executionwrap {
  .el-card__header { // 标题
    .spantitle {
      color: #409EFF;
    }
    b {
      margin: 0 4px;
    }
    .spantitle2 {
      font-size: 0.9rem;
    }
  }
  .executingtitle {
    font-size: 1rem;
    font-weight: bold;
    margin: 10px 0;
  }
  .prompt {
    font-size: 0.8rem;
    color:#999;
    padding-bottom: 15px;
  }
  .ruleinfo {
    font-size: 0.8rem;
    span {
      margin-right: 20px;
    }
    label {
      color: #666;
    }
  }
  .el-form-item {
    margin-bottom: 8px;
  }
  .btnrow {
    margin-top: 10px;
  }
}
</style>
