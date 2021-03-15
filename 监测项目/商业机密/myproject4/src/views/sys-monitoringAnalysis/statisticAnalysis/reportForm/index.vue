
<template>
  <div>
    <el-card>
      <!-- 标题 -->
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>报表管理</span>
          </el-col>
        </el-row>
      </div>
      <div class="header">
        <el-form :model="form" >
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item label="报表模板名称：" label-width="140px">
                <el-input v-model="form.name" placeholder="请输入模板名称"></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="6">
              <el-form-item label="状态：" label-width="100px">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="用户分类：" label-width="140px">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="统计报表"></el-checkbox>
                  <el-checkbox label="宏观分析"></el-checkbox>
                  <el-checkbox label="规则模型"></el-checkbox>
                  
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="textAlign:right">
              <el-button type="primary" style="marginLeft:40px">查 询</el-button>
              <el-button type="primary">创建报表模板</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="listBlock" style="marginBottom:30px">
            <el-table :data="tableData">
              <el-table-column label="序号" type="index" width="60"></el-table-column>
              <el-table-column label="报表名称" prop="name"></el-table-column>
              <el-table-column label="用途分类" prop="use"></el-table-column>
              <el-table-column label="报表分类" prop="file"></el-table-column>
              <el-table-column label="创建时间" prop="time"></el-table-column>
              <el-table-column label="创建人" prop="person"></el-table-column>
              <el-table-column label="状态" prop="state"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
              :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
          

      </div>
    </el-card>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          type: [],
          select: '1'
        },
        tableData: [
          {
            name: '反洗钱检测分析统计表',
            use: '统计报表',
            file: '报表',
            time: '2018-1-20',
            person: '张三',
            state: '启用'
          },
          {
            name: '人民银行分支机构上报线索情况统计表',
            use: '统计报表',
            file: '报表',
            time: '2018-1-20',
            person: '李四',
            state: '启用'
          },
          {
            name: '银行业可疑交易报告接收情况示意图',
            use: '宏观分析',
            file: '图标',
            time: '2018-1-20',
            person: '张三',
            state: '禁用'
          },
          {
            name: '证券期货业可疑交易报告接收情况示意图',
            use: '统计报表',
            file: '报表',
            time: '2018-1-20',
            person: '张三',
            state: '启用'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange() {
      },
      handleCurrentChange() {
      }
    }
  }
</script>

<style scoped>

</style>