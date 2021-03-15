<template>
  <div class="historyMsg">
    <el-card>
      <el-row style="margin-bottom:15px">
        <el-col :span="12">
          模型执行列表
        </el-col>
        <!-- <el-col :span="12" style="textAlign:right">
          <el-button-group>
            <el-button type="success">不危险2个</el-button>
            <el-button type="warning">警告1个</el-button>
            <el-button type="danger">危险2个</el-button>
          </el-button-group>
        </el-col> -->
      </el-row>

      <el-table :data="tableData" tooltip-effect="dark">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column label="执行ID" prop="ID" min-width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column label="模型名称" prop="name" show-overflow-tooltip min-width="180"></el-table-column>
        <el-table-column label="模型创建人" prop="person" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="模型执行开始时间" prop="time" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="模型执行结束时间" prop="endTime" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="总耗时" prop="totalTime" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="结果状态" prop="resultState" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="模型预警范围" prop="range" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="模型执行次数" prop="frequency" min-width="120"></el-table-column>
        <el-table-column label="预警数" prop="yjnum" min-width="120"></el-table-column>
        <el-table-column label="处理状态" prop="handleState" min-width="120"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <router-link to="warningProcessing/view" >
              <el-button type="text" >查看预测结果</el-button>
            </router-link> -->
            <el-button type="text" @click="deletedata(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
      <div class="divider divider-dashed"></div>
      <div class="button-group clearfix">
        <ul class="ul-inline">
          <li>模型预测结果</li>
        </ul>
        <ul class="ul-inline" style="float:right">
          <li>
            <el-tag type="info">分析中</el-tag>
          </li>
          <li>
            <el-tag type="warning">已移送</el-tag>
          </li>
          <li>
            <el-tag type="primary">已处理</el-tag>
          </li>
          <li>
            <el-tag type="success">已关注</el-tag>
          </li>
        </ul>
      </div>
      <div class="colorTable">
        <el-table :data="appraiseTableData" tooltip-effect="dark" :row-class-name="tableRowClassName">
          <el-table-column label="序号" type="index" width="60"></el-table-column>
          <el-table-column label="主体" prop="main" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="证件号" prop="ID" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="主体类型" prop="mainType" min-width="120"></el-table-column>
          <el-table-column label="国籍" prop="national" min-width="120"></el-table-column>
          <el-table-column label="预警结果" prop="warningResult" min-width="120"></el-table-column>
          <el-table-column label="评价时间" prop="time" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="评价结果" prop="result" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="评价人" prop="person" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="评价信息" prop="info" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible=true">评价预测结果</el-button>
              <el-button type="text">发起主动分析</el-button>
              <el-button type="text" @click="withSubject(scope)">标注主体</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
      <!-- <div style="textAlign:center;paddingTop:40px">
        <router-link :to="{name:'modelPlatform_modelManage_detail'}">
          <el-button type="primary"> 返 回 </el-button>
        </router-link>
      </div> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          ID: '51',
          name: '反恐融资监测模型-001',
          person: '模型创建者001',
          time: '2019-01-23 3:00:30',
          endTime: '2019-01-23 3:00:45',
          totalTime: '15sec',
          resultState: '完成',
          range: '方案开发处',
          frequency: '第3次',
          yjnum: '10',
          handleState: '待处理'
        },
        {
          ID: '48',
          name: '反恐融资监测模型-001',
          person: '模型创建者001',
          time: '2019-01-22 10:00:30',
          endTime: '2019-01-22 10:00:40',
          totalTime: '10sec',
          resultState: '完成',
          range: '--',
          frequency: '第2次',
          yjnum: '100'
        },
        {
          ID: '47',
          name: '反恐融资监测模型-001',
          person: '模型创建者001',
          time: '2019-01-22 3:00:30',
          endTime: '2019-01-22 3:00:31',
          totalTime: '1sec',
          resultState: '失败',
          range: '--',
          frequency: '第1次',
          yjnum: '--',
          handleState: '待处理'
        }
      ],
      appraiseTableData: [
        {
          main: '张三',
          ID: '410211197805300317',
          mainType: '个人',
          national: '中国',
          warningResult: '不危险',
          time: '2019-01-22 10:00:20',
          result: '正确',
          person: '分析员001',
          info: '经对本模型的预测结果进行深入分析，准确性高'
        },
        {
          main: '李四',
          ID: '532624200007294108',
          mainType: '个人',
          national: '中国',
          warningResult: '危险',
          time: '2019-01-23 10:00:20',
          result: '错误',
          person: '分析员001',
          info: '经对本模型的预测结果进行深入分析，准确性低'
        },
        {
          main: '王五',
          ID: '43010119771108839X',
          mainType: '个人',
          national: '中国',
          warningResult: '不危险',
          time: '2019-01-24 10:00:20',
          result: '错误',
          person: '分析员002',
          info: '经对本模型的预测结果进行深入分析，准确性低'
        },
        {
          main: '赵晓华',
          ID: '430426199911144977',
          mainType: '个人',
          national: '中国',
          warningResult: '不危险',
          time: '2019-01-22 10:00:20',
          result: '待评价',
          person: '--',
          info: '--'
        },
        {
          main: '韩又莲',
          ID: '53292819700625403X',
          mainType: '个人',
          national: '中国',
          warningResult: '危险',
          time: '2019-01-22 10:00:20',
          result: '待评价',
          person: '--',
          info: '--'
        },
        {
          main: '高敏学',
          ID: '310107197911208342',
          mainType: '个人',
          national: '中国',
          warningResult: '不危险',
          time: '2019-01-22 10:00:20',
          result: '待评价',
          person: '--',
          info: '--'
        }
      ]
    }
  },
  methods: {
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    deletedata(scope) {},
    withSubject(scope) {},
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 5 || rowIndex === 6) {
        return 'success-row'
      } else if (rowIndex === 3) {
        return 'haddle-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
.button-group.clearfix {
  margin-top: 20px;
}
.colorTable {
  .el-table .warning-row {
    background: rgba(255, 165, 0, 0.4);
  }
  .el-table .success-row {
    background: rgba(0, 128, 0, 0.3);
  }
  .el-table .haddle-row {
    background: rgba(64, 158, 255, 0.4);
  }
}
</style>