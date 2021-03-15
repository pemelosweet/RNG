<template>
  <div class="addmonitor">
    <div class="title">抽取条件</div>
    <el-form :model="dialogForm" label-width="106px">
      <el-col :span="24">
        <el-form-item label="业务类型：" prop="type">
          <el-select v-model="dialogForm.type">
            <el-option label="大额" value="1"></el-option>
            <el-option label="可疑" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="dateValue">
          <el-select v-model="dialogForm.dateway" slot="label">
            <el-option label="交易时间" value=""></el-option>
            <el-option label="上报时间" value=""></el-option>
            <el-option label="落地时间" value=""></el-option>
          </el-select>
          <el-date-picker v-model="dialogForm.dateValue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="交易笔数：" prop="num">
          <el-input-number v-model="dialogForm.num" label="描述文字"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="支付方式：" prop="payway">
          <el-select v-model="dialogForm.payway">
            <el-option label="现金" value="xianjin"></el-option>
            <el-option label="非现金" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="交易发生地：" prop="region">
          <el-cascader :options="options" v-model="dialogForm.region"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="行政区划：">
          <el-select v-model="dialogForm.area" prop="area">
            <el-option label="河北省" value="hebei"></el-option>
            <el-option label="北京" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="btnalign">
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="primary" plain @click="resetForm('dialogForm')">重 置</el-button>
    </div>
    <div>
      <span class="title">筛选出的数据列表</span>
      <el-button type="primary" plain>批量抽取</el-button>
    </div>
    <el-table :data="dialogtableData">z
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="交易ID"></el-table-column>
      <el-table-column prop="name" label="主体名称"></el-table-column>
      <el-table-column prop="num" label="证件号码" min-width="100"></el-table-column>
      <el-table-column prop="date" label="交易发生日期" min-width="150"></el-table-column>
      <el-table-column prop="mark" label="业务标识号" min-width="100"></el-table-column>
      <el-table-column prop="type" label="交易类型"></el-table-column>
      <el-table-column prop="state" label="标注状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'dataGovernance_tradeDetail_suspicious'}" v-if="scope.row.type == '可疑'">
            <el-button type="text">查看</el-button>
          </router-link>
          <router-link :to="{name:'dataGovernance_tradeDetail_large'}" v-if="scope.row.type == '大额'">
            <el-button type="text">查 看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :current-page="dialogcurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogcurrentPage: 1,
      dialogForm: {
        type: '',
        dateway: '',
        dateValue: new Date(),
        num: '',
        payway: '',
        region: '',
        area: ''
      },
      dialogtableData: [
        {
          id: '9000000001',
          name: '王玉',
          num: '210102**3456',
          date: '2017-01-01 10:00:00',
          mark: '564933',
          type: '大额',
          state: '有标注'
        },
        {
          id: '9000000001',
          name: '赵峥',
          num: '210110***7021',
          date: '2017-01-01 10:00:00',
          mark: '564933',
          type: '可疑',
          state: '无标注'
        }
      ],
      options: [
        {
          value: 'zhinan',
          label: '江苏省',
          children: [
            {
              value: 'shejiyuanze',
              label: '南京市',
              children: [
                {
                  value: 'yizhi',
                  label: '玄武区'
                },
                {
                  value: 'fankui',
                  label: '白下区'
                },
                {
                  value: 'xiaolv',
                  label: '秦淮区'
                },
                {
                  value: 'kekong',
                  label: '鼓楼区'
                }
              ]
            },
            {
              value: 'daohang',
              label: '无锡市',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '崇安区'
                },
                {
                  value: 'dingbudaohang',
                  label: '南长区'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '河南省',
          children: [
            {
              value: 'basic',
              label: '郑州市',
              children: [
                {
                  value: 'layout',
                  label: '中原区'
                },
                {
                  value: 'color',
                  label: '二七区'
                },
                {
                  value: 'typography',
                  label: '金水区'
                },
                {
                  value: 'icon',
                  label: '上街区'
                },
                {
                  value: 'button',
                  label: '惠济区'
                }
              ]
            },
            {
              value: 'form',
              label: '开封市',
              children: [
                {
                  value: 'radio',
                  label: '龙亭区'
                },
                {
                  value: 'checkbox',
                  label: '顺河回族区'
                },
                {
                  value: 'input',
                  label: '鼓楼区'
                },
                {
                  value: 'input-number',
                  label: '禹王台区'
                },
                {
                  value: 'select',
                  label: '金明区'
                },
                {
                  value: 'cascader',
                  label: '杞县'
                },
                {
                  value: 'switch',
                  label: '通许县'
                },
                {
                  value: 'slider',
                  label: '尉氏县'
                },
                {
                  value: 'time-picker',
                  label: '开封县'
                },
                {
                  value: 'date-picker',
                  label: '兰考县'
                }
              ]
            },
            {
              value: 'data',
              label: '洛阳市',
              children: [
                {
                  value: 'table',
                  label: '老城区'
                },
                {
                  value: 'tag',
                  label: '西工区'
                },
                {
                  value: 'progress',
                  label: '瀍河回族区'
                },
                {
                  value: 'tree',
                  label: '涧西区'
                },
                {
                  value: 'pagination',
                  label: '吉利区'
                },
                {
                  value: 'badge',
                  label: '洛龙区'
                }
              ]
            },
            {
              value: 'notice',
              label: '安阳市',
              children: [
                {
                  value: 'alert',
                  label: '文峰区'
                },
                {
                  value: 'loading',
                  label: '北关区'
                },
                {
                  value: 'message',
                  label: '殷都区'
                },
                {
                  value: 'message-box',
                  label: '龙安区'
                },
                {
                  value: 'notification',
                  label: '安阳县'
                }
              ]
            },
            {
              value: 'others',
              label: '平顶山市',
              children: [
                {
                  value: 'dialog',
                  label: '新华区'
                },
                {
                  value: 'tooltip',
                  label: '卫东区'
                },
                {
                  value: 'popover',
                  label: '石龙区'
                },
                {
                  value: 'card',
                  label: '湛河区'
                },
                {
                  value: 'carousel',
                  label: '宝丰县'
                },
                {
                  value: 'collapse',
                  label: '叶县'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '北京市',
          children: [
            {
              value: 'axure',
              label: '东城区'
            },
            {
              value: 'sketch',
              label: '西城区'
            },
            {
              value: 'jiaohu',
              label: '朝阳区'
            }
          ]
        }
      ]
    }
  },
  methods: {
    resetForm(formName) { // 重置清空操作
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.addmonitor {
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 200px;
  }
  .btnalign {
    text-align: right;
  }
  .title {
    font-weight: bold;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>
