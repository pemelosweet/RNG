<template>
  <div class="executionrule">
      <el-card>
        <div slot="header"><span>规则执行列表</span></div>
        <el-form :model="form" label-width="110px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="规则标识ID：">
                <el-select v-model="form.ruleId" placeholder="请选择规则标识ID">
                <el-option label="1000001" value="id1"></el-option>
                <el-option label="1000002" value="id2"></el-option>
                <el-option label="1000003" value="id3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规则名称：">
                <el-select v-model="form.rulename" placeholder="请选择规则名称" style="width:100%">
                <el-option label="规则001-主体网银交易总金额排名规则" value="name1"></el-option>
                <el-option label="规则002-交易发生地数量排名规则" value="name2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行用户：">
                <el-select v-model="form.ruleuser" placeholder="请选择执行用户">
                <el-option label="规则执行者001" value="user1"></el-option>
                <el-option label="规则执行者002" value="user2"></el-option>
                <el-option label="规则执行者003" value="user3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="规则执行时间：">
                <el-date-picker
                    v-model="rulevalue"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="btnalign">
              <router-link  to="/ruleModel/executionRule/executing"><el-button type="primary" style="margin-right:10px;">查 询</el-button></router-link><el-button type="primary" plain>清 空</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading.body="listLoading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" min-width="80" fixed></el-table-column>
            <el-table-column prop="ruleId" label="规则执行ID" min-width="130" fixed></el-table-column>
            <el-table-column prop="markId" label="规则标识ID" min-width="120"></el-table-column>
            <el-table-column prop="rulename" label="规则名称" min-width="220"></el-table-column>
            <el-table-column prop="ruleuser" label="执行用户" min-width="105"></el-table-column>
            <el-table-column prop="rulestart" label="规则启动时间" min-width="140"></el-table-column>
            <el-table-column prop="ruleend" label="规则结束时间" min-width="140"></el-table-column>
            <el-table-column prop="totaltime" label="总耗时" min-width="90"></el-table-column>
            <el-table-column prop="resultstate" label="结果状态" min-width="90"></el-table-column>
            <el-table-column prop="option" fixed="right" label="操作" min-width="170">
                <template slot-scope="scope">
                  <router-link to="executionRule/executing"><el-button type="text">查看详情</el-button></router-link>  
                  <el-button type="primary" v-if="scope.row.resultstate == '停止'">启动</el-button>
                  <el-button type="primary" v-if="scope.row.resultstate == '运行中'">暂停</el-button>
                  <el-button type="primary" v-if="scope.row.resultstate == '暂停'">继续执行</el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
              :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getEruleList } from '@/api/ruleModel'

export default {
  data() {
    return {
      form: {
        ruleId: 'id1',
        rulename: 'name1',
        ruleuser: 'user1'
      },
      rulevalue: '', // 执行日期
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
      getEruleList(this.listQuery).then(response => {
        this.list = response.data.eRuleList
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
.executionrule {
  .btnalign {
    text-align: right;
  }
  .el-button--primary {
    min-width: 80px;
  }
}

</style>
