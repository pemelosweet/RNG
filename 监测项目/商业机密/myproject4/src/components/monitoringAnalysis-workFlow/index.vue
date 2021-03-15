<template>
  <div class="work-flow-dialog">
    <el-dialog
      :visible.sync="dialogVisble"
      @open="openWorkFlow"
      width="70%"
    >
      <el-form>
        <el-row>
          <el-col :span="8">
            <span>下一节点：</span>
            <div class="next-node">
              <el-radio-group v-model="nextNode">
                <el-radio
                  v-for="(item,index) in nextNodeData"
                  :key="index"
                  :label="item.actDefId"
                  @change="getNextUsers(item)"
                >{{item.actDefName}}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="16">
            <el-transfer
              v-model="userChecked"
              :data="userData"
              :props="{key: 'orgId',label: 'orgName'}"
              :titles="['候选','已选']"
              :render-content="renderFunc"
              :format="{
      noChecked: ' ',
      hasChecked: ' '
    }"
            ></el-transfer>
          </el-col>
        </el-row>
        <el-form-item
          label="审批结果"
          v-if="this.isFist"
          label-width="80px"
        >
          <el-radio-group
            v-model="isAgree"
            @change="changeResult"
          >
            <el-radio label="Y">同意</el-radio>
            <el-radio label="N">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="审批意见"
          label-width="80px"
          style="margin-top:30px"
          v-if="this.isFist"
        >
          <el-input
            maxlength="100"
            v-model="opinion"
            placeholder="请输入审批意见,最多输入100字符"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        solt="footer"
        style="text-align:center;margin-top:30px"
      >
        <el-button
          type="primary"
          @click="submit"
          :loading="loading"
        >提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getNext, getUsers } from '@/api/sys-monitoringAnalysis/workFlow/index.js'

