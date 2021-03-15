<template>
  <div class="configstatistics">
      <el-card>
          <div slot="header">
              <span>配置统计要素</span>
          </div>
          <el-transfer v-model="value2" :data="data2" :button-texts="['到左边', '到右边']"></el-transfer>
          <div class="btnalign"><el-button type="primary">确定</el-button></div>
          <div class="configtitle">定制统计要素列表：</div>
          <el-table :data="tableData">
            <el-table-column type="selection" min-width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="jrjgbm" label="统计要素" min-width="140"></el-table-column>
            <el-table-column prop="bgjgmc" label="创建时间" min-width="140"></el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
           <div class="btnalign"><router-link to="/dataQuery/dataType"><el-button type="primary"><i class="el-icon-back"></i>返回</el-button></router-link></div>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      const types = ['交易主体数', '账户数', '交易笔数', '本外币金额', '单笔最大金额', '最早交易时间', '最晚交易时间']
      const pinyin = ['jiyizhutishu', 'zhanghushu', 'jiaoyibishu', 'benwaibijine', 'danbizuidajine', 'zuizaojiaoyishijian', 'zuiwanjiaoyishijian']
      types.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    // return {
    //   currentPage: 1,
    //   tableData: [],
    //   value2: [],
    //   activeNames: ['1'], // 手风琴
    //   type: [] // 复选框
    //   // checkList: ['交易主体数', '账户数', '交易笔数', '本外币金额', '单笔最大金额', '最早交易时间', '最晚交易时间']
    // }

    return {
      currentPage: 1,
      tableData: [],
      data2: generateData(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  methods: {
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
.configstatistics {
    .el-transfer {
      text-align: center;
      .el-transfer-panel,.el-transfer-panel {
          text-align: left;
      }
    }
    .configtitle {
      font-size: 14px;
      margin:20px 0 10px;
    }
    .btnalign {
      text-align: center;
      margin-top: 10px;
    }
}
</style>
