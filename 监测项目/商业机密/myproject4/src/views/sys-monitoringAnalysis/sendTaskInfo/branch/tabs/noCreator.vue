<template>
  <div class="conjointAnalysis-noCreator">
    <el-form :model="form" label-width="160px" class="formBlock">
      <el-row>
        <el-col :span="20">
          <el-form-item label="联合分析名称：">
            <span>{{form.name}}</span>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="起止日期：">
            <span>2017-12-16 至 2018-2-26</span>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="涉及分支机构：">
            <span v-for="(item,index) in form.branchValue" :key="index" style="margin: 0 10px">{{item}}</span>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="犯罪类型：">
            <span v-for="(item,index) in form.crimeValue" :key="index" style="margin: 0 10px">{{item}}</span>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="简介：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="附件：">
            <span>xxx文件</span>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="联系人：">
            xxx
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

    <div style="margin-bottom:30px">
      <div style="margin-bottom:10px">
        <strong>批量导入主体或账户信息</strong>
      </div>

      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="tableData" border>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="主体名称" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.subject}}</span>
                <!-- <el-input v-model="scope.row.subject"></el-input> -->
              </template>
            </el-table-column>
            <el-table-column prop="credType" label="证件类型" min-width="180">
              <template slot-scope="scope">
                <span>居民身份证或临时身份证</span>
                <!-- <el-select v-model="scope.row.credType.value" placeholder="请选择">
                  <el-option v-for="item in scope.row.credType.data" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
              </template>
            </el-table-column>
            <el-table-column prop="credNum" label="证件号码" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.credNum}}</span>
                <!-- <el-input v-model="scope.row.credNum"></el-input> -->
              </template>
            </el-table-column>
            <el-table-column prop="name" label="账户名称" min-width="180">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.name"></el-input> -->
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="bank" label="开户行" min-width="180">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.bank"></el-input> -->
                <span>{{scope.row.bank}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="branch" label="负责分析的分支行" min-width="180">
              <template slot-scope="scope">
                <span>{{scope.row.branch}}</span>
                <!-- <el-input v-model="scope.row.branch"></el-input> -->
              </template>
            </el-table-column>

          </el-table>

        </el-col>
      </el-row>
    </div>

    <div>
      <strong>联合分析成果</strong>
      <el-form label-width="160px">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="分支机构2：">
              <span>xxx文件</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="联系人：">
              <span>张三</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="分支机构3：">
              <span>xxx文件</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">

            <el-form-item label="联系人：">
              <span>张三</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="分支机构4：">
              <el-upload class="upload-demo" action="">
                <el-button size="small" type="primary" plain>点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">

            <el-form-item label="联系人：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="1">
            <el-form-item label="汇总联合分析结果：">

            </el-form-item>

          </el-col>
        </el-row>

      </el-form>

    </div>

    <div style="textAlign:center">
      <router-link :to="{name:'conjointAnalysis_list'}">
        <el-button type="primary" plain>提交</el-button>
      </router-link>
      <router-link :to="{name:'conjointAnalysis_list'}">
        <el-button type="primary" plain>关闭</el-button>
      </router-link>

      <el-button type="primary" plain>下载</el-button>
    </div>
  </div>
</template>

<script>
const branchsOptions = [
  { label: '分支机构1', value: '1' },
  { label: '分支机构2', value: '2' },
  { label: '分支机构3', value: '3' },
  { label: '分支机构4', value: '4' },
  { label: '分支机构5', value: '5' },
  { label: '分支机构6', value: '6' },
  { label: '分支机构7', value: '7' },
  { label: '分支机构8', value: '8' },
  { label: '分支机构9', value: '9' },
  { label: '分支机构10', value: '10' },
  { label: '分支机构11', value: '11' },
  { label: '分支机构12', value: '12' },
  { label: '分支机构13', value: '13' }
]
const crimeOptions = [
  { label: '关于xx类型的犯罪1', value: '1' },
  { label: '关于xx类型的犯罪2', value: '2' },
  { label: '关于xx类型的犯罪13', value: '3' },
  { label: '关于xx类型的犯罪14', value: '4' },
  { label: '关于xx类型的犯罪15', value: '5' },
  { label: '关于xx类型的犯罪16', value: '6' },
  { label: '关于xx类型的犯罪17', value: '7' }
]
export default {
  data() {
    return {
      form: {
        name: 'xxxx文件',
        date: '',
        branchValue: ['分支机构1', '分支机构2', '分支机构3'],
        branchOptions: branchsOptions,
        crimeValue: ['关于xx类型的犯罪1', '关于xx类型的犯罪2'],
        crimeOptions: crimeOptions,
        desc: '。。。。。。。。。。'
      },
      tableData: [
        {
          subject: '主体1',
          credType: {
            value: '1',
            data: [
              {
                value: '1',
                label: '居民身份证或临时身份证'
              },
              {
                value: '2',
                label: '军官或者武警身份证件'
              },
              {
                value: '3',
                label: '...'
              }
            ]
          },
          credNum: '222223232323',
          name: '张三',
          bank: 'xx开户行',
          branch: 'xx开户行'
        },
        {
          subject: '主体2',
          credType: {
            value: '1',
            data: [
              {
                value: '1',
                label: '居民身份证或临时身份证'
              },
              {
                value: '2',
                label: '军官或者武警身份证件'
              },
              {
                value: '3',
                label: '...'
              }
            ]
          },
          credNum: '1111111122323',
          name: '李四',
          bank: 'xx开户行',
          branch: 'xx开户行'
        },
        {
          subject: '主体3',
          credType: {
            value: '2',
            data: [
              {
                value: '1',
                label: '居民身份证或临时身份证'
              },
              {
                value: '2',
                label: '军官或者武警身份证件'
              },
              {
                value: '3',
                label: '...'
              }
            ]
          },
          credNum: '222232323232',
          name: '王五',
          bank: 'xx开户行',
          branch: 'xx开户行'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.conjointAnalysis-noCreator {
  .formBlock {
    margin-bottom: 20px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
