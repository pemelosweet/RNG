<template>
  <div class="auditDetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提交审核</span>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="260px" >
            <el-row>
                <el-col :span="15">
                    <el-form-item label="名称：" >
                        <el-input v-model="form.aname" disabled placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="疑似涉罪类型：" >
                        <el-input v-model="form.asuspectOffenceType" disabled placeholder=""></el-input>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="预警范围：" >
                        <span>{{form.warningRang}}</span>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="divider divider-dashed"></div>
              <div style="marginLeft:100px">
                  <span>模型释义</span>
              </div>
            <el-col :span="15">
              <el-form-item label="业务含义：" >
                <el-input v-model="form.abusinessMeaning" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="15">
              <el-form-item label="特征说明：" >
                <el-input v-model="form.acharacteristicsTha" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="15">
              <el-form-item label="预估预警率：" >
                <el-input v-model="form.awarningRate" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="数据来源：" >
                  <span>{{form.adataSources}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="外部文件：" >
                <el-upload class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="form.aExternalFile"
                :on-preview="handlePreview"
                disabled>
                  <el-button size="small" type="primary" disabled>点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider divider-dashed"></div>
            <div style="marginLeft:100px">
                    <span>输出结果集</span>
            </div>
            <el-col :span="15">
              <el-form-item label="查看结果集：" >
                  <!-- <el-button type="primary" style="width: 104px" @click="dialogVisible = true">查看结果集</el-button> -->
                  <el-input v-model="form.alistName" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="divider divider-dashed"></div>
          <div>
            <div style="marginLeft:100px">
              <span>运行周期</span>
            </div>
            <el-col :span="15">
              <el-form-item label="表达式：">
                  <el-input v-model="form.acycleOfRun"  disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </div>
          <el-row>
            <el-col :span="15">
            </el-col>
          </el-row>
          <!-- <div class="divider divider-dashed"></div>
          <div>
            <div style="marginLeft:100px">
              <span>审核设置</span>
            </div>
          <el-row>
            <el-col :span="15">
              <el-form-item label="人员：">
                  <span>{{form.aaudit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
          <div class="divider divider-dashed"></div> -->

          <el-form-item style="marginLeft:-260px;textAlign:center">
            <el-button type="primary" @click="routerBack">返回</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
    <!-- 添加数据集 -->
    <el-dialog title="查看输出结果集" :visible.sync="dialogVisible" width="50%" top="10vh" class="addDataTeam">
      <el-form ref="addDataSets" :model="addDataSets" label-width="120px" disabled>
        <el-form-item label="连接类型：" >
                    <template>
                        <el-select v-model="addDataSets.connId" style="width:100%" placeholder="请选择" :disabled="!ifadd">
                            <el-option  label="jdbc" value="1"></el-option>
                            <el-option  label="hbase" value="2"></el-option>
                            <el-option  label="hdfs" value="3"></el-option>
                            <el-option  label="odps" value="4"></el-option>
                        </el-select>
                    </template>
        </el-form-item>
      </el-form>
        <div v-show="this.addDataSets.connId=== '1'">
            <el-form ref="connectionjdbc" :model="connectionjdbc" label-width="120px" disabled :rules="jdbcRules">
                <el-form-item label="驱动：" prop="connDrive">
                    <template>
                        <el-select v-model="connectionjdbc.connDrive" style="width:100%" placeholder="请选择">
                           <el-option  label="inceptor-5.1.0" value="hive2"></el-option>
                            <el-option  label="MySQL" value="mysql"></el-option>
                            <el-option  label="db2jcc4" value="db2"></el-option>
                            <el-option  label="oracle6" value="oracle:thin"></el-option>
                            <el-option  label="sqlserver41" value="sqlserver"></el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="地址：" prop="connAddress">
                    <el-input v-model="connectionjdbc.connAddress" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="端口：" prop="connPort">
                    <el-input v-model="connectionjdbc.connPort" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="数据库名称：" prop="connDatabase">
                    <el-input v-model="connectionjdbc.connDatabase" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="目标表名：" prop="connTableName">
                    <el-input v-model="connectionjdbc.connTableName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="数据库链接：">
                    <el-input disabled v-model="connectionjdbc.connUrl" placeholder="">
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="是否远程集群：">
                    <el-switch  v-model="connectionjdbc.jdbcRemoteCluster"  active-color="#409EFF"  inactive-color="#dcdfe6"></el-switch>
                </el-form-item>
                <el-form-item label="NameNodes：" v-if="connectionjdbc.jdbcRemoteCluster">
                    <el-input v-model="connectionjdbc.nameNodes" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="port：" v-if="connectionjdbc.jdbcRemoteCluster">
                    <el-input v-model="connectionjdbc.port" placeholder=""></el-input>
                </el-form-item> -->
                    <el-form-item label="用户名：" prop="connUsername">
                    <el-input v-model="connectionjdbc.connUsername" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="connPassword">
                    <el-input v-model="connectionjdbc.connPassword" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="testDataConnact">测试</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div v-show="this.addDataSets.connId=== '2'">
            <el-form ref="connectionhbase" :model="connectionhbase" label-width="120px" disabled :rules="hbaseRules">
                <el-form-item label="名称：" prop="hbaseName">
                <el-input v-model="connectionhbase.hbaseName"></el-input>
                </el-form-item>
                <el-form-item label="nameSpace：" prop="hbaseNamespace">
                <el-input type="textarea" v-model="connectionhbase.hbaseNamespace"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="testDataConnact">测试</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div v-show="this.addDataSets.connId=== '3'">
            <el-form ref="connectionhdfs" :model="connectionhdfs" disabled label-width="120px" :rules="hdfsRules">
                <el-form-item label="名称：" prop="hdfsName">
                <el-input v-model="connectionhdfs.hdfsName"></el-input>
                </el-form-item>
                <el-form-item label="是否远程集群：">
                    <el-switch  v-model="connectionhdfs.hdfsRemoteCluster"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <el-form-item label="NameNodes：" v-if="connectionhdfs.hdfsRemoteCluster" prop="hdfsNameNodes">
                    <el-input v-model="connectionhdfs.hdfsNameNodes" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="port：" v-if="connectionhdfs.hdfsRemoteCluster" prop="hdfsPort">
                    <el-input v-model="connectionhdfs.hdfsPort" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="testDataConnact">测试</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div v-show="this.addDataSets.connId=== '4'">
            <el-form ref="connectionodps" :model="connectionodps" disabled label-width="120px"
            :rules="nodpsRules">
                <el-form-item label="名称：" prop="odpsName">
                    <el-input v-model="connectionodps.odpsName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="项目名称：" prop="odpsProjectName">
                    <el-input v-model="connectionodps.odpsProjectName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="驱动：" prop="odpsDrive">
                    <template>
                        <el-select v-model="connectionodps.odpsDrive" placeholder="请选择">
                            <el-option  label="inceptor-5.1.0" value="hive2"></el-option>
                            <el-option  label="MySQL" value="mysql"></el-option>
                            <el-option  label="db2jcc4" value="db2"></el-option>
                            <el-option  label="oracle6" value="oracle:thin"></el-option>
                            <el-option  label="sqlserver41" value="sqlserver"></el-option>

                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="目标表名：" prop="odpsAdditional">
                    <el-input v-model="connectionodps.odpsAdditional" placeholder=""></el-input>
                </el-form-item>
                    <el-form-item label="数据库链接：">
                    <el-input disabled v-model="connectionodps.odpsDbConnection" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Access Id："  prop="odpsAccessId">
                    <el-input v-model="connectionodps.odpsAccessId" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="Access Key"  prop="odpsAccessKey">
                    <el-input v-model="connectionodps.odpsAccessKey" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="testDataConnact">测试</el-button> -->
                </el-form-item>
            </el-form>
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cancelSetData" >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  viewAuditInformation,
  reViewDataRang
} from '@/api/sys-monitoringAnalysis/technologyModel/lookDataCollection'
import { getToken } from '@/utils/auth'
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `银行大额交易 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      value1: '',
      value3: '',
      value4: '',
      value5: [],
      data: generateData(),
      checkbox: [],
      form: {
        name: '',
        descriptionInfo: '',
        businessMeaning: '',
        alistName: '',
        characteristics: '',
        estimatedWarning: '',
        dataSource: '',
        externalFiles: '',
        tableName: '',
        tableStructure: '',
        activeName: '',
        aExternalFile: [
        ],
        token: getToken()
      },
      // 添加数据集
      addDataSets: {
        taskId: '',
        dataModelName: '',
        connId: '',
        dsId: ''
      },
      dialogVisible: false,
      // 连接类型的四个字段
      connectionjdbc: {
        jdbcConnType: '',
        connDrive: '',
        connAddress: '',
        connPort: '',
        connUrl: '',
        connDatabase: '',
        connTableName: '',
        connUsername: '',
        connPassword: ''
      },
      jdbcRules: {
        connDrive: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        connAddress: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        connPort: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        connDatabase: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        connTableName: [
          { required: false, message: '内容不能为空', trigger: 'blur' }
        ],
        // nameNodes: '',
        // port: '',
        connUsername: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        connPassword: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      connectionhbase: {
        hbaseConnType: '',
        hbaseName: '',
        hbaseNamespace: ''
      },
      hbaseRules: {
        hbaseName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        hbaseNamespace: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      connectionhdfs: {
        hdfsConnType: '',
        hdfsName: '',
        hdfsRemoteCluster: false,
        hdfsNameNodes: '',
        hdfsPort: ''
      },
      hdfsRules: {
        hdfsName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        hdfsNameNodes: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        hdfsPort: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      connectionodps: {
        odpsConnType: '',
        odpsName: '',
        odpsProjectName: '',
        odpsDrive: '',
        odpsAdditional: '',
        odpsDbConnection: '',
        odpsAccessId: '',
        odpsAccessKey: ''
      },
      nodpsRules: {
        odpsName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        odpsProjectName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        odpsDrive: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        odpsAdditional: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        odpsDbConnection: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        odpsAccessId: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        odpsAccessKey: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      connMessageData: {},
      ifadd: true,
      ifRun: false,
      dataFrom: []
    }
  },
  computed: {
    ...mapGetters([
      //   'name',
      'roles'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    // 选择审核人员
    handleChange() {},
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmit() {
    },
    getData() {
      viewAuditInformation(this.$route.query.aId).then(res => {
        if (res.code === 200) {
          this.form = res.data[0][0]

          if (!(res.data[0][0].aexternalFile === '')) {
            this.form.aExternalFile = [{
              'name': res.data[0][0].aexternalFile,
              'url': res.data[0][0].noteId
            }]
          } else {
            this.form.aExternalFile = []
          }
          this.getReView()
        }
      })
    },
    getReView() {
      reViewDataRang(this.form.apid, this.form.adataSources).then(res => {
        if (res.code === 200) {
          this.form.adataSources = res.data
        }
      })
    },
    handlePreview(file) {
      location.href = `/file-service/upload/download-file/${file.url}?token=${getToken()}`
    },
    // 取消添加数据集
    cancelSetData(scope) {
      this.dialogVisible = false
    },
    hanldlChange(value) {
      console.log('改变之后的值是:' + value)
      if (value === 3) {
        this.autoRun = true
        this.regular = !this.regular
      } else if (value === 6) {
        this.regular = true
        this.autoRun = !this.autoRun
      }
    },
    addDomain() {
      this.domains.unshift({
        value: '',
        key: Date.now()
      })
    },
    removeDomain(item, index) {
      if (index > 0) {
        this.domains.splice(index, 1)
      }
    },
    toggle1() {

    },
    toggle2() {
      this.isShow1 = false
      this.isShow2 = true
    },
    routerBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.auditDetail {
  .card-center {
    text-align: center;
  }
  .card-header {
    .el-card__header {
      padding: 0px 20px;
    }
  }
  .dataVisible {
    height: 20vh;
    overflow-y: auto;
  }
  .addFont {
    display: inline-block;
    font-size: 26px;
    vertical-align: bottom;
    margin-left: 5px;
  }
}
</style>
