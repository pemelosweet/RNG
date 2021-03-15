<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>项目信息</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div class="text item">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="handleCreate" plain>添加</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" style="width: 100%">
        <el-table-column prop="num" label="序号" width="60">
          <template slot-scope="scope">
            <span>{{scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="150">
          <template slot-scope="scope">
            <router-link :to="{ name: 'dataHandl_projectProcedures' }"><el-button type="text" size="small">{{scope.row.name }}</el-button></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="项目描述"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="150"></el-table-column>
        <el-table-column prop="updater" label="修改人" width="150"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | parseTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="修改时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.updateDate | parseTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>

  <el-dialog title="新建项目" :visible.sync="centerDialogVisible" center>
    <el-form :rules="rules" ref="dataForm" :model="project" label-width="120px">
      <el-form-item label="项目名称：">
        <el-input v-model="project.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：">
        <el-input type="textarea" v-model="project.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  component() {
    parseTime
  },
  data() {
    return {
      project: {
        num: '',
        name: '',
        desc: '',
        creater: '',
        updater: '',
        createDate: new Date(),
        updateDate: new Date()
      },
      centerDialogVisible: false,
      dialogStatus: '',
      list: [],
      listLoading: true,
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        desc: [{ required: true, message: '描述不能为空', trigger: 'change' }]
      }
    }
  },
  filters: {
    parseTime(time) {
      var date = new Date(time)
      return parseTime(date, '{y}-{m}-{d} {h}:{i}')
    }
  },
  methods: {
    handleCreate() {
      this.resetProject()
      this.dialogStatus = 'create'
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetProject() {
      this.project = {
        num: '',
        name: '',
        desc: '',
        creater: '分析员001',
        updater: '分析员001',
        createDate: new Date(),
        updateDate: new Date()
      }
    },
    handleUpdate(row) {
      this.project = Object.assign({}, row) // copy obj
      // this.project.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // updateArticle(tempData).then(() => {
          for (const v of this.list) {
            if (v.num === this.project.num) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.project)
              break
            }
          }
          this.centerDialogVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          // })
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.list.unshift(this.project)
          this.centerDialogVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }

}
</script>
