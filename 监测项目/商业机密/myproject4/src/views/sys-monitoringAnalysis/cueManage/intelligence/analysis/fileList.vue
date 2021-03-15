<template>
  <div class="filewarper">
    <el-card>
      <div slot="header">
        <span>情报类文件档案表</span>
      </div>
      <el-row>
        <!-- 第一行 -->
        <div class="processrow">
          <span>流程操作：</span>
          <el-button type="primary" plain>经办人可见</el-button>
          <!-- <el-popover
            ref="popover1"
            placement="bottom-start"
            width="200"
            trigger="hover"
            transition="fade-in-linear"
            content="点击自动形成交易明细列表、账户信息列表">
          </el-popover>
          <el-popover
            ref="popover2"
            placement="bottom-start"
            width="200"
            trigger="hover"
            transition="fade-in-linear"
            content="点击自动形成身份信息列表">
          </el-popover>
          <el-button type="primary" @click="searchVisible1=true" v-popover:popover1 plain style="margin-left:10px">查询银行业一级交易附件</el-button>
          <el-button type="primary" @click="searchVisible2=true" v-popover:popover2 plain>查询身份信息</el-button> -->
          <router-link :to="{name:'dataQuery_automaticQuery',params:{isshow:true}}">
            <el-button type="primary" plain style="margin-left:10px;margin-right:10px" v-if="isCenter">一级协查</el-button>
          </router-link>
          <el-button type="primary" plain v-if="isCenter">置为研判分析</el-button>
          <el-button type="primary" plain>保 存</el-button>
          <!-- <el-button type="primary" @click="submitVisible = true" plain>下一步</el-button> -->
          <!--<el-button type="primary" @click="closeVisible = true">关闭</el-button>-->

          <!-- <el-button type="primary" plain>取 回</el-button>
          <el-button type="primary" plain>签 收</el-button>
          <el-button type="primary" plain>委 派</el-button> -->
          <el-button type="primary" plain @click="adviceVisible=true">意 见</el-button>
          <router-link to="/cueManage/intelligence/analysis">
            <el-button type="primary" plain style="margin-left:10px">返 回</el-button>
          </router-link>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane name="first">
            <el-badge slot="label">
              <span>处理单</span>
            </el-badge>
            <el-row>
              <el-col style="textAlign:right">
                <el-button type="primary" plain>打印</el-button>
              </el-col>
            </el-row>
            <el-row class="table">
              <p>反洗钱中心文件处理单</p>
              <table border="1">
                <tr>
                  <td width="200" height="70;" align="center">主办处室</td>
                  <td width="200" colspan="2"></td>
                  <td width="200" colspan="2">经办人及电话</td>
                  <td width="200" colspan="2"></td>
                </tr>
                <tr>
                  <td height="200" colspan="6">
                    <span>关于xx的请示</span>
                  </td>
                </tr>
                <tr>
                  <td height="200">行领导批示</td>
                  <td colspan="6"></td>
                </tr>
                <tr>
                  <td height="200">中心领导意见</td>
                  <td colspan="6"></td>
                </tr>
                <tr>
                  <td width="200" height="200;" align="center">内部意见</td>
                  <td width="200" colspan="2"> </td>
                  <td width="200" colspan="2">会签意见</td>
                  <td width="200" colspan="2"> </td>
                </tr>
              </table>

            </el-row>
          </el-tab-pane>
          <!-- 触发信息 -->
          <el-tab-pane name="second">
            <el-badge slot="label">
              <span>触发信息</span>
            </el-badge>
            <el-form ref="form" :model="form" label-width="140px">
              <el-form-item label="触发类别：">
                <el-radio-group v-model="form.triggerType">
                  <el-radio :label="1">主动分析</el-radio>
                  <el-radio :label="2">被动分析</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="触发来源：" class="form">
                <el-radio-group v-model="form.triggerForm">
                  <el-radio label="境内受托协查"></el-radio>

                  <el-radio label="举报"></el-radio>
                  <el-radio label="境外情报"></el-radio>
                  <el-radio label="名单预警结果"></el-radio>
                  <el-radio label="分支机构上报分析申请"></el-radio>

                  <el-radio label="报告机构专报"></el-radio>

                  <el-radio label="遴选模型"></el-radio>
                  <el-radio label="规则"></el-radio>
                  <el-radio label="人工筛查重点可疑交易报告"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-col :span="24">
                <el-col :span="10">
                  <el-form-item label="索引号（编号）：" placeholder="协查文号【001】号">
                    <el-input v-model="form.index"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="margin-left: 10px;">
                  <el-button type="primary">查看详细信息</el-button>
                </el-col>
              </el-col>
            </el-form>
          </el-tab-pane>
          <!-- 主体信息 -->
          <el-tab-pane name="third">
            <el-badge slot="label">
              <span>主体信息</span>
            </el-badge>
            <el-form label-width="100px">
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="主体名称："><el-input></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="证件号："><el-input></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="账户："><el-input></el-input></el-form-item></el-col>
              </el-row>

            </el-form>

            <el-row>
              <el-col :span="24" style="textAlign:right;margin-bottom:10px">
                <el-button type="primary">查询</el-button>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
              </el-col>
            </el-row>
            <el-table>
              <el-table-column type="selection" min-width="60"></el-table-column>
              <el-table-column prop="mianName" label="主体名称"></el-table-column>
              <el-table-column prop="idNum" label="证件号"></el-table-column>
              <el-table-column prop="account" label="账户"></el-table-column>
              <el-table-column prop="mainType" label="主体类型"></el-table-column>
              <el-table-column prop="signMessage" label="标注状态"></el-table-column>
              <el-table-column prop="signType" label="可疑类型"></el-table-column>
              <el-table-column prop="detailMessage" label="详细信息"></el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 正文信息 -->
          <el-tab-pane name="four" class="secondwrap">
            <el-badge slot="label">
              <span>正文信息</span>
            </el-badge>
            <el-row>
              <el-form :model="formTwo">
                <el-col :span="14">
                  <el-form-item label="正文信息：">
                    <el-checkbox-group v-model="formTwo.info">
                      <el-checkbox label="可疑交易线索" name="type"></el-checkbox>
                      <el-checkbox label="可疑交易通报" name="type"></el-checkbox>
                      <el-checkbox label="协查结果反馈" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10" style="textAlign:right">
                  <el-form-item>
                    <el-button type="primary" @click="handleTab">确定</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <el-tabs v-model="activeName2" @tab-click="handleClick" v-show="isShow">
              <el-tab-pane name="firstTwo" :disabled="oneDisable">
                <el-badge slot="label">
                  <span>可疑交易线索</span>
                </el-badge>
                <el-form ref="formTwo" :model="formTwo" label-width="200px">
                  <el-form-item label="可疑交易名称：">
                    <el-input v-model="formTwo.name"></el-input>
                  </el-form-item>
                  <el-form-item label="关联移送记录：">
                    <el-input type="textarea" v-model="form.record"></el-input>
                  </el-form-item>
                  <el-form-item label="主要交易发生地：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="交易时间段：">
                    <el-input></el-input>
                  </el-form-item>

                  <el-form-item label="累计交易金额（人民币）：">

                    <el-input placeholder="万元"></el-input>

                  </el-form-item>

                  <el-form-item label="累计交易金额（外币）：">
                    <el-input placeholder="万美元"></el-input>
                  </el-form-item>
                  <el-form-item label="涉及交易笔数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="涉及主要账户个数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="初步判断：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="交易主体身份及相关信息：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="监测分析触发点：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="分析概述：">
                    <el-input type="textarea" placeholder="调用文本编辑器"></el-input>
                  </el-form-item>
                  <el-form-item label="建议：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane name="secondTwo" :disabled="secDisable">
                <el-badge slot="label">
                  <span>可疑交易通报</span>
                </el-badge>
                <el-form ref="formTwo" :model="formTwo" label-width="200px">
                  <el-form-item label="可疑交易名称：">
                    <el-input v-model="formTwo.name"></el-input>
                  </el-form-item>
                  <el-form-item label="关联移送记录：">
                    <el-input type="textarea" v-model="form.record"></el-input>
                  </el-form-item>
                  <el-form-item label="主要交易发生地：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="交易时间段：">
                    <el-input></el-input>
                  </el-form-item>

                  <el-form-item label="累计交易金额（人民币）：">

                    <el-input placeholder="万元"></el-input>

                  </el-form-item>

                  <el-form-item label="累计交易金额（外币）：">
                    <el-input placeholder="万美元"></el-input>
                  </el-form-item>
                  <el-form-item label="涉及交易笔数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="涉及主要账户个数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="初步判断：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="交易主体身份及相关信息：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="监测分析触发点：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="分析概述：">
                    <el-input type="textarea" placeholder="调用文本编辑器"></el-input>
                  </el-form-item>
                  <el-form-item label="建议：">
                    <el-input type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane name="thirdTwo" :disabled="thrDisable">
                <el-badge slot="label">
                  <span>协查结果反馈</span>
                </el-badge>
                <el-form ref="formTwo" :model="formTwo" label-width="200px">
                  <el-form-item label="协查主体名称：">
                    <el-input v-model="formTwo.name"></el-input>
                  </el-form-item>
                  <el-form-item label="主要交易发生地：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="交易时间段：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="累计交易金额（人民币）：">
                    <el-input placeholder="万元"></el-input>
                  </el-form-item>
                  <el-form-item label="累计交易金额（外币）：">
                    <el-input placeholder="万美元"></el-input>
                  </el-form-item>
                  <el-form-item label="涉及交易笔数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="涉及主要账户个数：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="分析概述：">
                    <el-input type="textarea" placeholder="调用文本编辑器"></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <!-- 附件信息 -->
          <el-tab-pane name="five">
            <el-badge slot="label">
              <span>附件信息</span>
            </el-badge>
            <div class="accestitle">附件列表</div>
            <!-- <div class="divider divider-horizontal"></div> -->
            <div class="btnlist">
              <el-button type="primary">上传附件</el-button>
            </div>
            <el-table style="width: 100%" :data="accessoryTable.list.slice((accessoryTable.currentPage-1)*accessoryTable.pagesize,accessoryTable.currentPage*accessoryTable.pagesize)">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column prop="type" label="附件类型" min-width="120" fixed></el-table-column>
              <el-table-column prop="name" label="附件名称" width="180" fixed></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text">下载</el-button>
                  <el-button type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="accessoryTable.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>

          </el-tab-pane>
          <!-- 办理信息 -->
          <el-tab-pane name="six">
            <el-badge slot="label">
              <span>办理信息</span>
            </el-badge>
            <el-table style="width: 100%" :data="tableData">
              <el-table-column type="index" label="序号" min-width="55" fixed></el-table-column>
              <el-table-column prop="name" label="节点名称" min-width="120" fixed></el-table-column>
              <el-table-column prop="user" label="办理人" width="180" fixed></el-table-column>
              <el-table-column prop="time" label="办理时间" min-width="100" fixed></el-table-column>
              <el-table-column prop="idea" label="办理意见" min-width="120" fixed></el-table-column>
              <!-- <el-table-column prop="beizhu" label="备注" width="180" fixed></el-table-column>
              <el-table-column prop="write" label="签名" width="180" fixed></el-table-column> -->
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="handleTable.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>
            <div class="accestitle">流程监控图：</div>
            <div class="map-block">
              <!-- <el-row style="marginBottom:20px">
                <el-col :span="12">
                  <span>流程监控图 ：</span>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="24">
                  <el-steps :active="2" align-center>
                    <el-step title="分析处室负责人审阅并分配分析员" description=""></el-step>
                    <el-step title="分析员拟稿情报" description=""></el-step>
                    <el-step title="...." description=""></el-step>
                    <el-step title="结束" description=""></el-step>
                  </el-steps>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>

    <!-- 提交弹框内容 -->
    <!-- <el-dialog class="submitwrap" title="任务提交" :visible.sync="submitVisible">
      <div>
        <div class="dialogtitle">任务流向：</div>
        <el-row class="radiowrap">
          <el-radio v-model="radio" label="1">送移送处处长审核</el-radio>
        </el-row>
        <el-row style="padding-left: 30px;">
          <el-radio v-model="radio" label="2">结束（如其他电子平台来件为主体信息空等情况）</el-radio>
        </el-row>
        <el-row class="dialogradio radiowrap">
          <el-radio v-model="radio" label="3">退回分析员</el-radio>
        </el-row>
        <el-transfer :titles="['待选用户', '已选用户']" :button-texts="['', '']" v-model="value" :data="data"></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 关闭弹框提示 -->
    <el-dialog title="系统提示" :visible.sync="closeVisible" width='30%'>
      <div>
        <i class="el-icon-warning"></i>是否确认放弃此次申请？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeVisible = false">是</el-button>
        <el-button type="primary" @click="closeVisible = false">否</el-button>
      </span>
    </el-dialog>

    <!-- 查询银行业一级交易附件 弹框 -->
    <el-dialog title="提示" :visible.sync="searchVisible1" width='30%'>
      <div style="textAlign:center">
        自动形成交易明细列表、账户信息列表成功
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="searchVisible1 = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 查询身份信息 弹框 -->
    <el-dialog title="提示" :visible.sync="searchVisible2" width='30%' class="message">
      <div>
        <p>自动生成身份信息列表成功</p>
        <p>备注：同时自动填写办理信息中的交易时段、累计交易金额人民币、累计交易金额外币、涉及交易笔数、涉及交易账户个数、可疑交易名称（主体名称+个数+等账户可疑交易）、协查主体名称（主体名称+个数+等账户可疑交易）。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="searchVisible2 = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 意见 -->
    <el-dialog title="填写意见" :visible.sync="adviceVisible">
      <el-input type="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adviceVisible = false">取 消</el-button>
        <el-button type="primary" @click="adviceVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 下一步弹框-->
    <!-- <el-dialog title="任务提交" :visible.sync="submitVisible" width="600px" class="dialog-block">
      <div class="task">
        <el-form :model="form" label-width="100px">
          <el-form-item label="任务流向：">
            <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
          </el-form-item>
          <el-form-item label="待选用户：">
            <el-radio v-model="form.radio" label="1">领导1</el-radio>
            <el-radio v-model="form.radio" label="2">领导2</el-radio>
            <el-radio v-model="form.radio" label="3">领导3</el-radio>
            <el-radio v-model="form.radio" label="4">领导4</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { getAnalysisiIndex } from '@/api/cueManage'
