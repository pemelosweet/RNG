<template>
  <div class="correctionwrap">
    <el-card>
      <el-form inline :model="form" label-width="50px">
          <el-row>
              <el-col :span="7">
                <el-form-item label="报告机构：">
                  <el-select v-model="form.rule" placeholder="报告机构">
                    <!-- <el-option label="大额漏报" value="shanghai"></el-option>
                    <el-option label="收付方帐号相同" value="beijing"></el-option>
                    <el-option label="帐号长度，内容异常" value="beijing"></el-option>
                    <el-option label="身份证类型和编码规则不一致" value="beijing"></el-option>
                    <el-option label="机构帐号编码重复" value="beijing"></el-option>
                    <el-option label="月度大额日均报送量" value="beijing"></el-option> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="行业范围：">
                  <el-select v-model="form.industry" placeholder="行业范围">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="银行业" value="beijing"></el-option>
                    <el-option label="保险业" value="beijing"></el-option>
                    <el-option label="证券业" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-form-item label="交易类型：">
                    <el-select v-model="form.industry" placeholder="交易类型">
                      <el-option label="全部" value="all"></el-option>
                      <el-option label="大额" value="beijing"></el-option>
                      <el-option label="可疑" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="问题原因：">
                  <el-select v-model="form.businesstype" placeholder="问题原因">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="交易对手信息不完整" value="beijing"></el-option>
                    <el-option label="大额交易漏报" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="7" class="btnalign">
              <el-button type="primary">查 询</el-button><el-button type="primary" plain>清 空</el-button>
            </el-col>
          </el-row>
      </el-form>
      <el-row class="handleBtn"><span>待自动清理数据列表：</span></el-row>
      <el-table style="width: 100%" :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="index" label="序号" min-width="55"></el-table-column>
        <el-table-column prop="tradeId" label="交易ID" min-width="110"></el-table-column>
        <el-table-column prop="name" label="业务标识号" min-width="110"></el-table-column>
        <el-table-column prop="num" label="交易类型" min-width="140"></el-table-column>
        <el-table-column prop="tradedate" label="报告机构" min-width="110"></el-table-column>
        <el-table-column prop="mark" label="问题原因" min-width="100"></el-table-column>
        <el-table-column prop="message" label="问题来源" min-width="100"></el-table-column>
        <el-table-column prop="option" fixed="right" label="操作" min-width="140">
            <template slot-scope="scope">
              <router-link to="/dataQuery/dataType/detail/deal"><el-button type="text">查 看</el-button></router-link>
              <el-button type="text">人工补正</el-button>
              <el-button type="text">取消标注</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getScanningindex } from '@/api/dataGovernance'

export default {
  name: 'correctionwrap',
  data() {
    return {
      value: '',
      form: {
        rule: '',
        industry: ''
      },
      tradetype: [],
      list: [],
      // 每页显示条数
      currentPage: 1, // 分页当前页面
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
      // this.listLoading = true
      getScanningindex(this.listQuery).then(response => {
        this.list = response.data.projects
        // this.listLoading = false
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
.correctionwrap {
  .handleBtn {
    padding-bottom: 10px;
  }
  .btnalign {
    text-align: right;
  }
}
</style>
