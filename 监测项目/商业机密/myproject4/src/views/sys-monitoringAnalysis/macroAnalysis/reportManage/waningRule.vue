<template>
  <div class="reportManage_waningRule">
    <el-card>
      <div slot="header">
        <span>宏观分析类报表</span>
      </div>
      <el-row style="marginBottom:20px">
        <el-col :span="8" :offset="6">
          <el-form>
            <el-form-item label="报表名称：" label-width="100px">
              <el-input v-model="name" placeholder="请输入报表名称"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-button type="primary" style="marginLeft:20px">查 询</el-button>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="tableData" class="expend_table" :show-header=false>
            <el-table-column type="expand" label="展开" >
              <template slot-scope="props">
                <el-table :data="props.row.tableData" v-if="props.row.tableData">
                  <el-table-column label="要素名称" prop="name"></el-table-column>
                  <el-table-column label="同比（%）" prop="TB"></el-table-column>
                  <el-table-column label="环比（%）" prop="HB"></el-table-column>
                  <el-table-column label="绝对值" prop="absolute"></el-table-column>
                </el-table>
                <span v-else>暂无数据，请先创建！</span>
              </template>
              
            </el-table-column>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="报表名称" prop="name" align="left"></el-table-column>
            <el-table-column label="操作" width="200" align="left">
              <template slot-scope="scoped">
                <el-button type="text" @click="dialogVisible=true" v-if=!scoped.row.tableData>创建</el-button>
                <el-button type="text" @click="dialogVisible=true" v-else>编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background>
      </el-pagination>
        </el-col>
      </el-row>
  
      <div style="textAlign:center; paddingTop:40px">
       <router-link :to="{name: 'macroAnalysis_reportManage'}">
         <el-button type="primary"> 返 回</el-button>
       </router-link>
      </div>
    </el-card>
     <!-- 弹窗 -外层-->
    <el-dialog title="新建预警规则：" :visible.sync="dialogVisible"  class="dialogBlock" >
      <el-form>
        <el-form-item label="选择预警要素：" label-width="120px" class="dailog_search">
          <el-checkbox-group v-model="dialogArr">
            <el-checkbox label="接收份数">接收份数</el-checkbox>
            <el-checkbox label="反馈涉及交易数 ">反馈涉及交易数</el-checkbox>
            <el-checkbox label="反馈份数">反馈份数</el-checkbox>
            <el-checkbox label="反馈涉及主体数 ">反馈涉及主体数</el-checkbox>
            <el-checkbox label="反馈本币交易金额">反馈本币交易金额</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-table :data="dialogTableData" >
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column label="要素名称"  prop="name">
        </el-table-column>
        <el-table-column label="同比（%）" prop="TB">
          <template slot-scope="scope">
            <el-input v-model="scope.row.TB"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="环比（%）" prop="HB">
          <template slot-scope="scope">
            <el-input v-model="scope.row.HB"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="绝对值" prop="absolute">
          <template slot-scope="scope">
            <el-input v-model="scope.row.absolute"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible=false">返 回</el-button>
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  export default {
  
    data() {
      return {
        name: '',
        tableData: [
          {
            name: '接收大额交易报告份数',
            tableData: [
              {
                name: '接收份数',
                TB: '20',
                HB: '120',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '160',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '220',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '150',
                absolute: '--'
              }
            ]
          },
          {
            name: '接收大额交易报告涉及客户数'
  
          },
          {
            name: '接收可疑交易报告份数',
            tableData: [
              {
                name: '接收份数',
                TB: '20',
                HB: '120',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '160',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '220',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '150',
                absolute: '--'
              }
            ]
  
          },
          {
            name: '接收可疑交易报告涉及客户数'
  
          },
          {
            name: '评审分支机构上报分析申请数',
            tableData: [
              {
                name: '接收份数',
                TB: '20',
                HB: '120',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '160',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '220',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '150',
                absolute: '--'
              }
            ]
          },
          {
            name: '分支机构对外报告线索入库数',
            tableData: [
              {
                name: '接收份数',
                TB: '20',
                HB: '120',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '160',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '220',
                absolute: '--'
              },
              {
                name: '反馈涉及交易数',
                TB: '40',
                HB: '150',
                absolute: '--'
              }
            ]
          }
        ],
        dialogVisible: false,
        dialogArr: ['接收份数', '反馈份数', '反馈本币交易金额'],
        dialogVisible2: false,
        dialogTableData: [
          {
            name: '接收份数'

          },
          {
            name: '反馈涉及交易数'

          },
          {
            name: '反馈份数'

          },
          {
            name: '反馈涉及主体数'

          },
          {
            name: '反馈本币交易金额'

          }
        ],
        currentPage: 1
  
      }
    }
  }
</script>

<style  lang="scss">
 .reportManage_waningRule{
   .expend_table{
     .el-table thead tr th{
       background: #fff;
       padding: 6px 0;
       color: #99a9bf;
       border: none
     }
     .el-table tbody tr td{
       border: none

     }
     .el-table::before{
       height: 0;

     }
   }
   .dialogBlock{
     .dailog_search{
       .el-checkbox{
         margin-left: 16px
       }
     }

   }

 }
 

</style>