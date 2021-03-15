<template>
  <el-card class="box-card forewarningTask-index">
    <div slot="header" class="clearfix">
      <span>名单预警配置</span>
      <router-link :to="{name:'rosterManage_depAdd'}" style="float: right;">
        <el-button type="text" icon="el-icon-plus"> 新建配置</el-button>
      </router-link>
    </div>
    <div class="content">
      <el-form :model="form" class="formBlock" ref="searchForm" label-width="114PX">
        <template v-if="toggleSearch">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="涉罪类型名称：" prop="wJName">
                <el-input v-model="form.wJName" placeholder="预警任务"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人：" prop="ruleName">
                <el-input v-model="form.ruleName" placeholder="预警规则"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="fetchData">查询</el-button>
              <el-button type="default" @click="cleanUp">清空</el-button>
              <el-button type="text" icon="el-icon-arrow-down" @click="toggleSearch=false"> 展开</el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row :gutter="20" class="toggle">
            <el-col :span="8">
              <el-form-item label="涉罪类型名称：" prop="wJName">
                <el-input v-model="form.wJName" placeholder="预警任务"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态：" prop="ruleName">
                <el-input v-model="form.ruleName" placeholder="预警规则"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人：" prop="impName">
                <el-input v-model="form.impName" placeholder="文件名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="创建时间：" prop="subjectName">
               <el-date-picker style="width:100%!important;" v-model="form.statisticalTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新人：" prop="subjectINum">
                <el-input v-model="form.subjectINum" placeholder="证件号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间：" prop="sourceDire">
                <el-date-picker style="width:100%!important;" v-model="form.statisticalTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="toggle">
            <el-col :span="8">
              <el-form-item label="名单预警范围：" prop="sourceBusiness">
                <el-select v-model="form.sourceBusiness" placeholder="来源业务" filterable>
                   <el-option v-for="(item,index) in sourceBusinessArr" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:right;margin-bottom:30px">
            <el-button type="primary" @click="fetchData">查 询</el-button>
            <el-button @click="cleanUp">重 置</el-button>
            <el-button type="text" icon="el-icon-arrow-up" @click="toggleSearch = true">收起</el-button>
          </div>
        </template>
      </el-form>
      <el-table style="width: 100%" :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="pJName" label="涉罪类型名称"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="preliminaryJudgment" label="涉罪类型"></el-table-column>
        <el-table-column prop="anOffice" label="分析处室"></el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" background>
      </el-pagination>
    </div>
  </el-card>

</template>

<script>
import { getPreservationApi } from '@/api/sys-monitoringAnalysis/roster-warning/roster-manage.js'
import { getsourceBusinessArr } from '@/api/sys-monitoringAnalysis/roster-warning/levelConfiguration.js'
import preliminaryJudgment from '@/views/sys-monitoringAnalysis/monitoringWarning/rosterWarning/components/preliminaryJudgment.vue'
import {
  delRule,
  deleteSingle
} from '@/api/sys-monitoringAnalysis/roster-warning/warning-task.js'
export default {
  components: {
    preliminaryJudgment
  },

  data() {
    return {
      toggleSearch: true,
      form: {
        wJName: '',
        ruleName: '',
        impName: '',
        subjectName: '',
        subjectINum: '',
        sourceDire: '',
        sourceBusiness: '',
        listSourceDocNum: '',
        remark: ''
      },
      sourceDireArr: [], // 来源方向
      sourceBusinessArr: [], // 来源业务
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    searchParams() {
      const obj = Object.assign({}, this.form, this.pageInfo)
      delete obj.total
      return obj
    }
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      var paramsObj = {
        pageNum: 1,
        pageSize: 9999
      }
      getsourceBusinessArr(paramsObj, '0').then(res => {
        if (res.code === 200) {
          this.sourceBusinessArr = res.data.list
        }
      })
      getsourceBusinessArr(paramsObj, '1').then(res => {
        if (res.code === 200) {
          this.sourceDireArr = res.data.list
        }
      })
    },
    // 请求列表数据
    fetchData() {
      const listAnalyzeRelationDO = {
        pJName: '',
        describe: '',
        preliminaryJudgment: '',
        anOffice: '',
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      getPreservationApi(listAnalyzeRelationDO).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
      // if (this.$refs.judgment) {
      //   this.searchParams.preliminaryJudgment = this.$refs.judgment.searchParams.join()
      // } else {
      //   this.searchParams.preliminaryJudgment = ''
      // }
      // getTable(this.searchParams)
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.tableData = res.data.list
      //       this.pageInfo.total = res.data.total
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.fetchData()
      // console.log(`每页 ${size} 条`)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.fetchData()
      // console.log(`当前页: ${currentPage}`)
    },
    cleanUp() {
      this.$refs.searchForm.resetFields()
    },

    // 是否启用
    startUse(scope) {
      const val = Number(scope.row.status) === 0 ? '禁用' : '启用'
      this.$confirm('是否' + val + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const id = scope.row.wJId
          const status = scope.row.status === 0 ? 1 : 0

          delRule(id, status).then(res => {
            if (res.code === 200) {
              this.fetchData()
            }
          })
        })
        .catch(() => {})
    },
    //
    delTask(id) {
      this.$confirm('您确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSingle(id).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 6000
              })
              this.fetchData()
            }
          })
        })
        .catch(() => {})
    }
  },
  created() {
    this.fetchData()
    this.getDictionary('SCDT')
    this.getDictionary('SCDS')
    // this.getDictionary('SUBTYPE')
    // this.getDictionary('SEX')
    // this.getDictionary('PUBLEVEL')
    // this.getDictionary('TPOINT')
    // this.getDictionary('LOCP')
  }
}
</script>

<style lang="scss">
.forewarningTask-index {
  .formBlock {
    .el-select {
      width: 100%;
    }
  }
  .mark-span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    vertical-align: 1px;
  }
  .el-col-8 {
    height: 55px;
  }
  @media screen and(max-width: 1400px) {
    .toggle {
      .el-col-8 {
        width: 50%;
      }
    }
  }
}
</style>
