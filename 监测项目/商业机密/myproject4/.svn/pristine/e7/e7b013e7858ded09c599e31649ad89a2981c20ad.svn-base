<template>
  <div class="approvalwrap">
    <el-card>
      <div slot="header"><span>人工补正结果核对</span></div>
      <el-form  :model="form" label-width="130px">
          <el-row>
              <el-col :span="7">
                <el-form-item label="报告机构：">
                  <el-select v-model="form.branch" placeholder="报告机构">
                      <el-option label="中国人民银行" value="1"></el-option>
                      <el-option label="招商银行" value="2"></el-option>
                      <el-option label="工商银行" value="3"></el-option>
                      <el-option label="农业银行" value="4"></el-option>
                      <el-option label="建设银行" value="5"></el-option>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="补正状态：">
                  <el-select v-model="form.type" placeholder="补正状态" >
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="待补正" value="beijing"></el-option>
                    <el-option label="已补正" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="补正发起时间：">
                  <el-date-picker
                    v-model="value"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    >
                  </el-date-picker>
                </el-form-item>
              </el-col>

          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="交易ID：">
                <el-input v-model="form.tradeID" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="是否反馈：">
                <el-select v-model="form.feedback" placeholder="请选择">
                  <el-option label="已反馈" value="1"></el-option>
                  <el-option label="未反馈" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="btnalign">
              <el-button type="primary">查 询</el-button><el-button type="primary" plain>清 空</el-button>
            </el-col>
          </el-row>
      </el-form>
      <el-row class="handleBtn"><span>人工补正结果核对情况列表：</span></el-row>
      <el-table style="width: 100%" :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"  v-loading="listLoading">
        <el-table-column type="index" label="序号" min-width="55"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID" min-width="110"></el-table-column>
        <el-table-column prop="organ" label="报告机构" min-width="110"></el-table-column>
        <el-table-column prop="tradetype" label="交易类型" min-width="140"></el-table-column>
        <el-table-column prop="startdate" label="补正要求发起时间" min-width="110"></el-table-column>
        <el-table-column prop="finishdate" label="实际完成时间" min-width="100"></el-table-column>
        <el-table-column prop="state" label="补正状态" min-width="100"></el-table-column>
        <el-table-column prop="feedback" label="补正反馈情况" min-width="100"></el-table-column>
        <el-table-column prop="option" fixed="right" label="操作" min-width="80">
            <template slot-scope="scope">
              <router-link :to="{ name: 'dataGovernance_correction_feedback_feed'}"><el-button type="text">反馈</el-button></router-link>
              <el-button type="text">人工补正</el-button>
               <!-- <router-link :to="{name: 'dataType_detail_report'}"><el-button type="text">查看补正要求</el-button></router-link>
               <router-link :to="{name: 'dataType_detail_report'}"><el-button type="text">查看反馈报文</el-button></router-link> -->

               <!-- <el-popover trigger="click" placement="top">
                <p>
                  补正要求类型：
                  <el-radio v-model="radio" label="1">信息更正</el-radio>
                  <el-radio v-model="radio" label="2">信息补充</el-radio>
                </p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" >取消</el-button>
                      <el-button type="primary" size="mini" @click="handleCheck">确定</el-button>
                    </div>
                <div slot="reference">
                  <el-button type="text">人工补正</el-button>
                </div>
              </el-popover> -->
            </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
    </el-card>


  <!-- 大额/可疑补充通知 -->
    <el-dialog title="信息补充通知" :visible.sync="noticeVisible">
      <AddNotice></AddNotice>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeVisible = false">取 消</el-button>
        <el-button type="primary" @click="noticeVisible = false">确 定</el-button>
      </span>
    </el-dialog>

   <!-- 大额更正通知 -->
    <el-dialog title="大额信息更正通知" :visible.sync="largeUpdateVisible">
      <Large @setLargeVisible="getLargeVisible"></Large>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="largeUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="largeUpdateVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <!-- 可疑更正通知 -->
    <el-dialog title="可疑信息更正通知" :visible.sync="susUpdateVisible">
      <Large></Large>
      <span slot="footer" class="dialog-footer">
        <el-button @click="susUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="susUpdateVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getScanningindex } from '@/api/dataGovernance'
import Approval from '@/views/sys-monitoringAnalysis/dataGovernance/dataClean/correction/approval_dloge'
import Notice from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/notice'
import Large from '@/views/sys-monitoringAnalysis/dataGovernance/common/correction/large'

export default {
  name: 'auto',
  components: {
    Approval,
    Notice,
    Large
  },
  data() {
    return {
      value: '',
      value2: '',
      radio: '1', // 单选框参数
      noticeVisible: false, // 弹框
      largeUpdateVisible: false, // 弹框
      susUpdateVisible: false, // 弹框
      form: {
        branch: '',
        type: '',
        feedback: '',
        tradeID: ''
      },
      tradetype: [],
      list: [],
      listLoading: true,
      // 每页显示条数
      currentPage: 1, // 分页当前页面
      pagesize: 10,
      approvalVisible: true // 弹框
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
    getLargeVisible(vis) { // 人工补正组件接收子组件弹框largeUpdateVisible传值
      this.largeUpdateVisible = vis
    },
    fetchData(listQuery) {
      this.listLoading = true
      getScanningindex(this.listQuery).then(response => {
        this.list = response.data.feedBack
        this.listLoading = false
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleCheck() {
      if (this.radio === '1') {
        this.largeUpdateVisible = true
        this.noticeVisible = false
      } else {
        this.noticeVisible = true
        this.largeUpdateVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
.approvalwrap {
  .handleBtn {
    padding-bottom: 10px;
  }
  .btnalign {
    text-align: right;
  }
  .el-form{
    .el-select{
      width: 100%
    }
  }
}
</style>
