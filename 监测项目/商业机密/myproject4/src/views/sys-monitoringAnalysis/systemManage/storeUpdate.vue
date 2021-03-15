<template>
  <div class="storeUpdate">
    <el-card>
      <div slot="header">匹配信息存储更新</div>
      <el-tabs v-model="activeName">
        <!-- <el-tab-pane label="更新任务管理" name="first">
          <el-form :model="form">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="任务执行开始时间：" label-width="140px">
                  <el-date-picker
                  v-model="form.value2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="任务状态 ：" label-width="90px" style="margin-left:50px">
                  <el-select v-model="form.value" placeholder="全部">
                    <el-option v-for="(item, index) in form.options" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="更新状态 ：" label-width="90px">
                    <el-select v-model="form.value" placeholder="全部">
                        <el-option v-for="(item, index) in form.options2" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col> 
              <el-col :span="3">
                <el-button type="primary">查询</el-button>   
              </el-col>   
            </el-row>
          </el-form>
          <el-table :data="tableData">
            <el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
            <el-table-column prop="name" label="更新任务名称" min-width="130"></el-table-column>
            <el-table-column prop="time" label="任务执行开始时间" min-width="100"></el-table-column>
            <el-table-column prop="state" label="任务状态" min-width="100"></el-table-column>
            <el-table-column prop="number" label="更新量（条）" min-width="80"></el-table-column>
            <el-table-column prop="updatetime" label="更新耗时" min-width="80"></el-table-column>
            <el-table-column prop="updatestate" label="更新状态" min-width="80"></el-table-column>
          </el-table>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" background
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
          </el-pagination>
        </el-tab-pane> -->
        <el-tab-pane label="更新任务规则" name="second">
          <!-- <el-row>
            <el-col :span="3" style="margin-top:7px">自动更新设置</el-col>
            <el-col :span="2"><el-button type="primary" @click="add">新增自动更新任务</el-button></el-col>
          </el-row>
          <el-table :data="tableData2">
            <el-table-column type="index" label="序号" width="60" fixed="left"></el-table-column>
            <el-table-column label="更新内容" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.name">{{scope.row.name}}</span>
                <el-select v-model="scope.row.updateName.value" v-if="scope.row.updateName" placeholder="工商登记信息">
                  <el-option v-for="item in scope.row.updateName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="数据来源" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.source">{{scope.row.source}}</span>
                <el-button type="text"  v-if="scope.row.choose">选择</el-button>
              </template>
            </el-table-column>
             <el-table-column label="数据去向" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.whereabouts">{{scope.row.whereabouts}}</span>
                <el-select v-model="scope.row.updateName.value" v-if="scope.row.updateName" placeholder="可选表1">
                  <el-option v-for="item in scope.row.updateName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="更新频率" min-width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.time">{{scope.row.time}}</span>
                <el-select v-model="scope.row.timeName.value" v-if="scope.row.timeName" placeholder="定时" style="width:75px">
                  <el-option v-for="item in scope.row.timeName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select v-model="scope.row.timeName2.value" v-if="scope.row.timeName2" placeholder="每天" style="width:75px">
                  <el-option v-for="item in scope.row.timeName2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-time-picker v-model="value2" v-if="scope.row.timeName" style="width:115px"></el-time-picker>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="" label="操作" min-width="120">
              <template>
                <el-button type="text">启用</el-button>
                <el-button type="text">暂停</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="divider divider-dashed"></div> -->
          <el-row>
            <!-- <el-col :span="2" style="margin-top:7px">手动更新</el-col>
            <el-col :span="6">
              <el-form :model="form2">
                <el-form-item label="更新类型：" label-width="82px">
                  <el-select v-model="form2.value" >
                    <el-option label="公民出入境证件信息" value="1"></el-option>
                    <el-option label="公民身份证件信息" value="2"></el-option>
                  </el-select>
                </el-form-item>  
              </el-form>
            </el-col> -->
            <FileUpload 
            :accepts="accepts" 
            @changes="change"
            ></FileUpload>
            <!-- <el-col :span="2" :offset="1"><el-button type="primary" @click="change">更  新</el-button></el-col> -->
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import { getOptions } from '@/api/sys-monitoringAnalysis/systemManage/storeUpdate.js'
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      value: '',
      value2: '',
      accepts: ['xls', 'xlsx', 'doc', 'docx'],
      activeName: 'second',
      form: {
        options: [
          {
            value: '1',
            label: '等待执行'
          },
          {
            value: '2',
            label: '执行中'
          },
          {
            value: '3',
            label: '已执行'
          }
        ],
        options2: [
          {
            value: '1',
            label: '失败'
          },
          {
            value: '2',
            label: '成功'
          }
        ]
      },
      form2: {
        value: ''
      },
      tableData: [
        {
          name: '公民出入境证件信息',
          time: '2017-11-10 00：00：00',
          state: '等待执行',
          number: '2000',
          updatetime: '10min',
          updatestate: '成功'
        },
        {
          name: '公民身份证件信息',
          time: '2017-11-09 16：00：00',
          state: '执行中',
          number: '2000',
          updatetime: '10min',
          updatestate: '成功'
        },
        {
          name: '公民身份证件信息',
          time: '2017-11-09 14：00：00',
          state: '已执行',
          number: '2000',
          updatetime: '10min',
          updatestate: '成功'
        },
        {
          name: '公民身份证件信息',
          time: '2017-11-09 14：00：00',
          state: '已执行',
          number: '2000',
          updatetime: '10min',
          updatestate: '成功'
        },
        {
          name: '公民身份证件信息',
          time: '2017-11-09 14：00：00',
          state: '已执行',
          number: '2000',
          updatetime: '10min',
          updatestate: '成功'
        }
      ],
      tableData2: [
        {
          name: '公民身份证件信息',
          time: '定时  每天  00：00',
          source: '公安部XXXX表',
          whereabouts: '公民身份证件信息表',
          state: '已启用'
        },
        {
          name: '公民出入境证件信息',
          time: '定时  每天  00：00',
          source: '公安部XXXX表',
          whereabouts: '公民出入境证件信息表',
          state: '已启用'
        }
      ],
      currentPage: 1,
      pagesize: 10
    }
  },
  methods: {
    // 分页
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    getOptions() {
      getOptions().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    add() {
      this.tableData2.push(
        {
          updateName: [
            {
              value: '选项1',
              label: '工商登记信息'
            },
            {
              value: '选项2',
              label: '税务信息'
            },
            {
              value: '选项3',
              label: '企业征信信息'
            }
          ],
          timeName: [
            {
              value: '选项1',
              label: '定时'
            },
            {
              value: '选项2',
              label: '实时'
            }
          ],
          timeName2: [
            {
              value: '选项1',
              label: '每天'
            },
            {
              value: '选项2',
              label: '每周'
            },
            {
              value: '选项3',
              label: '每月'
            },
            {
              value: '选项4',
              label: '每年'
            }
          ],
          choose: '1',
          state: '未启用'
        }
      )
    },
    change() {
      this.activeName = 'first'
    }
  }
}
</script>

<style scoped>
</style>