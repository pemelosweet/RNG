<template>
  <div class="indicatorAddwrap">
    <el-card>
      <div slot="header"><span>指标配置</span></div>
      <el-row>
        <el-form ref="form" :model="form" label-width="140px">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="指标名称：">
                <el-input placeholder="完整性指标"></el-input>
              </el-form-item> 
            </el-col> 
            <el-col :span="8">
              <el-form-item label="适用业务范围：">
                <el-checkbox-group v-model="form.area">
                  <el-checkbox label="大额" name="type"></el-checkbox>
                  <el-checkbox label="可疑" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item> 
            </el-col> 
            <el-col :span="8">
              <el-form-item label="指标基准分：">
                <el-input placeholder="默认为0"></el-input>
              </el-form-item>
            </el-col> 
          </el-col>
          <!-- 第二行 -->
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="适用行业范围：">
                 <el-select v-model="form.bussiness">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="银行业" value=""></el-option>
                  <el-option label="保险业" value=""></el-option>
                  <el-option label="证券业" value=""></el-option>
                </el-select>
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="指标类别：">
                <el-checkbox-group v-model="form.area">
                  <el-checkbox label="定性" name="type"></el-checkbox>
                  <el-checkbox label="定量" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="选择等级：">
                  <el-table class="levelwrap" :data="list" border style="width: 100%">
                    <el-table-column prop="level" label="等级名称">
                      <template slot-scope="scope"><el-input size="small" v-model="scope.row.languageCode" placeholder="请输入等级名称"></el-input></template>
                    </el-table-column>
                    <el-table-column prop="goal" label="得分">
                       <template slot-scope="scope"><el-input size="small" v-model="scope.row.languageCode" placeholder="请输入得分"></el-input></template> 
                    </el-table-column>
                  </el-table>
              </el-form-item> 
            </el-col>
          </el-col>
        </el-form>  
      </el-row>
      
      <div style="margin-bottom: 10px"><el-button type="primary" @click="showTable">新增细项指标</el-button></div>
      <el-table :data="tableData" v-show="show">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="organ" label="级别">
            <template slot-scope="scope">
              <el-popover ref="popover2" placement="bottom" width="200" trigger="click">
                <template slot-scope="content">
                  <el-tree :data="treeData" :props="defaultProps" v-show="treeShow"></el-tree>
                </template>
              </el-popover>
              <el-input v-model="scope.row.languageCode" v-popover:popover2 placeholder="请输入内容" @focus="focus"></el-input>
              <!-- <el-tree :data="treeData" :props="defaultProps" v-show="treeShow"></el-tree> -->
            </template>
        </el-table-column>
        <el-table-column prop="businessType" label="考核项目"></el-table-column>
        <el-table-column prop="tradeCount" label="指标含义"></el-table-column>
         <el-table-column prop="timeBucket" label="计算公式"></el-table-column>
        <el-table-column prop="state" label="指标基准分" min-width="100"></el-table-column>
      </el-table>
      <div class="btnalign"><el-button type="primary">保存</el-button><el-button type="primary" plain @click="routerBack">返回</el-button></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        level: 'all',
        type: 'all',
        area: []
      },
      show: false,
      treeShow: false,
      list: [
        {
          level: '',
          goal: ''
        }],
      tableData: [
        {
          organ: '中国建设银行',
          businessType: '大额交易',
          tradeCount: '1000',
          dataType: '上报时间',
          timeBucket: '2017/10/13-2017/11/13',
          state: '已反馈',
          result: '一致1000条'
        },
        {
          organ: '上海XX银行',
          businessType: '可疑交易',
          tradeCount: '400',
          dataType: '抽取时间',
          timeBucket: '2017/10/13-2017/11/13',
          state: '保存',
          result: '一致850条；不一致100条'
        },
        {
          organ: '上海XX银行',
          businessType: '可疑交易',
          tradeCount: '400',
          dataType: '抽取时间',
          timeBucket: '2017/10/13-2017/11/13',
          state: '待反馈',
          result: '数据缺失'
        }
      ],
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    showTable: function() {
      this.show = true
    },
    focus() {
      this.treeShow = true
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.indicatorAddwrap {
  .levelwrap {
    thead tr th {
      padding: 0;
    }
  }
  .btnalign {
    text-align: center;
    margin-top:10px;
  }
}
</style>