export default {
  data() {
    return {
      flag: 0,
      userData: [],
      userChecked: [], // 已选择的人员
      loading: false,
      nextNodeData: [],
      nextNode: '',
      users: [],
      parmarsUser: {
        // 获取人员参数
        configId: '',
        proDirId: '',
        actDefId: '',
        nextProDirId: '',
        nextActDefId: '',
        actDefPath: ''
      },
      renderFunc(h, option) {
        return <span>{option.orgName} </span>
      },
      isAgree: 'Y', // 审批结果
      opinion: '' // 审批意见
    }
  },

  computed: {
    // 获取业务传来的参数
    ...mapGetters(['formContent', 'business2workFlow', 'dialog']),
    // 下一个节点参数
    nextNodeParams() {
      console.log('业务', this.business2workFlow)
      const obj = JSON.parse(JSON.stringify(this.business2workFlow))
      obj.isAgree = this.isAgree
      delete obj.ricd
      // delete obj.name
      return obj
    },

    dialogVisble: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$store.dispatch('openWorkFlow', val)
      }
    },
    // 提交参数
    submitParams() {
      const obj = Object.assign({}, this.business2workFlow, this.parmarsUser)
      obj.proInstId = this.business2workFlow.proInstId
      obj.workitemId = this.business2workFlow.workitemId
      obj.actInstId = this.business2workFlow.actInstId
      console.log('submitParams', obj)
      return obj
    },
    // 是否第一次调取工作流
    isFist() {
      if (this.formContent.workflow) {
        if (this.formContent.workflow.nodeAttributes.length > 0) {
          this.formContent.workflow.nodeAttributes.forEach(el => {
            if (el.extendKey === 'seeAppOptions') {
              this.flag++
            }
          })
        }
      }
      return this.business2workFlow.configId && this.flag === 0
    }
  },
  watch: {
    dialogVisble() {
      this.openWorkFlow()
    }
  },
  methods: {
    openWorkFlow() {
      this.nextNode = ''
      this.userData = []
      this.opinion = ''
      this.userChecked = [] // 已选择的人员
      this.getNextNode()
    },

    // 获取下一个节点
    getNextNode() {
      this.loading = false
      getNext(this.nextNodeParams).then(res => {
        if (res.code === 200) {
          const obj = res.data
          this.nextNodeData = obj.nextActDefIds
          this.parmarsUser.configId = obj.configId
          this.parmarsUser.proDirId = obj.proDirId
          this.parmarsUser.actDefId = obj.actDefId
          // this.submitParams.actInstId = obj.actInstId
        }
      })
    },
    // 获取人员
    getNextUsers(ele) {
      // 获取参数
      this.parmarsUser.nextActDefId = ele.actDefId
      this.parmarsUser.nextProDirId = ele.proDirId
      this.parmarsUser.actDefPath = ele.actDefPath
      sessionStorage.setItem('actDefName', ele.actDefName) // 节点名称
      // 宏观分析需要多加的三个值。
      // if (sessionStorage.getItem('formId') === 'mpReportManagement') {
      //   this.parmarsUser.proInstId = this.business2workFlow.proInstId
      //   this.parmarsUser.actInstId = this.business2workFlow.actInstId
      //   this.parmarsUser.workitemId = this.business2workFlow.workitemId
      // }
      this.parmarsUser.proInstId = this.business2workFlow.proInstId
      this.parmarsUser.actInstId = this.business2workFlow.actInstId
      this.parmarsUser.workitemId = this.business2workFlow.workitemId
      this.parmarsUser.ricd = this.business2workFlow.ricd

      // 调取接口
      if (ele.actDefId.indexOf('WFSTUDIO_GRAPH_END') === -1) {
        getUsers(this.parmarsUser).then(res => {
          if (res.code === 200) {
            const obj = res.data
            const arr = []
            obj.resourceIds.forEach(el => {
              if (el !== null) {
                arr.push(el)
              }
            })
            this.userData = arr
            // console.log(this.userData)
            // console.log('赋值成功')
            // this.$forceUpdate()
            // console.log('强制渲染')
          }
        })
        this.isOver = false
      } else {
        this.isOver = true
      }
    },

    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys)
    },
    // 切换审批结果
    changeResult(val) {
      this.nextNode = ''
      if (val === 'N') {
        this.userData = []
        this.userChecked = []
      }
      this.getNextNode()
    },
    // 提交
    submit() {
      const arr = []
      this.userChecked.forEach(item => {
        this.userData.forEach(item2 => {
          if (item === item2.orgId) {
            arr.push(`${item2.orgType}:${item2.orgId}`)
          }
        })
      })

      this.$emit('userInformation', arr)
      const obj = JSON.parse(JSON.stringify(this.submitParams))
      obj.nextUser = arr.join()
      if (this.nextNode) {
        this.loading = true
        if (this.isOver) {
          this.loading = false
          obj.opinion = this.opinion
          obj.isAgree = this.isAgree
          this.dialogVisble = false
          this.$store.dispatch('business', obj)
          this.$store.dispatch('changeFlag', true)
          return
        }
        if (this.isAgree === 'Y') {
          if (this.userChecked.length > 0) {
            obj.opinion = this.opinion
            obj.isAgree = this.isAgree
            if (this.isFist) {
              this.loading = true
              this.dialogVisble = false
              this.$store.dispatch('business', obj)
              this.$store.dispatch('changeFlag', true)
            } else {
              this.loading = true
              this.dialogVisble = false
              this.$store.dispatch('business', obj)
              this.$store.dispatch('changeFlag', true)

              // this.$emit('workFlow_submit', obj)
            }
          } else {
            this.$message({
              message: '人员节点必须选择！',
              type: 'warning'
            })
            this.loading = false
          }
        } else {
          obj.opinion = this.opinion
          obj.isAgree = this.isAgree
          this.dialogVisble = false
          this.$store.dispatch('business', obj)
          this.$store.dispatch('changeFlag', true)
        }
      } else {
        this.$message({
          message: '节点必须选择！',
          type: 'warning'
        })
      }
    },
    onCancel() {
      // this.$store.commit('this.business2workFlow', null)
      // console.log('business2workFlow', this.business2workFlow)
      this.dialogVisble = false
    }
  }
}
</script>
<style lang="scss">
.work-flow-dialog {
  .el-transfer-panel {
    width: 230px;
  }
  .el-radio-group label {
    margin-left: 30px;
    margin-bottom: 10px;
  }
  .next-node {
    .el-radio-group {
      display: block;
      margin: 18px;
      .el-radio {
        display: block;
      }
    }
  }
  .el-transfer-panel__list {
    padding-right: 65px;
  }
}
</style>

