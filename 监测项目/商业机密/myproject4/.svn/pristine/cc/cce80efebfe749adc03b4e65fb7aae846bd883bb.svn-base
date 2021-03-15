<template>
  <div class="dataLifecycle_count">
    <el-form :model="form">
      <div class="titleContainer" >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="执行人：" label-width="100px">
              <el-select v-model="form.select" placeholder="请选择">
                <el-option label="张三" value="1"></el-option>
                <el-option label="李四" value="2"></el-option>
                <el-option label="王五" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="执行状态：" label-width="100px">
              <el-select v-model="form.select" placeholder="请选择">
                <el-option label="完成" value="1"></el-option>
                <el-option label="未执行" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间：" label-width="100px">
              <el-date-picker
                v-model="form.value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                unlink-panels
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-button type="primary" style="marginLeft:20px">查 询</el-button>
        </el-row>
      </div>
    </el-form>
    <div class="list">
      <el-table :data="tableData">
        <el-table-column label="表名" prop="name"></el-table-column>
        <el-table-column label="迁移方式" prop="type"></el-table-column>
        <el-table-column label="数据量（万条）" prop="number"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="描述" prop="time"></el-table-column>
        <el-table-column label="执行人" prop="person"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
   
    </div>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          select: '',
          select2: '',
          value1: ''
        },
        tableData: [
          {
            name: 'table1',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-10 14:20:56',
            number: '2000',
            person: '张三'
          },
          {
            name: 'table2',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-10 14:20:56',
            number: '2000',
            person: '李四'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-9 14:20:56',
            number: '2000',
            person: '张三'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-4 14:20:56',
            number: '2000',
            person: '李四'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-15 14:20:56',
            number: '2000',
            person: '王五'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '2018-1-10 14:20:56',
            number: '2000',
            person: '张三'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
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
.dataLifecycle_count{
  .el-range-editor{
    width: 100%
  }
}


</style>