<template>
  <div>
    <!-- <el-form-item :label="itemLabel" :label-width="lableWidth+'px'" class="item" prop="listWarnRangeDO">
      <template slot="label" v-if="!lableWidth">
        <span>选择机构</span>
        <el-button style="margin-left:10px" type="text" @click="openDialog">请选择</el-button>
      </template>
      <el-button v-if="lableWidth" type="text" @click="openDialog">请选择</el-button>
    </el-form-item> -->
    <!-- 预警范围 -->
    <!-- <el-dialog
      :title="itemLabel"
      :visible.sync="treeDialog"
      width="60%"
      class="tree-dialog"
      :append-to-body="inner"
    > -->
      <el-row class="tree-dialog">
        <el-col :span="8">
          <el-tree
            :props="props"
            :data="treeData"
            ref="tree"
            node-key="id"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
          ></el-tree>
                      <!-- show-checkbox -->
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col class="list source-list" :span="9">
              <div>
                <div class="title clearfix">
                  <el-checkbox
                    :indeterminate="source.isIndeterminate"
                    v-model="source.checkAll"
                    @change="sourceCheckAll"
                  >全选</el-checkbox>
                  <span
                    class="title-num"
                    style="float:right"
                  >{{source.checked.length+'/'+source.data.length}}</span>
                  <!-- <i class="el-icon-circle-plus-outline" @click="addTarget" style="cursor:pointer"></i> -->
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="user">
                  <el-checkbox-group v-model="source.checked" @change="sourceChange">
                    <el-checkbox
                      class="list-item"
                      v-for="(item,index) in source.data"
                      :disabled="item.diabled?true:false"
                      :label="item.userId"
                      :checked="item.diabled?true:false"
                      :key="index"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-col>
            <el-col class="transferButton" style="height: 350px;position: relative" :span="6">
              <div style="position:absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);">  
                <el-button @click="addTarget" type="primary"><span><i class="el-icon-arrow-right"></i></span></el-button>
                <br/>
                <el-button @click="removeTarget" style="margin-top:20px" type="primary"><span><i class="el-icon-arrow-left"></i></span></el-button>
              </div>
            </el-col>
            <el-col class="list target-list" :span="9">
              <div>
                <div class="title clearfix">
                  <el-checkbox
                    :indeterminate="target.isIndeterminate"
                    v-model="target.checkAll"
                    @change="targetCheckAll"
                  >全选</el-checkbox>
                  <span
                    class="title-num"
                    style="float:right"
                  >{{target.checked.length+'/'+target.data.length}}</span>
                  <!-- <i class="el-icon-remove-outline" @click="removeTarget" style="cursor:pointer"></i> -->
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="user">
                  <el-checkbox-group v-model="target.checked" @change="targetChange">
                    <el-checkbox
                      class="list-item"
                      v-for="(item,index) in target.data"
                      :label="item.userId"
                      :key="index"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" class="buttonGroup">
              <el-col :span="4" :offset="10">
                <el-button @click="closeTreeDialog">确定</el-button>
              </el-col>
              <el-col :span="4">
                <el-button @click="showParentComp(false)">取 消</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import { deptUser, getTree } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  props: {
    lableWidth: Number,
    type: String,
    inner: {
      type: Boolean,
      default: false
    },
    itemLabel: {
      type: String,
      default: '预警范围'
    },
    userArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      treeDialog: false,
      props: {
        label: 'text',
        children: 'children'
      },
      treeData: [],
      source: {
        // 源数据对象
        data: [], // 源数据
        checked: [], // 源数据选择项
        isIndeterminate: true,
        checkAll: false
      },
      target: {
        // 目标对象
        data: [], // 目标源数据
        checked: [], // 目标数据选择项
        isIndeterminate: true,
        checkAll: false
      },
      listWarnRangeDO: [], // 接口参数
      userParams: [], // 接口参数
      depParams: [] // 部门参数
    }
  },
  mounted() {
    this.openDialog()
  },
  methods: {
    clear(tag) {
      this.target.data.splice(this.target.data.indexOf(tag), 1)
      this.source.checked.splice(this.source.checked.indexOf(tag.userId), 1)
      this.target.checked.splice(this.target.checked.indexOf(tag.userId), 1)
      this.sourceChange(this.source.checked)
      this.targetChange(this.target.checked)
      this.source.data.forEach(element => {
        if (element.userId === tag.userId) {
          element.diabled = false
        }
      })
    },
    openDialog() {
      // this.listWarnRangeDO = []
      // this.target.data = []
      // this.treeDialog = true
      this.gettreeDep()
      this.propInit()
    },
    propInit() {
      // this.source.data = this.userArr
      this.target.data = this.userArr
      this.listWarnRangeDO = this.userArr
      console.log(this.userArr)
    },
    // 树形组件 - checkbox 事件
    handleCheckChange() {},
    // 树形组件 - 点击子节点 事件
    handleNodeClick(data) {
      this.getdeptUser(data)
    },
    // 子组件想父组件传值
    showParentComp(type) {
      if (type) {
        this.$emit('showParentComp', this.userParams)
      } else {
        this.$emit('showParentComp', [])
      }
    },
    // 树形组件 - 获取人员
    getdeptUser(params) {
      console.log(params)
      if (params.code !== 'root' && params.code !== 'center' && params.code !== 'branch') {
        deptUser({ deptId: params.id }).then(res => {
          if (res.code === 200) {
            res.data.forEach(itme => {
              itme.depId = params
            })
            const tempArr = []
            if (this.target.data.length > 0) {
              this.target.data.forEach(item => {
                res.data.forEach(item2 => {
                  if (item.userId === item2.userId) {
                    item2.diabled = true
                    tempArr.push(item.userId)
                  }
                })
              })
            }
            const length = res.data.length
            res.data.forEach(el => {
              el.nub = length
              el.code = params.code
              el.text = params.text
            })
            this.source.data = res.data
            this.source.checked = tempArr
          }
        })
      }
    },
    // 树形组件 -  获取部门
    gettreeDep() {
      if (this.treeData.length > 0) return
      getTree().then(res => {
        if (res.code === 200) {
          if (this.type === 'rule') {
            let children = {}
            for (let i = 0; i < res.data.children.length; i++) {
              if (res.data.children[i].text === '反洗钱中心') {
                children = res.data.children[i]
              }
            }
            res.data.children = []
            res.data.children.push(children)
          }
          this.treeData.push(res.data)
        }
      })
    },
    // 源数据点击  全选/取消
    sourceCheckAll(val) {
      if (val) {
        this.source.checked = this.source.data.map(item => {
          return item.userId
        })
      } else {
        const tempArr = []
        this.source.data.forEach(item => {
          if (item.diabled) {
            tempArr.push(item.userId)
          }
        })
        this.source.checked = tempArr
      }
      this.source.isIndeterminate = false
    },
    // 源数据点击选择
    sourceChange(value) {
      const checkedCount = value.length
      this.source.checkAll = checkedCount === this.source.data.length
      this.source.isIndeterminate = checkedCount > 0 && checkedCount < this.source.data.length
    },
    // 目标数据点击  全选/取消
    targetChange(value) {
      const checkedCount = value.length
      this.target.checkAll = checkedCount === this.target.data.length
      this.target.isIndeterminate = checkedCount > 0 && checkedCount < this.target.data.length
      if (value.length === 0) {
        this.target.isIndeterminate = true
      }
    },
    // 目标数据点击选择
    targetCheckAll(val) {
      this.target.checked = val
        ? this.target.data.map(item => {
          return item.userId
        })
        : []
      this.target.isIndeterminate = false
    },
    // 源数据添加道目标对象中
    addTarget() {
      var flag = false
      this.source.checked.forEach(item => {
        this.source.data.forEach((itme2, index2) => {
          if (itme2.userId === item) {
            flag = false
            if (this.target.data.length > 0) {
              this.target.data.forEach(item3 => {
                if (item3.userId === itme2.userId) {
                  flag = true
                }
              })
            }
            if (!flag) {
              const obj = JSON.parse(JSON.stringify(itme2))
              this.target.data.push(obj)
              obj.diabled = true
              this.source.data.splice(index2, 1, obj)
            }
          }
        })
      })
    },
    // 从目标对象中删除
    removeTarget() {
      if (this.target.checked.length > 0) {
        this.target.checked.forEach(item => {
          this.target.data.forEach((item2, index2) => {
            if (item === item2.userId) {
              this.source.data.forEach((item3, index3) => {
                if (item3.userId === item) {
                  item3.diabled = false
                  this.source.data.splice(index3, 1, item3)
                }
              })
              this.target.data.splice(index2, 1)
            }
          })
        })
      }
    },
    // 关闭预警范围弹窗----获取接口数据
    closeTreeDialog() {
      this.listWarnRangeDO = []
      // var temArr = this.$refs.tree.getCheckedNodes()
      var temUsers = this.target.data
      if (temUsers.length !== 0) {
      //   // 获取部门
      //   if (temArr.length > 0) {
      //     temArr.forEach(item => {
      //       var temObj = {}
      //       temObj.id = item.id
      //       temObj.rangeName = item.text
      //       temObj.rType = 'dept'
      //       item.rType = 'dept'
      //       this.listWarnRangeDO.push(temObj)
      //       this.depParams.push(item)
      //     })
      //   }
        // 获取人员
        if (temUsers.length > 0) {
          this.userParams = []
          temUsers.forEach(item => {
            var obj = {}
            obj.id = item.userId
            obj.rangeName = item.name
            obj.rType = 'user'
            item.rType = 'user'
            this.listWarnRangeDO.push(obj)
            this.userParams.push(item)
            // this.showParentComp()
          })
        }
        console.log(this.depParams)
        const type = true
        this.showParentComp(type)
        this.treeDialog = false
      } else {
        this.$message('请至少选择一条数据')
        const type = false
        this.showParentComp(type)
      }
    }
  }
}
</script>
<style lang="scss">
.organization-tree {
  .tree-dialog {
    .list {
      height: 350px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      max-height: 100%;
      box-sizing: border-box;
      position: relative;
      .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        margin: 0;
        padding-left: 15px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        color: #000;
        .title-num {
          position: absolute;
          right: 15px;
          color: #909399;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .user {
        margin: 0;
        padding: 6px 0;
        list-style: none;
        height: 294px;
        overflow: auto;
        box-sizing: border-box;
        .el-checkbox {
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
          display: block;
          margin-left: 0;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
.buttonGroup {
  margin-top: 50px;
}
</style>