import { mapGetters } from 'vuex'
export default {
  data() {
    // 提交穿梭框定义
    // const generateData = _ => {
    //   const data = []
    //   for (let i = 1; i <= 15; i++) {
    //     data.push({
    //       key: i,
    //       label: `领导 ${i}`
    //     })
    //   }
    //   return data
    // }

    return {
      activeName: 'first', // tabs
      activeName2: 'firstTwo',
      oneDisable: true,
      secDisable: true,
      thrDisable: true,
      submitVisible: false, // 提交弹框
      closeVisible: false, // 关闭弹框
      adviceVisible: false, // 意见弹框
      searchVisible2: false,
      searchVisible1: false,
      radio: 1, // 提交弹框单选框
      form: {
        triggerType: 1,
        triggerForm: '',
        index: '',
        radio: '1'
      },
      formTwo: {
        info: [],
        name: '',
        record: ''
      },
      accessoryTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      handleTable: {
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      isShow: false,
      // data: generateData(), // 提交穿梭框变量
      value: [], // 提交穿梭框变量
      tableData: [
        {
          name: '分析拟稿情报',
          user: 'user1',
          time: '2017-05-05 10:00:00',
          idea: '同意'
        },
        {
          name: '分析处处长审核',
          user: 'user2',
          time: '2017-05-06 10:00:00',
          idea: '同意'
        },
        {
          name: '移送处综合管理',
          user: 'user3',
          time: '2017-05-07 10:00:00',
          idea: '同意'
        },
        {
          name: '移送处复核整编',
          user: 'user4',
          time: '2017-05-08 10:00:00',
          idea: '同意'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['institution']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    }
  },
  mounted() {
    console.log(this.$route.query.infoId)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    fetchData(listQuery) {
      this.listLoading = true
      getAnalysisiIndex(this.listQuery).then(response => {
        this.list = response.data.projects
        this.accessoryTable.list = response.data.accessoryTable
        this.handleTable.list = response.data.handleTable
        this.listLoading = false
      })
    },
    handleSizeChange(size) {
      this.pagesize = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    handleTab() {
      this.isShow = true
      this.oneDisable = true
      this.secDisable = true
      this.thrDisable = true
      // console.log(this.formTwo.info)
      this.formTwo.info.forEach((item) => {
        if (item === '可疑交易线索') {
          this.oneDisable = false
        } else if (item === '可疑交易通报') {
          this.secDisable = false
        } else if (item === '协查结果反馈') {
          this.thrDisable = false
        }
      })
    },
    delRow(scope) {
      const index = scope.$index
      this.$confirm('确定删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.accessoryTable.list.splice(index, 1)
      }).catch(() => {})
    }
    // closeDialog() {
    //   this.$confirm('是否确认放弃此次申请？', '系统提示', {
    //     // confirmButtonText: '是',
    //     confirmButtonText: '是',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    // }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData(listQuery)
    if (this.$route.params.name) this.activeName = this.$route.params.name
  }
}
</script>

<style lang="scss">
.filewarper {
  .processrow {
    padding-bottom: 10px;
    span {
      font-size: 0.9em;
    }
  }
  .secondwrap .moneyrow .el-input {
    width: 30%;
    margin: 0 5px;
  }
  .el-radio-group .el-radio:nth-child(6n) {
    margin-left: 0;
  }
  .el-radio-group .el-radio {
    margin-top: 10px;
  }
  .form .el-radio {
    width: 15%;
  }
  .secondwrap .el-form {
    width: 90%;
  }
  .btnalign {
    text-align: center;
    padding: 10px 0;
  }
  .accestitle {
    // 附件样式
    font-size: 0.9em;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }

  // 提交弹框样式
  .submitwrap {
    .el-dialog__body {
      padding-top: 10px;
      .dialogtitle {
        margin-bottom: 8px;
      }
      .dialogradio {
        padding-bottom: 10px;
        border-bottom: 1px dashed #409eff;
      }
      .radiowrap {
        padding-left: 30px;
      }
      .el-transfer {
        margin: 10px 0 0 5%;
      }
    }
  }
  // 关闭弹框
  .el-icon-warning {
    font-size: 20px;
  }
}
.table {
  p,
  h3 {
    margin: 10px auto;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    text-align: center;
    margin: 0 auto;
  }
  table p {
    margin-top: 83px;
    text-align: right;
  }
  table span {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  #time span {
    width: 30px;
  }
}
.message {
  .el-dialog__body {
    padding: 0px 20px;
  }
}
.dialog-block{
  .el-radio{
    width: 100%;
    margin-left:30px;
  }
}
</style>
