<template>
  <div>
    <!-- <div style="textAlign:right">
      <el-button type="primary" plain>导出excel</el-button>
    </div> -->
    <el-table :data="tableData" width="100%" tooltip-effect="dark">
      <template v-for="(column, index) in columnData">
        <el-table-column v-if="column.type" :label="column.label" :key="index" type="index" :width="column.width"></el-table-column>
        <el-table-column v-else-if="column.operations" :label="column.label" :prop="column.prop" :key="index" :width="column.width" :min-width="column.minWidth" :formatter="column.formatter" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button v-for="(operate, index) in item.operations" :key="index">{{operate.label}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter" :key="index">
        </el-table-column>
      </template>
    </el-table> 
{{info.pageNum}}
       <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="info.pageNum"
              :page-size="info.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30, 40]"
              :total="info.total"
              background
            ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    columnData: {
      type: Array,
      default: []
    },
    pageInfo: {
      type: Object
    }
  },
  data() {
    return {
      // info: {
      // }
    }
  },
  computed: {
    info() {
      console.log(this.pageInfo)
      return this.pageInfo
    }
  },
  methods: {
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.$emit('childByValue', this.pageInfo)
    },
    // 点击切换分页
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.$emit('childByValue', this.pageInfo)
    }
  },
  created() {
    // console.log(this.tableData === [])
    this.info()
  }
}
</script>

<style scoped>

</style>