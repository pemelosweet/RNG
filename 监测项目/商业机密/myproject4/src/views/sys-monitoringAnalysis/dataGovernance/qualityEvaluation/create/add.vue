<template>
  <div class="createadd">
    <el-card>
      <div slot="header">
        <span>新建评价任务</span>
      </div>
      <el-form :model="form" ref="form" label-width="120px">
        <el-row>
          <el-form-item label="评价任务名称：">
            <el-input style="width: 60%;"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="createtitle">创建评价任务:</div>
          <el-col :span="8">
            <el-form-item label="指标体系：">
              <el-select v-model="form.indicator" placeholder="请选择评价指标模板 ">
                <el-option label="数据交易报告情况" value="1"></el-option>
                <el-option label="情报价值情况" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价范围：">
              <el-select v-model="form.indicator" placeholder="请选择评价范围 ">
                <el-option label="24家全国性金融机构集合" value="1"></el-option>
                <el-option label="6家国有商业银行集合" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价时间：">
              <el-date-picker v-model="form.dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="一级指标名称">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="权重">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="organ" label="分配处室及指定机构" min-width="240px">
          <template slot-scope="scope">
            <el-input type="textarea" style="width: 50%;"></el-input>
            <el-button type="primary" plain @click="dialogVisible = true">指定评价机构</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="可向下细化层级">
          <template slot-scope="scope">
            <el-select v-model="scope.row.$index">
              <el-option value="" label="一级"></el-option>
              <el-option value="" label="二级"></el-option>
              <el-option value="" label="三级"></el-option>
              <el-option value="" label="四级"></el-option>
              <el-option value="" label="五级"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 10px;">
        <router-link :to="{ name: 'dataGovernance_qualityEvaluation_create'}">
          <el-button type="primary">保存</el-button>
        </router-link>
      </div>

      <el-dialog title="提示" :visible.sync="dialogVisible">
        <div>
          <el-table :data="dialogTabledata">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="处室名称"></el-table-column>
            <el-table-column prop="organ" label="指定评价机构" min-width="250px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.$index" multiple placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        indicator: '',
        dateValue: ''
      },
      tableData: [
        {
          name: '',
          weight: '',
          organ: '',
          level: ''
        }
      ],
      dialogTabledata: [
        {
          name: '收集处'
        },
        {
          name: '分析一处'
        },
        {
          name: '分析二处'
        }
      ],
      options: [{ // 弹框
        value: '1',
        label: '中国工商银行'
      }, {
        value: '2',
        label: '中国农业银行'
      }, {
        value: '3',
        label: '中国银行'
      }, {
        value: '4',
        label: '中国建设银行'
      }, {
        value: '5',
        label: '中国交通银行'
      }]
    }
  }
}
</script>

<style lang="scss">
.createadd {
  .createtitle {
    padding: 10px 0;
  }
}
</style>
