<template>
  <div class="dataEntry_interhand">
    <el-card>
      <div slot="header">
        <span>后端数据录入</span>
      </div>
      <div>
        <el-row>
          <el-col :span="2" style="padding-top:7px">流程操作：</el-col>
          <el-col :span="20">
            <el-button type="primary" plain>保 存</el-button>
            <el-button type="primary" plain>提 交</el-button>
            <el-button type="primary" @click="adviceVisible=true" plain>意 见</el-button>
             <router-link :to="{name: 'cueManage_dataEntry'}">
              <el-button type="primary" style="margin-left:11px" plain>关 闭</el-button>
            </router-link>
            <el-button type="primary" plain>打 印</el-button>
            <!-- <el-button type="primary" @click="dialogVisible=true" plain>下一步</el-button> -->
            <!-- <el-button type="primary" style="margin-left:10px" plain>取 回</el-button>
            <el-button type="primary" plain>签 收</el-button>
            <el-button type="primary" plain>委 派</el-button> -->
          </el-col>
        </el-row>
        <el-tabs type="border-card" style="margin-top:20px">
          <!-- <el-tab-pane label="数据录入审批单">
            <ApprovalOrder></ApprovalOrder>
          </el-tab-pane> -->
          <el-tab-pane label="录入信息">
            <div class="apporderwrap">
              <div class="modeltitle">国际协查请求信息</div>
              <div class="flex-modelmain">
                <div class="flex-col-1 table-title">常用信息</div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">中心编号：</div>
                    <div class="flex-input">
                       <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">*类别：</div>
                    <div class="flex-input">
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">常用国家/地区（请求方）：</div>
                    <div class="flex-input">
                      <!-- <el-input v-model="inputtype" placeholder="请输入内容"></el-input> -->
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">常用国家/地区（披露方）：</div>
                    <div class="flex-input">
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>
                </div>
                <div class="flex-col-1 table-title">请求方信息</div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">编号：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">国家/地区：</div>
                    <div class="flex-input">
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">机构：</div>
                    <div class="flex-input">
                        <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">联系人：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">联系人职务：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">电话：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">传真：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">邮箱：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">地址：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">法定代表人：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">签名：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">日期：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">备注：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-col-1 table-title">披露方信息</div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">国家/地区：</div>
                    <div class="flex-input">
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">机构：</div>
                    <div class="flex-input">
                       <el-select  placeholder="请输入内容" v-model="inputtype">
                          <el-option label="美国" value="美国"></el-option>
                          <el-option label="中国" value="中国"></el-option>
                        </el-select>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">联系人：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">联系人职务：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">电话：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">传真：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">邮箱：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>

                  <div class="flex-col-1">
                    <div class="flex-label">地址：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="flex-col-1">
                    <div class="flex-label">备注：</div>
                    <div class="flex-input">
                      <el-input v-model="inputtype" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关附件">
            <Enclosure></Enclosure>
          </el-tab-pane>
          <el-tab-pane label="办理信息">
            <HandleInfo></HandleInfo>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog title="任务提交" :visible.sync="dialogVisible" width="600px" class="dialog-block">
        <div class="task">
          <el-form :model="form" label-width="100px">
            <el-form-item label="任务流向：">
              <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
            </el-form-item>
            <el-form-item label="待选用户：">
              <el-radio v-model="form.radio" label="1" class="leader">备选项1</el-radio>
              <el-radio v-model="form.radio" label="2" class="leader">备选项2</el-radio>
              <el-radio v-model="form.radio" label="3" class="leader">备选项3</el-radio>
              <el-radio v-model="form.radio" label="4" class="leader">备选项4</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="填写意见" :visible.sync="adviceVisible">
        <el-input type="textarea"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adviceVisible = false">取 消</el-button>
          <el-button type="primary" @click="adviceVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import ApprovalOrder from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/approvalOrder'
import Enclosure from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/enclosure'
import HandleInfo from '@/views/sys-monitoringAnalysis/cueManage/dataEntry/handleInfo'
export default {
  components: {
    Enclosure,
    HandleInfo,
    ApprovalOrder
  },
  data() {
    return {
      inputtype: '',
      dialogVisible: false,
      adviceVisible: false,
      form: {
        radio: '1'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.dataEntry_interhand {
  .apporderwrap {
    .flex-modelmain {
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .flex-row {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .row-header-column {
      display: flex;
      flex: 0 0 30%;
      margin-bottom: 10px;

      span {
        flex: 0 0 120px;
        text-align: right;
        align-self: center;
      }
      .el-input {
        flex: 1;
      }
    }
    .flex-col-1 {
      flex: 1;
      display: flex;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .flex-label {
      flex: 0 0 150px;
      padding: 10px 20px;
      text-align: right;
      // border-right: 1px solid #ccc;
      // flex垂直居中的方法
      display: flex;
      align-items: center;
    }
    .flex-input {
      flex: 1;
      padding: 10px 20px;
      align-self: center;
    }
  }
  .table-title {
    padding: 10px 20px;
    font-weight: bold;
  }
  .modeltitle {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .dialog-block{
    .el-radio{
      width: 100%;
      margin-left:30px;
    }
  }
}
</style>
