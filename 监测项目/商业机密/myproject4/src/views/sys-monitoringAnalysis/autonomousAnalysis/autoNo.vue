<template>
  <div class="autoHeader">
    <div>
      <el-row style="height:60px;line-height:60px;">
        <el-col :span="2">流程操作：</el-col>
        <el-col :span="2">
          <el-button plain size="mini" disabled class="buttonSize">协查分类</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" disabled class="buttonSize">预分配</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" disabled class="buttonSize">人工分配</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" disabled class="buttonSize">打印</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" disabled class="buttonSize">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">提交</el-button>
        </el-col>
        <el-col :span="2">
          <el-button plain size="mini" class="buttonSize">关闭</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- <el-tabs type="border-card">
      <el-tab-pane label="办理信息">
        <Edit></Edit>
      </el-tab-pane>
      <el-tab-pane label="协查文件档案表">
        <ArchivesList></ArchivesList>
      </el-tab-pane>
      <el-tab-pane label="相关附件">
        <Correlation></Correlation>
      </el-tab-pane>
      <el-tab-pane label="流转信息">
        <Transfer-Info></Transfer-Info>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import Edit from '@/views/sys-monitoringAnalysis/autonomousAnalysis/child/edit.vue'
import ArchivesList from '@/views/sys-monitoringAnalysis/autonomousAnalysis/child/archivesList.vue'
import Correlation from '@/views/sys-monitoringAnalysis/autonomousAnalysis/child/correlation.vue'
import TransferInfo from '@/views/sys-monitoringAnalysis/autonomousAnalysis/child/transferInfo.vue'
export default {
  components: {
    Edit,
    ArchivesList,
    Correlation,
    TransferInfo
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  filters: {
  },
  created() {
  }
}
</script>

<style lang="scss">
.autoHeader{
  .buttonSize{
    width: 86px;
  }
}
</style>
