<template>
  <div class="createwrap">
    <el-card>
      <div slot="header" class="clearfix">
        <span>创建评价任务</span>
        <router-link :to="{ name: 'dataGovernance_qualityEvaluation_create_add'}">
          <el-button type="text" style="float:right;">创建评价任务</el-button>
        </router-link>
      </div>
      <el-row>
        <el-form ref="form" :model="form" label-width="120px" class="clearfix">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="评价任务名称：">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="创建时间：">
                <el-date-picker v-model="form.dateValue" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="任务状态：">
                <el-select v-model="form.state">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="保存" value="1"></el-option>
                  <el-option label="生效" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16" class="btnalign">
              <el-button type="primary">查询</el-button>
              <el-button type="primary" plain>清空</el-button>
            </el-col>
          </el-col>
        </el-form>
      </el-row>

      <div style="margin-top: 10px;">
        <span>评价任务列表：</span>
        <el-popover ref="popover" placement="top" width="160" v-model="taskVisible">
          <p>该任务已生效！</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="taskVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="taskVisible = false">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" plain v-popover:popover>任务生效</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="评价任务名称"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column prop="state" label="任务状态"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{ name: 'dataGovernance_qualityEvaluation_create_add'}">
              <el-button type="text">查看任务</el-button>
            </router-link>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskVisible: false, // 任务生效按钮
      currentPage: 1,
      form: {
        name: '',
        dateValue: '',
        state: 'all'
      },
      tableData: [
        {
          name: '2018年全年24家全国性法人金融机构列表',
          date: '2018-12-12 09:30:00',
          state: '保存'
        },
        {
          name: '2018年全年24家全国性法人金融机构列表',
          date: '2018-12-12 09:30:00',
          state: '生效'
        },
        {
          name: '2018年保险业机构列表',
          date: '2018-12-12 09:30:00',
          state: '生效'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.createwrap {
  .btnalign {
    text-align: right;
  }
}
</style>
