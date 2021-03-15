<template>
  <div class="dataLifecycle_hadle">
    <el-form :model="form">
      <div class="searchContainer">
        <el-row>
          <el-col :span="10">
            <el-form-item label="迁移时间：" label-width="100px">
              <el-date-picker
                v-model="form.value3"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                unlink-panels
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="textAlign:right">
            <el-button type="primary" @click="showTable=true">开始迁移</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="迁移方式：" label-width="100px">
              <el-radio-group v-model="form.radio">
                <el-radio label="在线归档"></el-radio>
                <el-radio label="离线归档"></el-radio>
                <el-radio label="在线恢复"></el-radio>
                <el-radio label="离线恢复"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
          <el-form-item label="数据表选择：" label-width="100px"></el-form-item>
          <el-col :span="18" :offset="3">
            <el-transfer
              v-model="value4"
              filterable
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :button-texts="['到左边', '到右边']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              @change="handleChange"
              :data="data">
            </el-transfer>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="list" v-if="showTable">
      <el-table :data="tableData">
        <el-table-column label="表名" prop="name"></el-table-column>
        <el-table-column label="迁移方式" prop="type"></el-table-column>
        <el-table-column label="执行状态" prop="state"></el-table-column>
        <el-table-column label="执行时间" prop="time"></el-table-column>
        <el-table-column label="迁移数据量" prop="number"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
     
    </div>


  </div>
</template>

<script>
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
        console.log(data)
        return data
      }
      return {
        form: {
          value3: '',
          radio: ''
        },
        data: generateData(),
        value4: [],
        tableData: [
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          },
          {
            name: 'A02145',
            type: '在线归档',
            state: ' 未开始',
            time: '50s',
            number: '2000'
          }
        ],
        currentPage: 1,
        showTable: false
      }
    },
  
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
  
</script>

<style lang="scss">
.dataLifecycle_hadle{
  .el-date-editor{
    width: 420px
  }
 
  
}


</style>