<template>
  <div class="home-feedback-statistics">
    <el-card>
      <div slot="header">
        <i class="title-mark" style="background:#7f9ce0"></i>
        <span style="vertical-align:middle;font-weight:bold;">报送反馈统计</span>
      </div>
      <el-table :data="data">
        <el-table-column label="类别" prop="type" min-width="100"></el-table-column>
        <el-table-column label="T-3日新增" prop="threedaysnum" min-width="100"></el-table-column>
        <el-table-column label="T-2日新增" prop="twodaysnum" min-width="100"></el-table-column>
        <el-table-column label="T-1日新增" prop="onedaynum" min-width="100"></el-table-column>
        <el-table-column v-if="!isCommonOther" :label="`${currentMonth}月未处理`" prop="monthnum" min-width="100">
          <template slot-scope="scope">
            {{scope.row.monthnum===0?'0':(scope.row.monthnum?scope.row.monthnum:'-')}}
          </template>
        </el-table-column>
        <el-table-column v-if="!isCommonOther" label="近30日未处理" prop="thirtydaysnum" min-width="120">
          <template slot-scope="scope">
            {{scope.row.thirtydaysnum===0?'0':(scope.row.thirtydaysnum?scope.row.thirtydaysnum:'-')}}
          </template>
        </el-table-column>
      </el-table>
      
    </el-card>

  </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['roles']),

    isCommonOther() {
      const permissionRoles = [this.GLOBAL.ROLE_REPORT_AUTOMOBILE]
      return permissionRoles.includes(this.roles)
    },
    currentMonth() {
      const oDate = new Date()
      const M = oDate.getMonth() + 1
      return M
    }

  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss">
.home-feedback-statistics {
  .el-card__body {
    min-height: 220px;
    padding: 10px 0px;
  }
}
</style>
