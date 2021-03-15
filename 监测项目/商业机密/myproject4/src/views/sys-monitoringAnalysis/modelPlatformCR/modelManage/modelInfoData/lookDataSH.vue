<template>
  <div class="lookDataSH">
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
                    <el-form-item label="模型类型：" >
                        <el-input v-model="form.asuspectOffenceType" disabled placeholder=""></el-input>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="">
                        <el-input v-if="form.asuspectOffenceType === '13其他类型（非法外汇买卖，涉嫌以积分换取高价值礼品、民间借贷等）'" disabled v-model="form.texatDescrip" type="textarea" :rows="2" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="this.$route.query.status === '审核通过'">
                <el-col :span="15">
                    <el-form-item label="预警范围：" >
                        <span>{{form.warningRang}}</span>
                    </el-form-item>
              </el-col>
            </el-row>
             <el-row v-if="this.$route.query.status !== '审核通过'">
                <el-col :span="15">
                  <span style="color: #F56C6C; font-size: 0.8em; height: 5px; position: absolute; margin-left: 168px; margin-top: 10px;">*</span>
                    <el-form-item label="预警范围：">
                      <el-button type="primary" disabled @click="checkYjRange">编 辑</el-button>
                    </el-form-item>
              </el-col>
            </el-row >
            <el-row v-if="this.warningData && this.$route.query.status !== '审核通过'">
                <el-col :span="15" style="margin-left:260px">
                    <el-tag v-for="(itme,index) in warningData"  :key="index"  style="margin:5px"> {{itme}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <div class="divider divider-dashed"></div>
              <div style="marginLeft:100px">
                  <span>模型释义</span>
              </div>
            <el-col :span="15">
              <el-form-item label="业务含义：" >
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="form.abusinessMeaning" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="15">
              <el-form-item label="特征说明：" >
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="form.acharacteristicsTha" disabled placeholder=""></el-input>
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
              <el-form-item label="外部文件：" v-if="this.form.aExternalFile.length > 0">
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
            <!-- <div class="divider divider-dashed"></div> -->
            <!-- <div style="marginLeft:100px">
                    <span>输出结果集</span>
            </div> -->
            <el-col :span="15">
              <el-form-item label="查看结果集：" >
                  <!-- <el-button type="primary" style="width: 104px" @click="dialogVisible = true">查看结果集</el-button> -->
                  <el-input v-model="form.resultSet" type="textarea" :rows="2" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="font-size: 12px; color:#F56C6C; margin: 10px 0 0 260px;">提示：此结果集展示了数据写录入到哪张Inceptor表。</el-row>
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
            <!-- <el-button v-if="this.$route.query.status !== '审核通过'" type="primary" :loading="rangerdisBtn" @click="baoCun">保存</el-button> -->
            <el-button  @click="routerBack">返回</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
    <el-dialog title="预警范围" :visible.sync="dialogDistributionVisible" width="80%">
      <el-form ref="allocatedDataSet" :model="allocatedDataSet" label-width="120px">
          <div>
            <el-row>
              <el-col :span="10">
                <div>
                  <el-tree ref="tree" :data="allocatedDataSet.dataVisible" @check="handleNodeClick"  default-expand-all show-checkbox node-key="id"  :props="defaultProps"></el-tree>
                </div>
              </el-col>
              <el-col :span="14">
                <el-transfer v-model="transferDataRange" :data="transferOptions" :props="{key: 'name',label: 'name'}"></el-transfer>
              </el-col>
            </el-row>
          </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="distriButionSure">确定</el-button>
        <el-button @click="distriButionConsole">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  viewAuditInformation,
  reViewDataRang,
  editRangerOrder
} from '@/api/sys-monitoringAnalysis/technologyModelCR/lookDataCollection'
import {
  doubletainCentratSets
} from '@/api/sys-monitoringAnalysis/taskManagement/modelWarning/modelWarning.js'
import { getToken } from '@/utils/auth'
import {
  addDataCentratSets,
  obtainCentratSets
} from '@/api/sys-monitoringAnalysis/modelInfoDataCR/submitExperiments'
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
        resultSet: '',
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
      dataFrom: [],
      allFileList: {},
      formExternalFile: [],
      warningData: [], // 展示预警范围数据-------------新增编辑功能
      dialogDistributionVisible: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      transferOptions: [],
      transferDataRange: [],
      allocatedDataSet: {
        dsId: '',
        dataName: '',
        dataVisible: []
      },
      contNumber: 0,
      doubleWaringData: [],
      // 编辑存储数据
      arrUpdata: [],
      arrDepartment: [],
      sectionNameData: '',
      // 组装预警范围所需数据
      departmentalData: [],
      selectedRange: [],
      proudectName: [],
      transWarningRangUser: [],
      // 重复点击
      rangerdisBtn: false
    }
  },
  computed: {
    ...mapGetters([
      //   'name',
      'roles'
    ])
  },
  created() {
    console.log(this.$route.query.status)
    if (this.$route.query.isView === '1') {
      this.onSubmit(this.$route.query.aId, this.$route.query.id)
    } else {
      this.getTreeData()
      this.getData()
    }
  },
  methods: {
    // 选择审核人员
    handleChange() {},
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    // 预警范围回显编辑
    checkYjRange() {
      this.dialogDistributionVisible = true
      // 处理回显预警范围数据新增
      this.$nextTick(function() {
        this.transferOptions = []
        this.transferDataRange = []
        this.$refs.tree.setCheckedKeys([])
        if (this.doubleWaringData.length > 0) {
          this.$refs.tree.setCheckedKeys(this.doubleWaringData)
          this.transferDataRange = this.arrUpdata
        } else {
          // this.proudectName
          this.returnWaringRange = this.arrDepartment
          this.$refs.tree.setCheckedKeys(this.returnWaringRange)
          this.transferDataRange = this.arrUpdata
        }
        this.certerData()
      })
    },
    // 回显中间数据方法
    certerData() {
      this.$nextTick(function() {
        if (this.$refs.tree.getCheckedKeys().length) {
          var arrString = this.$refs.tree.getCheckedKeys().join()
          // str,
          doubletainCentratSets(arrString).then(res => {
            if (res.code === 200) {
              this.selectedRange = res.data
              const data = res.data
              const arr = []
              for (var item in data) {
                for (let i = 0; i < data[item].length; i++) {
                  arr.push(data[item][i])
                }
              }
              this.transferOptions = arr
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
                duration: 6000,
                showClose: true
              })
            }
          })
        } else {
          this.transferOptions = []
          this.transferDataRange = []
        }
      })
    },
    // 获取部门Tree列表
    getTreeData() {
      var str = getToken()
      addDataCentratSets(str).then(res => {
        if (res.code === 200) {
          this.allocatedDataSet.dataVisible = JSON.parse(JSON.stringify(res.data.data))
        }
      })
    },
    // 获取已选用户的 userID
    getClassIdInfo(arrId) {
      doubletainCentratSets(arrId).then(res => {
        if (res.code === 200) {
          const checkedNode = this.transferDataRange
          const data = res.data
          const arr = []
          for (var item in data) {
            for (let i = 0; i < data[item].length; i++) {
              for (let j = 0; j < checkedNode.length; j++) {
                if (checkedNode[j] === data[item][i].name) {
                  arr.push(data[item][i].userId)
                }
              }
            }
          }
          this.transWarningRangUser = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
            duration: 6000,
            showClose: true
          })
        }
      })
    },
    // 数据可见范围的数据
    handleNodeClick(data) {
      var str = getToken()
      if (this.$refs.tree.getCheckedKeys().length) {
        var arrString = this.$refs.tree.getCheckedKeys().join()
        obtainCentratSets(str, arrString).then(res => {
          if (res.code === 200) {
            const data = res.data.data
            const arr = []
            for (var item in data) {
              for (let i = 0; i < data[item].length; i++) {
                arr.push(data[item][i])
              }
            }
            this.transferOptions = arr
          } else {
            this.$message({
              message: res.message,
              type: 'warning',
              duration: 6000,
              showClose: true
            })
          }
        })
      } else {
        this.transferOptions = []
        this.transferDataRange = []
      }
    },
    // 预警范围取消按钮
    distriButionConsole() {
      this.dialogDistributionVisible = false
    },
    // 预警范围确定按钮
    distriButionSure() {
      this.contNumber++
      this.dialogDistributionVisible = false
      this.doubleWaringData = this.$refs.tree.getCheckedKeys()
      this.arrUpdata = this.transferDataRange
      this.arrDepartment = this.returnWaringRange
      this.warningData = this.transferDataRange
      this.getClassIdInfo(this.$refs.tree.getCheckedKeys())
    },
    // 保存
    baoCun() {
      if (this.transferDataRange) {
        this.rangerdisBtn = true
        if (this.contNumber === 0) {
          const obj = {}
          obj.warningRang = this.form.warningRang
          obj.warningRangProduct = this.form.warningRangProduct
          obj.warningRangUser = this.form.warningRangUser
          obj.modelOnlyId = this.$route.query.modelOnlyId
          editRangerOrder(obj).then(res => {
            if (res.code === 200) {
              this.rangerdisBtn = false
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: 6000,
                showClose: true
              })
              this.$router.go(-1)
            } else {
              this.rangerdisBtn = false
              this.$message({
                message: res.message,
                type: 'error',
                duration: 6000,
                showClose: true
              })
            }
          })
            .catch(() => {
              this.rangerdisBtn = false
            })
        } else {
          // const strID = []
          const getproducter = this.$refs.tree.getCheckedKeys()
          // for (let i = 0; i < this.transferOptions.length; i++) {
          //   strID.push(this.transferOptions[i].userId)
          // }
          const obj = {}
          obj.warningRang = this.transferDataRange.join(',')
          obj.warningRangProduct = getproducter.join(',')
          obj.warningRangUser = this.transWarningRangUser.join(',')
          obj.modelKey = this.$route.query.modelKey ? this.$route.query.modelKey : ''
          obj.modelOnlyId = this.$route.query.modelOnlyId ? this.$route.query.modelOnlyId : ''
          editRangerOrder(obj).then(res => {
            if (res.code === 200) {
              this.rangerdisBtn = false
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: 6000,
                showClose: true
              })
              this.$router.go(-1)
            } else {
              this.rangerdisBtn = false
              this.$message({
                message: res.message,
                type: 'error',
                duration: 6000,
                showClose: true
              })
            }
          })
            .catch(() => {
              this.rangerdisBtn = false
            })
        }
      } else {
        this.$message({
          message: '请选择预警范围！',
          type: 'error',
          duration: 6000,
          showClose: true
        })
      }
    },

    onSubmit(a, b) {
      viewAuditInformation(a, b).then(res => {
        if (res.code === 200) {
          this.formExternalFile = []
          this.form = res.data[0]

          if (!(res.data[0].aexternalFile === '')) {
            const fileArrIfo = res.data[0].aexternalFile.split(',')
            const fileArrIfoId = res.data[0].noteId.split(',')
            this.allFileList = {}
            for (let index = 0; index < fileArrIfo.length; index++) {
              this.allFileList = {
                'name': fileArrIfo[index],
                'url': fileArrIfoId[index]
              }
              this.formExternalFile.push(this.allFileList)
            }
            this.form.aExternalFile = this.formExternalFile
          } else {
            this.form.aExternalFile = []
          }
        }
      })
    },
    getData() {
      if (this.$route.query.modelOnlyId === undefined) {
        viewAuditInformation(this.$route.query.aId, this.$route.query.modelOnlyId).then(res => {
          if (res.code === 200) {
            this.formExternalFile = []
            this.form = res.data[0]
            if (!this.form.adataSources) {
              this.form.adataSources = '无'
            }

            if (!(res.data[0].aexternalFile === '')) {
              const fileArrIfo = res.data[0].aexternalFile.split(',')
              const fileArrIfoId = res.data[0].noteId.split(',')
              this.allFileList = {}
              for (let index = 0; index < fileArrIfo.length; index++) {
                this.allFileList = {
                  'name': fileArrIfo[index],
                  'url': fileArrIfoId[index]
                }
                this.formExternalFile.push(this.allFileList)
              }
              this.form.aExternalFile = this.formExternalFile
            // this.form.aExternalFile = [
            //   {
            //     'name': res.data[0][0].aexternalFile,
            //     'url': res.data[0][0].noteId
            //   }
            // ]
            } else {
              this.form.aExternalFile = []
            }
            this.warningData = this.form.warningRang.split(',')
            this.arrUpdata = this.form.warningRang.split(',')
            this.arrDepartment = this.form.warningRangProduct.split(',')
            // switch (res.data[1].connType) {
            //   case 'jdbc':
            //     this.addDataSets.connId = '1'
            //     this.connectionjdbc = res.data[1]
            //     break
            //   case 'hbase':
            //     this.addDataSets.connId = '2'
            //     this.connectionhbase = res.data[1]
            //     break
            //   case 'hdfs':
            //     this.addDataSets.connId = '3'
            //     this.connectionhdfs = res.data[1]
            //     break
            //   case 'odps':
            //     this.addDataSets.connId = '4'
            //     this.connectionodps = res.data[1]
            //     break
            // }
            // this.getReView()
          }
        })
      } else {
        viewAuditInformation(this.$route.query.aId, this.$route.query.modelOnlyId).then(res => {
          if (res.code === 200) {
            this.formExternalFile = []
            this.form = res.data[0][0]
            if (!this.form.adataSources) {
              this.form.adataSources = '无'
            }

            if (!(res.data[0][0].aexternalFile === '')) {
              const fileArrIfo = res.data[0][0].aexternalFile.split(',')
              const fileArrIfoId = res.data[0][0].noteId.split(',')
              this.allFileList = {}
              for (let index = 0; index < fileArrIfo.length; index++) {
                this.allFileList = {
                  'name': fileArrIfo[index],
                  'url': fileArrIfoId[index]
                }
                this.formExternalFile.push(this.allFileList)
              }
              this.form.aExternalFile = this.formExternalFile
            // this.form.aExternalFile = [
            //   {
            //     'name': res.data[0][0].aexternalFile,
            //     'url': res.data[0][0].noteId
            //   }
            // ]
            } else {
              this.form.aExternalFile = []
            }
            this.warningData = this.form.warningRang.split(',')
            this.arrUpdata = this.form.warningRang.split(',')
            this.arrDepartment = this.form.warningRangProduct.split(',')
            // switch (res.data[1].connType) {
            //   case 'jdbc':
            //     this.addDataSets.connId = '1'
            //     this.connectionjdbc = res.data[1]
            //     break
            //   case 'hbase':
            //     this.addDataSets.connId = '2'
            //     this.connectionhbase = res.data[1]
            //     break
            //   case 'hdfs':
            //     this.addDataSets.connId = '3'
            //     this.connectionhdfs = res.data[1]
            //     break
            //   case 'odps':
            //     this.addDataSets.connId = '4'
            //     this.connectionodps = res.data[1]
            //     break
            // }
            // this.getReView()
          }
        })
      }
    },
    getReView() {
      reViewDataRang(this.form.apid, this.form.adataSources).then(res => {
        if (res.code === 200) {
          this.form.adataSources = res.data
        }
      })
    },
    handlePreview(file) {
      const str = encodeURI('模型平台(集研)')
      location.href = `/file-service/upload/download-file/${file.url}?moduleName=${str}&token=${getToken()}`
    },
    // 取消添加数据集
    cancelSetData(scope) {
      this.dialogVisible = false
    },
    hanldlChange(value) {
      // console.log('改变之后的值是:' + value)
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
      if (sessionStorage.getItem('mySophon')) {
        const obj = JSON.parse(sessionStorage.getItem('mySophon'))
        obj.comeOnBloar = false
        obj.twoCome = true
        sessionStorage.setItem('mySophon', JSON.stringify(obj))
        // this.$router.go(-1)
      }
      if (JSON.parse(sessionStorage.getItem('searchDataTechno'))) {
        const obj = JSON.parse(sessionStorage.getItem('searchDataTechno'))
        obj.ifReviewTechno = true
        sessionStorage.setItem('searchDataTechno', JSON.stringify(obj))
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.lookDataSH {
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
  .upload-demo {
    .el-upload--text {
      line-height: 0px !important;
    }
  }
  .divScroll{
    // height: 300px;
    margin:0 20px 0 0;
    overflow-y: auto;
  }
  .el-transfer-panel__body {
    .el-checkbox-group {
      .el-checkbox {
        margin-right: 56px;
      }
    }
  }
  .addFont {
    display: inline-block;
    font-size: 26px;
    vertical-align: bottom;
    margin-left: 5px;
  }
}
</style>
