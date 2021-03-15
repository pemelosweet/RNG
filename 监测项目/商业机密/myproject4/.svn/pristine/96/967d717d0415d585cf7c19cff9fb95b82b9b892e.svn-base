<template>
  <div class="intelligenceFile_resultList">
    <el-card>
      <div slot="header">
        <span>定制结果要素</span>
      </div>

      <div style="marginBottom:40px">
        <el-form>
          <el-row style="padding:10px 0">
            <el-col :span="24" >
              <el-form-item label="交易表：" label-width="80px">
                <el-checkbox-group v-model="checkArr">
                  <el-checkbox  v-for="item in checkData" :label="item" :value="item" :key="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="textAlign:right">
              <el-button type="primary">保 存</el-button>
              <el-button type="primary" >清 空</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="marginBottom:20px">
        <div>
          <span>定制结果要素列表</span>
        </div>
        <el-table :data="tableData">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="结果要素" prop="element"></el-table-column>
          <el-table-column label="创建时间" prop="time"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
               <!-- <el-button type="text">下载</el-button> -->
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
          :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
         
      </div>

      <div style="marginBottom:40px; textAlign:center" >
        <router-link :to="{name: this.$route.query.key}">
          <el-button type="primary">返 回</el-button>
        </router-link>
      </div>
    </el-card>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkArr: [],
        checkData: [
          '主体名称', '主体证件号码', '账号', '客户账户类型', '客户账号', '客户账户开立时间', '客户银行卡其他类型',
          '主体名称2', '主体证件号码2', '账号2', '客户账户类型2', '客户账号2', '客户账户开立时间2', '客户银行卡其他类型2',
          '主体名称3', '主体证件号码3', '账号3', '客户账户类型3', '客户账号3', '客户账户开立时间3', '客户银行卡其他类型3',
          '主体名称4', '主体证件号码4', '账号4', '客户账户类型4', '客户账号4', '客户账户开立时间4', '客户银行卡其他类型4'
        ],
        tableData: [
          {
            element: '主体名称、主体证件号码、账号',
            time: '2017-12-02 14:00:45'
          },
          {
            element: '主体名称、主体证件号码、账号',
            time: '2017-12-02 14:00:45'
          },
          {
            element: '主体名称、主体证件号码、账号',
            time: '2017-12-02 14:00:45'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      console.log(this.$route.params)
    }
  }
</script>

<style lang="scss" >
.intelligenceFile_resultList{
  .el-checkbox{
    // width: 140px;
    margin-left: 20px

  }

}

</style>