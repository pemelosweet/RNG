<template>
    <div class="dataEntry_feedback">
        <el-card>
            <div slot="header">
                <span>后端数据录入</span>
            </div>
            <div>
                <el-row >
                    <el-col :span="1.5" style="padding-top:7px">流程操作：</el-col>
                    <el-col :span="15">
                        <el-button type="primary">保存</el-button>
                        <el-button type="primary">提交</el-button>
                        <el-button type="primary">意见</el-button>
                        <router-link :to="{name: 'cueManage_dataEntry'}">
                            <el-button type="primary" style="margin-left:11px">关闭</el-button>
                        </router-link>
                    </el-col>
                </el-row>
                <el-tabs type="border-card" style="margin-top:20px">
                    <el-tab-pane label="录入信息"><InputInfo></InputInfo></el-tab-pane>
                    <el-tab-pane label="相关附件"><Enclosure></Enclosure></el-tab-pane>
                    <el-tab-pane label="办理信息"><HandleInfo></HandleInfo></el-tab-pane>
                </el-tabs>
            </div>
           
        </el-card>
    </div>
</template>

<script>
import Enclosure from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/enclosure'
import InputInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/feedBack/inputInfo'
import HandleInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/handleInfo'
export default {
  components: {
    Enclosure,
    InputInfo,
    HandleInfo
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.dataEntry_feedback {
  
  
}
</style>
