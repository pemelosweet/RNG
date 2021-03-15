<template>
    <div class="institutional-department">
        <!-- 预警范围 -->
        <el-dialog :title="itemLabel" :visible.sync="treeDialog" class="tree-dialog" :append-to-body="inner" @open="openDialog">
            <el-row>
                <el-col :span="12">
                    <el-tree :props="props" :data="treeData" ref="tree" node-key="id" @node-click="handleNodeClick">
                    </el-tree>
                </el-col>
                <el-col :span="12">
                    <div class="list source-list">
                        <div class="title clearfix">
                            已选择：
                            <el-button type="text">{{checkedUser}}</el-button>
                        </div>
                        <div style="margin: 15px 0;"></div>
                        <div class="user">
                            <el-radio-group v-model="source.checked">
                                <div v-for="(item,index) in source.data" :key="index" @click="getUserName(item)" class="">
                                    <el-radio :label="item.userId">{{item.name}}</el-radio>
                                </div>
                            </el-radio-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button>取消</el-button>
            </div>

        </el-dialog>

    </div>

</template>
<script>
import { tree, deptUser } from '@/api/sys-monitoringAnalysis/roster-warning/common.js'
export default {
  props: {
    lableWidth: Number,
    inner: {
      type: Boolean,
      default: false
    },
    itemLabel: {
      type: String,
      default: '机构部门'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //   treeDialog: false,
      props: {
        label: 'text',
        children: 'children'
      },
      treeData: [],
      source: {
        // 源数据对象
        data: [], // 源数据
        checked: '' // 源数据选择项
      },
      checkedUser: ''
    }
  },
  computed: {
    treeDialog: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  methods: {
    openDialog() {
      this.gettreeDep()
    },

    // 树形组件 - 点击子节点 事件
    handleNodeClick(data) {
      this.getdeptUser(data.id)
    },
    // 树形组件 - 获取人员
    getdeptUser(params) {
      deptUser({ deptId: params }).then(res => {
        if (res.code === 200) {
          this.source.data = res.data
        }
      })
    },
    // 树形组件 -  获取部门
    gettreeDep() {
      if (this.treeData.length > 0) return
      tree().then(res => {
        if (res.code === 200) {
          this.treeData.push(res.data)
        }
      })
    },
    getUserName(obj) {
      this.checkedUser = obj.name
    },
    // 确定
    confirm() {
      this.$emit('click', this.source.checked)
    }
  }
}
</script>
<style lang="scss">
.institutional-department {
  .tree-dialog {
    .list {
      height: 350px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      width: 200px;
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
        .el-radio-group {
          display: block;
          .el-radio {
            display: block;

            height: 30px;
            line-height: 30px;
            padding-left: 15px;

            margin-left: 0;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
