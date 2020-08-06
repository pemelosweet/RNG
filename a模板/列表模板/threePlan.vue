<template>
  <el-card>
    <div slot="header" class="clearfix btnCard">
      <span>三年项目规划</span>
      <div class="elCardBtnBox">
        <el-button type="primary" size="small" @click="add()">新 增</el-button>
      </div>
    </div>
    <div class="search">
      <el-form ref="Searchform" :model="Searchform" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="需求单位" prop="v1">
              <el-input v-model="Searchform.v1" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="v2">
              <el-input v-model="Searchform.v2" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提交日期" prop="v3">
              <el-input v-model="Searchform.v3" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="6" style="text-align: right;">
            <el-button type="primary" size="small" :loading="loading" @click="search">查 询</el-button>
            <el-button size="small" @click="empty('Searchform')">清 空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" min-width="40" show-overflow-tooltip />
        <el-table-column prop="v1" label="类型1" min-width="80" show-overflow-tooltip />
        <el-table-column prop="v2" label="类型2" min-width="80" show-overflow-tooltip />
        <el-table-column prop="v3" label="类型3" min-width="80" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deletemodel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ThreePlan',
  data() {
    return {
      loading: false,
      rules: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 10
      },
      Searchform: {
        v1: '',
        v2: '',
        v3: ''
      },
      tableData: [
        {},
        {}
      ]
    }
  },
  computed: {
    paramsObj() {
      var obj = Object.assign({}, this.pageInfo, this.Searchform)
      return obj
    }
  },
  mounted() {

  },
  methods: {
    add() {
      this.$router.push({
        path: ``,
        query: { flag: 'new' }
      })
    },
    search() {
      console.log(this.paramsObj)
    },
    empty(fileName) {
      this.$refs[fileName].resetFields()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.search()
    }

  }

}
</script>
<style scoped lang="scss">
.el-card{
  position: relative;
  overflow:inherit;
  .el-card__body {
    overflow:inherit;
    min-height: 600px;
  }
  // elCard 标题home
  .el-card__header{
    padding:12px 20px;
    height: 32px;
    box-sizing: content-box;
    line-height: 32px;
  }
  .el-card__header .btnCard{
    height: 32px;
    box-sizing: content-box;
    line-height: 32px;
  }
  .elCardBtnBox{
    float: right;
  }
}
.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}
</style>

