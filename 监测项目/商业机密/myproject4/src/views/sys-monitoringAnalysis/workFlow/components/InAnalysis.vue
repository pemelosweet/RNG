<template>
  <div class="filewarper">
    <el-card>
      <!-- <a @click="goBack" class="back" :style="backImg"></a> -->
      <div slot="header">
        <span>自主分析文件档案表</span>
      </div>
      <el-row>
        <!-- 第一行 -->
        <!-- <div class="processrow">
          <span>流程操作：</span>
          <el-button v-if="this.keyIndex === '0' " disabled type="primary" plain>调用分析工具</el-button>
          <el-button v-if="this.keyIndex === '0' " disabled type="primary" plain>打印</el-button> -->
          <!-- <el-button v-if="this.keyIndex === '0' || this.keyIndex === '2'||ismanagement " type="primary" @click="submitAll" plain>保存</el-button> -->
          <!-- <el-button v-if="this.keyIndex === '0' " disabled type="primary" plain>提交</el-button> -->
          <!-- <el-button type="primary" plain>关闭</el-button>

        </div> -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane name="first" >
            <el-badge slot="label">
              <span>处理单</span>
            </el-badge>
            <!-- <el-row>
              <el-col style="textAlign:right">
                <el-button type="primary" plain>打印</el-button>
              </el-col>
            </el-row> -->
            <el-row class="table">
              <el-form :model="chuLiTable" :rules="formChuLiRules" v-if="isQiCao"  :disabled="isDone" ref="formChuLiRule">
                <h2 style="text-align:center;height:80px;line-height:80px;">反洗钱中心文件处理单</h2>
                <table border="1">
                <tr>
                  <td width="200" height="70;" align="center">主办处室</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="hostRoom" class="noBorder">
                      <el-input v-model="chuLiTable.hostRoom" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"   placeholder="主办处室,最长为30字符" :maxlength="30"></el-input>
                    </el-form-item></td>
                  <td width="200" colspan="2">经办人及电话</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="agentsTelephone" class="noBorder">
                      <el-input v-model="chuLiTable.agentsTelephone" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="经办人及电话，最长为30字符" :maxlength="30"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">请示</td>
                  <td height="200" colspan="6">
                    <el-form-item prop="fileContent"  class="noBorderTwo">
                      <el-input v-model="chuLiTable.fileContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入请示，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">行领导批示</td>
                  <td colspan="6">
                    <el-form-item prop="bankLeadIntruc"  class="noBorder">
                      <el-input v-model="chuLiTable.bankLeadIntruc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="请输入行领导批示，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">中心领导意见</td>
                  <td colspan="6">
                    <el-form-item prop="centLeadOpinions"  class="noBorder">
                      <el-input v-model="chuLiTable.centLeadOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="请输入中心领导意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td width="200" height="200;" align="center">内部意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="internalOpinions"  class="noBorder">
                      <el-input v-model="chuLiTable.internalOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="内部意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                  <td width="200" colspan="2">会签意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="counterOpnions"  class="noBorder">
                      <el-input v-model="chuLiTable.counterOpnions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="会签意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              </el-form>
              <el-form :model="chuLiTable" :rules="formChuLiRules" v-else :disabled="isDone" ref="formChuLiRule">
                <h2 style="text-align:center;height:80px;line-height:80px;">反洗钱中心文件处理单</h2>
                <table border="1">
                <tr>
                  <td width="200" height="70;" align="center">主办处室</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="hostRoom" class="noBorder">
                      <el-input v-model="chuLiTable.hostRoom" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  disabled placeholder="主办处室,最长为30字符" :maxlength="30"></el-input>
                    </el-form-item></td>
                  <td width="200" colspan="2">经办人及电话</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="agentsTelephone" class="noBorder">
                      <el-input v-model="chuLiTable.agentsTelephone" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="经办人及电话，最长为30字符" :maxlength="30"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">请示</td>
                  <td height="200" colspan="6">
                    <el-form-item prop="fileContent"  class="noBorderTwo">
                      <el-input v-model="chuLiTable.fileContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled placeholder="请输入请示，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">行领导批示</td>
                  <td colspan="6">
                    <el-form-item prop="bankLeadIntruc"  class="noBorder">
                      <el-input v-model="chuLiTable.bankLeadIntruc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入行领导批示，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">中心领导意见</td>
                  <td colspan="6">
                    <el-form-item prop="centLeadOpinions"  class="noBorder">
                      <el-input v-model="chuLiTable.centLeadOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入中心领导意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td width="200" height="200;" align="center">内部意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="internalOpinions"  class="noBorder">
                      <el-input v-model="chuLiTable.internalOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="内部意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                  <td width="200" colspan="2">会签意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="counterOpnions"  class="noBorder">
                      <el-input v-model="chuLiTable.counterOpnions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="会签意见，最长为100字符" :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              </el-form>
            </el-row>
          </el-tab-pane>
          <!-- 触发信息 -->
          <el-tab-pane name="second">
            <el-badge slot="label">
              <span>触发信息</span>
            </el-badge>
            <el-form ref="form" :model="form" :rules="formRules"  label-width="140px">
              <!-- <el-form-item label="触发类别：">
                <el-radio-group v-model="form.triggerType">
                  <el-radio :label="1">主动分析</el-radio>
                  <el-radio :label="2">被动分析</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-row>
                <el-form-item label="触发来源： " class="form" prop="triggerForm" label-width="200px">
                  <el-radio-group v-model="form.triggerForm" :disabled="isDisabled" @change="changeRadio" style="width: 100%">
                    <div style="width: 100%">
                      <el-radio label="境内受托协查" value="境内受托协查"></el-radio>
                      <el-radio label="境外受托协查" value="境外受托协查"></el-radio>
                      <el-radio label="可疑交易报告预警" value="可疑交易报告预警"></el-radio>
                      <el-radio label="高级名单预警" value="高级名单预警"></el-radio>
                      <el-radio label="模型预警" value="模型预警"></el-radio>
                      <el-radio label="规则预警" value="规则预警"></el-radio>
                    </div>
                    <div style="width: 100%">
                      <el-radio label="上报分析申请" value="上报分析申请"></el-radio>
                      <el-radio label="举报" value="举报"></el-radio>
                      <el-radio label="报告机构专报" value="报告机构专报"></el-radio>
                      <el-radio label="专项行动" value="专项行动"></el-radio>
                      <el-radio label="国际情报转介" value="国际情报转介"></el-radio>
                    </div>
                    <div>
                      <el-radio label="其他来源" value="其他来源"></el-radio>
                      <div>
                        <el-radio v-if="showRadio"  label="普通名单预警" value="普通名单预警"></el-radio>
                      </div>
                      <div>
                        <el-radio v-if="showRadio" label="互联网舆情" value="互联网舆情"></el-radio>
                      </div>
                      <div>
                        <el-radio v-if="showRadio" label="领导批示" value="领导批示"></el-radio>
                      </div>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="200px" prop="radioInput">
                    <el-input v-if="showInput" v-model="form.radioInput" :disabled="isDisabled" :maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="索引号（编号）：" label-width="200px">
                    <el-input placeholder="请输入索引号（编号），最长为45字符" v-model="form.index" :disabled="isDisabled" :maxlength="45" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="margin-left: 10px;">
                  <el-button type="primary" @click="showTriggerInfo(form.index)">查看详细信息</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <!-- 主体信息 -->
          <el-tab-pane name="third">
            <el-badge slot="label">
              <span>主体信息</span>
            </el-badge>
            <el-form :model="formMain" :rules="formMainRef" ref="formMainRefs" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="主体名称：" label-width="120" prop="mainName">
                    <el-input placeholder="主体名称，最长为50字符" v-model="formMain.mainName" style="width:60%" :maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码：" label-width="120" prop="idNum">
                    <el-input  placeholder="证件号码，最长为30字符" v-model="formMain.idNum" style="width:60%" :maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号：" label-width="120" prop="account">
                    <el-input  placeholder="账号，最长为30字符" v-model="formMain.account" style="width:60%" :maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>

            <el-row>
              <el-col :span="24" style="textAlign:right;margin-bottom:10px">
                <el-button type="primary" @click="showSelectSubject">查询</el-button>
                <el-button type="primary" plain @click="clearSubject">清空</el-button>
                <el-button type="primary" v-if="!isDisabled"  @click="addNewFormMain">新增</el-button>
                    <el-upload
                      v-if="!isDisabled"
                      style="display:inline-block;"
                      class="upload-demo"
                      ref="fileListZT"
                      :action="uploadUrl"
                      :on-success="showFileList1"
                      :before-upload="handleBeforeUploadZT"
                      :on-preview="handlePreview"
                      :show-file-list="showFile"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                        <el-button size="small" type="primary">导入</el-button>
                      </el-upload>
                <el-button type="primary" @click="subjectExport" v-if="!isDisabled">
                  导出
                </el-button>
                <el-button type="primary" @click="downloadMb1" v-if="!isDisabled">
                  下载模板
                </el-button>
              </el-col>
            </el-row>
            <!-- 新增主体信息弹框 -->
            <el-dialog
              title="主体信息"
              :visible.sync="formMainVisible"
              center
              width="50%">
              <el-form :model="addFormMain" :rules="addFormMainRules" ref="addFormMainRefs">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主体名称：" :label-width="formLabelWidth" prop="subjectName">
                      <el-input placeholder="主体名称，最长为50字符" v-model="addFormMain.subjectName" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证件号码：" :label-width="formLabelWidth" prop="certiNum">
                      <el-input placeholder="证件号码，最长为50字符" v-model="addFormMain.certiNum" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="账号：" :label-width="formLabelWidth" prop="account">
                      <el-input placeholder="账号，最长为50字符" v-model="addFormMain.account" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="主体类型：" :label-width="formLabelWidth" prop="bodyType">
                      <!-- <el-input placeholder="主体类型，最长为50字符" v-model="addFormMain.bodyType" :maxlength="50"></el-input> -->
                      <el-select style="width:100%" v-model="addFormMain.bodyType" clearable placeholder="请选择" @change="certificateone">
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="机构" value="机构"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="标注状态：" :label-width="formLabelWidth" prop="standInfo">
                      <el-input placeholder="标注状态，最长为50字符" v-model="addFormMain.standInfo" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="可疑类型：" :label-width="formLabelWidth" prop="dimeType">
                      <el-input placeholder="可疑类型，最长为50字符" v-model="addFormMain.dimeType" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注：" :label-width="formLabelWidth" prop="detalInfo">
                      <el-input placeholder="备注，最长为50字符"  v-model="addFormMain.detalInfo" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="24">
                    <el-form-item label="可疑描述：" :label-width="formLabelWidth" prop="suspiciousDesc">
                      <el-input placeholder="可疑描述，最长为500字符" type="textarea"  v-model="addFormMain.suspiciousDesc" :maxlength="500"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="formMainVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubjectInfo">确 定</el-button>
              </span>
            </el-dialog>
           
            <el-table :data="formMainTable.list" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" fixed></el-table-column>
              <el-table-column type="index" label="序号" min-width="60"></el-table-column>
              <el-table-column prop="subjectName" label="主体名称"></el-table-column>
              <el-table-column prop="certiNum" label="证件号码"></el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column prop="bodyType" label="主体类型"></el-table-column>
              <el-table-column prop="standInfo" label="标注状态"></el-table-column>
              <el-table-column prop="dimeType" label="可疑类型"></el-table-column>
              <el-table-column prop="detalInfo" label="备注"></el-table-column>
              <el-table-column prop="suspiciousDesc" label="可疑描述" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChangeFormMain" @current-change="handleCurrentChangeFormMain" :current-page="formMainTable.currentPage" :page-sizes="[10, 20, 30, 40]"
                :page-size="formMainTable.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="formMainTable.total" background></el-pagination>
          </el-tab-pane>
          <!-- 正文信息 -->
          <el-tab-pane name="four" class="secondwrap">
            <el-badge slot="label">
              <span>正文信息</span>
            </el-badge>
            <el-row>
              <el-form :model="form">
                <el-col :span="14">
                  <el-form-item label="正文信息：">
                    <el-radio label="可疑交易线索" @change="handleTab" :disabled="isDisabled" v-model="form.radio" name="type"></el-radio>
                    <el-radio label="可疑交易通报" @change="handleTab" :disabled="isDisabled" v-model="form.radio" name="type"></el-radio>
                      <!-- <el-checkbox label="协查结果反馈" name="type"></el-checkbox> -->
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="10" style="textAlign:right">
                  <el-form-item>
                    <el-button type="primary" @click="handleTab">确定</el-button>
                  </el-form-item>
                </el-col> -->
              </el-form>
            </el-row>
            <el-row v-if="!isDisabled">
              <el-col :span="4">
                <el-upload
                  v-if="showXSInfo"
                  style="display:inline-block;"
                  class="upload-demo"
                  :action="uploadUrl1"
                  ref="showFileListXs"
                  :on-success="showFileListXs"
                  :before-upload="handleBeforeUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileListXS">
                    <el-button size="small" type="primary">上传可疑交易线索表</el-button>
                </el-upload>
                <!-- <button style="font-size:14px;">上传可疑交易线索表</button> -->
              </el-col>
              <el-col v-if="!isDisabled" :span="4">
                <el-upload
                  v-if="showTBInfo"
                  style="display:inline-block;"
                  class="upload-demo"
                  :action="uploadUrl2"
                  :on-success="showFileListTb"
                  :before-upload="handleBeforeUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :show-file-list="showFile"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileListTB">
                    <el-button size="small" :disabled="isDisabled" type="primary">上传可疑交易通报表</el-button>
                  </el-upload>
                <!-- <button style="font-size:14px;">上传可疑交易通报表</button> -->
              </el-col>
              <el-col :span="4" v-if="!isDisabled">
                <el-button type="primary" @click="downloadMb2" v-show="isShow">
                  <!-- <a :href="downloadMb2" >下载模板</a> -->
                  下载模板
                </el-button>
              </el-col>
            </el-row>
            <el-row v-if="!isDisabled">
              <el-tabs v-model="activeName2" @tab-click="handleClick" v-show="isShow">
                  <el-tab-pane name="firstTwo" v-show="showXSInfo">
                    <el-badge slot="label" v-show="showXSInfo">
                      <span>可疑交易线索</span>
                    </el-badge>
                    <el-form v-show="showXSInfo" ref="formTwoXS" :model="formTwoXS" :rules="formTwoXSRules" label-width="200px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="可疑交易名称：" prop="cDispose">
                            <el-input type="textarea" v-model="formTwoXS.cDispose" :maxlength="30" placeholder="可疑交易名称,最长为30字符" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <!-- <el-form-item label="交易时间段：" prop="cDealdate">
                            <el-input v-model="formTwoXS.cDealdate"></el-input>
                          </el-form-item> -->
                          <el-form-item label="交易时间段：" class="oddinput" prop="cDealdate">
                            <el-date-picker
                            :disabled="isDisabled"
                            :picker-options="pickerOptions1"
                              v-model="formTwoXS.cDealdate"
                              style="width: 100%"
                              type="daterange"
                              range-separator="至"
                              format="yyyy-MM-dd" 
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                            <!-- <el-input v-model="formTwoXS.cDealdate"></el-input> -->
                          </el-form-item>
                        </el-col>
                        
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="主要交易发生地：" prop="cbodyMessage">
                            <el-input v-model="formTwoXS.cbodyMessage"  placeholder="主要交易发生地：,最长为50字符" type="textarea" :maxlength="50" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="关联移送记录：" prop="ctriggerMessage">
                            <el-input type="textarea"  placeholder="关联移送记录,最长为200字符"  v-model="formTwoXS.ctriggerMessage" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万元）：" prop="cRmb">
                            <el-input v-model="formTwoXS.cRmb" placeholder="万元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万美元）：" prop="cYb">
                            <el-input v-model="formTwoXS.cYb" placeholder="万美元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="涉及交易笔数：" prop="cNumber">
                            <el-input v-model="formTwoXS.cNumber"  placeholder="涉及交易笔数,最长为9字符"  :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="涉及主要账户个数：" prop="cMainnumber">
                            <el-input v-model="formTwoXS.cMainnumber"  placeholder="涉及主要账户个数,最长为9字符"  :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="初步判断：" prop="cJudge" >
                            <el-select style="width:100%" v-model="formTwoXS.cJudge" clearable placeholder="请选择" multiple :disabled="isDisabled">
                              <el-option  v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
                            </el-select>
                            <!-- <el-input v-model="formTwoXS.cJudge" type="textarea"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="监测分析触发点：" prop="cPoints">
                            <el-input  placeholder="监测分析触发点：,最长为200字符"  v-model="formTwoXS.cPoints" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易主体身份及相关信息：" prop="cSubject">
                            <el-input  placeholder="交易主体身份及相关信息：,最长为200字符"  v-model="formTwoXS.cSubject" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="建议：" prop="cSuggest">
                            <el-input  placeholder="建议,最长为200字符"  v-model="formTwoXS.cSuggest" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="分析概述：">
                            <el-upload
                            :disabled="isDisabled"
                          class="upload-demo"
                          ref="showFileListFenXi"
                          :action="uploadUrlFenXiXS()"
                          :on-success="showFileListFenXi"
                          :before-upload="handleBeforeUploadXSTB"
                          :on-preview="handlePreview"
                          :on-remove="handleRemoveFenXiXS"
                          :before-remove="beforeRemove"
                          :limit="1"
                          :on-exceed="handleExceed"
                          :file-list="fileListFenXiXS">
                            <el-button size="small" style="text-align: center" type="primary" :disabled="isDisabled">点击上传</el-button>
                          </el-upload>
                          <el-table style="width: 100%" :data="fenXiTable.list">
                              <el-table-column type="index" label="序号" fixed></el-table-column>
                              <!-- <el-table-column prop="attachType" label="附件类型" min-width="120" fixed></el-table-column> -->
                              <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                              <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                                <template slot-scope="scope">
                                  <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                                  <el-button v-if="this.keyIndex==='0'" type="text" @click="delRow(scope)">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                        <el-col></el-col>
                      </el-row>    
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane name="secondTwo" v-show="showTBInfo">
                    <el-badge slot="label" v-show="showTBInfo">
                      <span>可疑交易通报</span>
                    </el-badge>
                    <el-form v-show="showTBInfo" ref="formTwoTB" :model="formTwoTB" :rules="formTwoTBRules" label-width="200px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="可疑交易名称：" prop="aDispose">
                            <el-input type="textarea" v-model="formTwoTB.aDispose" placeholder="可疑交易名称,最长为30字符" :maxlength="30" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易时间段：" prop="aDealdate" class="oddinput">
                            <el-date-picker
                            :disabled="isDisabled"
                              @change="logDate"
                              v-model="formTwoTB.aDealdate"
                              :picker-options="pickerOptions1"
                              type="daterange"
                              range-separator="至"
                              format="yyyy-MM-dd" 
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                            <!-- <el-input v-model="formTwoTB.aDealdate" placeholder="请输入"></el-input> -->
                          </el-form-item>
                        </el-col>
                        
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="主要交易发生地：" prop="bodyMessage">
                            <el-input placeholder="主要交易发生地,最长为50字符" type="textarea"  v-model="formTwoTB.bodyMessage" :maxlength="50" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="关联移送记录：" prop="triggerMessage">
                            <el-input placeholder="关联移送记录,最长为200字符"  type="textarea" v-model="formTwoTB.triggerMessage" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万元）：" prop="aRmb">
                            <el-input  v-model="formTwoTB.aRmb" placeholder="万元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万美元）：" prop="aYb">
                            <el-input v-model="formTwoTB.aYb" placeholder="万美元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="涉及交易笔数：" prop="aNumber">
                            <el-input placeholder="涉及交易笔数,最长为9字符"  v-model="formTwoTB.aNumber" :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="涉及主要账户个数：" prop="aMainnumber">
                            <el-input placeholder="涉及主要账户个数,最长为9字符"   v-model="formTwoTB.aMainnumber" :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="初步判断：" prop="aJudge">
                            <el-select style="width:100%" v-model="formTwoTB.aJudge" clearable placeholder="请选择" multiple :disabled="isDisabled">
                              <el-option v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId" ></el-option>
                            </el-select>
                            <!-- <el-input v-model="formTwoTB.aJudge" type="textarea"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="监测分析触发点：" prop="aPoints">
                            <el-input placeholder="监测分析触发点,最长为200字符"  v-model="formTwoTB.aPoints" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易主体身份及相关信息：" prop="aSubject">
                            <el-input placeholder="交易主体身份及相关信息,最长为200字符"  v-model="formTwoTB.aSubject" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="建议：" prop="aSuggest">
                            <el-input placeholder="建议,最长为200字符"  v-model="formTwoTB.aSuggest" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="分析概述：">
                            <el-upload
                              :disabled="isDisabled"
                              class="upload-demo"
                              :action="uploadUrlFenXiTB()"
                              ref="showFileListFenXi1"
                              :on-success="showFileListFenXi1"
                              :before-upload="handleBeforeUploadXSTB"
                              :on-preview="handlePreview"
                              :on-remove="handleRemoveFenXiTB"
                              :before-remove="beforeRemove"
                              multiple
                              :limit="3"
                              :on-exceed="handleExceed"
                              :file-list="fileListFenXiTB">
                                <el-button size="small" style="text-align: center" type="primary" :disabled="isDisabled">点击上传</el-button>
                            </el-upload>
                            <el-table style="width: 100%" :data="fenXiTable1.list">
                              <el-table-column type="index" label="序号" fixed></el-table-column>
                              <!-- <el-table-column prop="attachType" label="附件类型" min-width="120" fixed></el-table-column> -->
                              <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                              <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                                <template slot-scope="scope">
                                  <el-button type="text"  @click="downloadFileById(scope.row.attachId)">下载</el-button>
                                  <el-button v-if="!isDisabled" type="text" @click="delRow(scope)">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <!-- <el-tab-pane name="thirdTwo" :disabled="thrDisable">
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
                  </el-tab-pane> -->
                </el-tabs>
            </el-row>
            <el-row v-else>
              <el-tabs v-model="activeName2" @tab-click="handleClick" v-show="isShow">
                  <el-tab-pane name="firstTwo" v-show="showXSInfo">
                    <el-badge slot="label" v-show="showXSInfo">
                      <span>可疑交易线索</span>
                    </el-badge>
                    <el-form v-show="showXSInfo" ref="formTwoXS" :model="formTwoXS"  label-width="200px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="可疑交易名称：" prop="cDispose">
                            <el-input type="textarea" v-model="formTwoXS.cDispose" :maxlength="30" placeholder="可疑交易名称,最长为30字符" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <!-- <el-form-item label="交易时间段：" prop="cDealdate">
                            <el-input v-model="formTwoXS.cDealdate"></el-input>
                          </el-form-item> -->
                          <el-form-item label="交易时间段：" class="oddinput" prop="cDealdate">
                            <el-date-picker
                            :disabled="isDisabled"
                              v-model="formTwoXS.cDealdate"
                              :picker-options="pickerOptions1"
                              style="width: 100%"
                              type="daterange"
                              range-separator="至"
                              format="yyyy-MM-dd" 
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                            <!-- <el-input v-model="formTwoXS.cDealdate"></el-input> -->
                          </el-form-item>
                        </el-col>
                        
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="主要交易发生地：" prop="cbodyMessage">
                            <el-input type="textarea"  v-model="formTwoXS.cbodyMessage"  placeholder="主要交易发生地：,最长为50字符"  :maxlength="50" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="关联移送记录：" prop="ctriggerMessage">
                            <el-input type="textarea"  placeholder="关联移送记录,最长为200字符"  v-model="formTwoXS.ctriggerMessage" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万元）：" prop="cRmb">
                            <el-input v-model="formTwoXS.cRmb" placeholder="万元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万美元）：" prop="cYb">
                            <el-input v-model="formTwoXS.cYb" placeholder="万美元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="涉及交易笔数：" prop="cNumber">
                            <el-input v-model="formTwoXS.cNumber"  placeholder="涉及交易笔数,最长为9字符"  :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="涉及主要账户个数：" prop="cMainnumber">
                            <el-input v-model="formTwoXS.cMainnumber"  placeholder="涉及主要账户个数,最长为9字符"  :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="初步判断：" prop="cJudge" >
                            <el-select style="width:100%" v-model="formTwoXS.cJudge" clearable placeholder="请选择" multiple :disabled="isDisabled">
                              <el-option  v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId"></el-option>
                            </el-select>
                            <!-- <el-input v-model="formTwoXS.cJudge" type="textarea"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="监测分析触发点：" prop="cPoints">
                            <el-input  placeholder="监测分析触发点：,最长为200字符"  v-model="formTwoXS.cPoints" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易主体身份及相关信息：" prop="cSubject">
                            <el-input  placeholder="交易主体身份及相关信息：,最长为200字符"  v-model="formTwoXS.cSubject" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="建议：" prop="cSuggest">
                            <el-input  placeholder="建议,最长为200字符"  v-model="formTwoXS.cSuggest" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="分析概述：">
                            <el-upload
                            :disabled="isDisabled"
                          class="upload-demo"
                          :action="uploadUrlFenXiXS()"
                          ref="showFileListFenXi"
                          :on-success="showFileListFenXi"
                          :before-upload="handleBeforeUploadXSTB"
                          :on-preview="handlePreview"
                          :on-remove="handleRemoveFenXiXS"
                          :before-remove="beforeRemove"
                          multiple
                          :limit="3"
                          :on-exceed="handleExceed"
                          :file-list="fileListFenXiXS">
                            <el-button size="small" style="text-align: center" type="primary" :disabled="isDisabled">点击上传</el-button>
                          </el-upload>
                          <el-table style="width: 100%" :data="fenXiTable.list">
                              <el-table-column type="index" label="序号" fixed></el-table-column>
                              <!-- <el-table-column prop="attachType" label="附件类型" min-width="120" fixed></el-table-column> -->
                              <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                              <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                                <template slot-scope="scope">
                                  <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                                  <el-button v-if="this.keyIndex==='0'" type="text" @click="delRow(scope)">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                        <el-col></el-col>
                      </el-row>    
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane name="secondTwo" v-show="showTBInfo">
                    <el-badge slot="label" v-show="showTBInfo">
                      <span>可疑交易通报</span>
                    </el-badge>
                    <el-form v-show="showTBInfo" ref="formTwoTB" :model="formTwoTB"  label-width="200px">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="可疑交易名称：" prop="aDispose">
                            <el-input type="textarea" v-model="formTwoTB.aDispose" placeholder="可疑交易名称,最长为30字符" :maxlength="30" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易时间段：" prop="aDealdate" class="oddinput">
                            <el-date-picker
                            :disabled="isDisabled"
                              @change="logDate"
                              :picker-options="pickerOptions1"
                              v-model="formTwoTB.aDealdate"
                              type="daterange"
                              range-separator="至"
                              format="yyyy-MM-dd" 
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                            <!-- <el-input v-model="formTwoTB.aDealdate" placeholder="请输入"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="主要交易发生地：" prop="bodyMessage">
                            <el-input type="textarea" placeholder="主要交易发生地,最长为50字符"  v-model="formTwoTB.bodyMessage" :maxlength="50" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="关联移送记录：" prop="triggerMessage">
                            <el-input placeholder="关联移送记录,最长为200字符"  type="textarea" v-model="formTwoTB.triggerMessage" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万元）：" prop="aRmb">
                            <el-input  v-model="formTwoTB.aRmb" placeholder="万元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="累计交易金额（万美元）：" prop="aYb">
                            <el-input v-model="formTwoTB.aYb" placeholder="万美元，最长为20字符" :maxlength="20" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="涉及交易笔数：" prop="aNumber">
                            <el-input placeholder="涉及交易笔数,最长为9字符"  v-model="formTwoTB.aNumber" :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="涉及主要账户个数：" prop="aMainnumber">
                            <el-input placeholder="涉及主要账户个数,最长为9字符"   v-model="formTwoTB.aMainnumber" :maxlength="9" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="初步判断：" prop="aJudge">
                            <el-select style="width:100%" v-model="formTwoTB.aJudge" clearable placeholder="请选择" multiple :disabled="isDisabled">
                              <el-option v-for="item in this.sheZui" :key="item.codeId" :label="item.codeName" :value="item.codeId" ></el-option>
                            </el-select>
                            <!-- <el-input v-model="formTwoTB.aJudge" type="textarea"></el-input> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="监测分析触发点：" prop="aPoints">
                            <el-input placeholder="监测分析触发点,最长为200字符"  v-model="formTwoTB.aPoints" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="交易主体身份及相关信息：" prop="aSubject">
                            <el-input placeholder="交易主体身份及相关信息,最长为200字符"  v-model="formTwoTB.aSubject" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="建议：" prop="aSuggest">
                            <el-input placeholder="建议,最长为200字符"  v-model="formTwoTB.aSuggest" type="textarea" :maxlength="200" :disabled="isDisabled"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="分析概述：">
                            <el-upload
                              :disabled="isDisabled"
                              class="upload-demo"
                              :action="uploadUrlFenXiTB()"
                              ref="showFileListFenXi1"
                              :on-success="showFileListFenXi1"
                              :before-upload="handleBeforeUploadXSTB"
                              :on-preview="handlePreview"
                              :on-remove="handleRemoveFenXiTB"
                              :before-remove="beforeRemove"
                              multiple
                              :limit="3"
                              :on-exceed="handleExceed"
                              :file-list="fileListFenXiTB">
                                <el-button size="small" style="text-align: center" type="primary" :disabled="isDisabled">点击上传</el-button>
                            </el-upload>
                            <el-table style="width: 100%" :data="fenXiTable1.list">
                              <el-table-column type="index" label="序号" fixed></el-table-column>
                              <!-- <el-table-column prop="attachType" label="附件类型" min-width="120" fixed></el-table-column> -->
                              <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
                              <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                                <template slot-scope="scope">
                                  <el-button type="text"  @click="downloadFileById(scope.row.attachId)">下载</el-button>
                                  <el-button v-if="!isDisabled" type="text" @click="delRow(scope)">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <!-- <el-tab-pane name="thirdTwo" :disabled="thrDisable">
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
                  </el-tab-pane> -->
                </el-tabs>
            </el-row>
            
          </el-tab-pane>
          <!-- 附件信息 -->
          <el-tab-pane name="five">
            <el-badge slot="label">
              <span>附件信息</span>
            </el-badge>
            <div class="accestitle">附件列表</div>
            <!-- <div class="divider divider-horizontal"></div> -->
            <div class="btnlist" v-if="!isDisabled">
              <el-upload
                style="display:inline-block;"
                class="upload-demo"
                v-if="showXSInfo"
                :action="uploadUrl3"
                :on-success="showFileListFj"
                :before-upload="handleBeforeUploadXSTB"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :show-file-list="showUploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileListFj">
                  <el-button size="small" type="primary">上传附件</el-button>
              </el-upload>
              <el-upload
                v-if="showTBInfo"
                style="display:inline-block;"
                class="upload-demo"
                :action="uploadUrl4"
                :on-success="showFileListFj"
                :before-upload="handleBeforeUploadXSTB"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :show-file-list="showUploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileListFj">
                  <el-button size="small" type="primary">上传附件</el-button>
              </el-upload>
            </div>
            <el-table style="width: 100%" :data="accessoryTable.list">
              <el-table-column type="index" label="序号" fixed></el-table-column>
              <!-- <el-table-column prop="attachType" label="附件类型" min-width="120" fixed></el-table-column> -->
              <el-table-column prop="attachName" label="附件名称" align="right"></el-table-column>
              <el-table-column prop="option" fixed="right" label="操作" min-width="80" align="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="downloadFileById(scope.row.attachId)">下载</el-button>
                  <el-button v-if="!isDisabled" type="text" @click="delRow(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="accessoryTable.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="accessoryTable.total" background></el-pagination> -->

          </el-tab-pane>
          <!-- 办理信息 -->
          <!-- <el-tab-pane name="six">
            <el-badge slot="label">
              <span>办理信息</span>
            </el-badge>
            <el-table style="width: 100%" :data="tableData">
              <el-table-column type="index" label="序号" width="100" fixed></el-table-column>
              <el-table-column prop="name" label="节点名称" min-width="120" fixed></el-table-column>
              <el-table-column prop="user" label="办理人" width="180" fixed></el-table-column>
              <el-table-column prop="time" label="办理时间" min-width="100" fixed></el-table-column>
              <el-table-column prop="idea" label="办理意见" min-width="120" fixed></el-table-column>
              <el-table-column prop="beizhu" label="备注" width="180" fixed></el-table-column>
              <el-table-column prop="write" label="签名" width="180" fixed></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="handleTable.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="40" background></el-pagination>
            <div class="accestitle">流程监控图：</div>
            <div class="map-block">
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
          </el-tab-pane> -->
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
    <!--可疑交易报告预警-->
    <el-dialog class="submitwrap" title="可疑交易报告预警" :visible.sync="kyjybgyjVisible" width="60%">
      <div>
        <el-form :model="formKyjybgyj" label-width="150px">
          <el-form-item label="预警编号：">
            <el-input v-model="formKyjybgyj.warningNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="报文名：">
            <el-input v-model="formKyjybgyj.messageName" disabled></el-input>
          </el-form-item>
          <el-form-item label="报送类型：">
            <el-input v-model="formKyjybgyj.subMissionType" disabled></el-input>
          </el-form-item>
          <el-form-item label="报告机构名称：">
            <el-input v-model="formKyjybgyj.institutionName" disabled></el-input>
          </el-form-item>
          <el-form-item label="报送日期：">
            <el-input v-model="formKyjybgyj.subMissionDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="紧急程度：">
            <el-input v-model="formKyjybgyj.urgencyDegree" disabled></el-input>
          </el-form-item>
          <el-form-item label="涉罪类型：">
            <el-input v-model="formKyjybgyj.crimesType" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="涉罪类型：">
              <el-select v-model="formKyjybgyj.crimesType" placeholder="请选择" multiple disabled style="width: 100% !important">
                <el-option v-for="(item,index) in this.sheZui" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="kyjybgyjVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!--高级名单预警-->
    <el-dialog class="submitwrap" title="高级名单预警" :visible.sync="gjmdyjVisible" width="60%">
      <div>
        <el-form :model="formGjmdyj" label-width="150px">
          <el-form-item label="预警编号：">
            <el-input v-model="formGjmdyj.code" disabled></el-input>
          </el-form-item>
          <el-form-item label="主体名称：">
            <el-input v-model="formGjmdyj.ctnm" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="formGjmdyj.ctid" disabled></el-input>
          </el-form-item>
          <el-form-item label="文件来源编号：">
            <el-input v-model="formGjmdyj.listSourceDocNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="来源方向：">
            <el-input v-model="formGjmdyj.sourceDire" disabled></el-input>
          </el-form-item>
          <el-form-item label="来源业务：">
            <el-input v-model="formGjmdyj.sourceBusiness" disabled></el-input>
          </el-form-item>
          <el-form-item label="信息入库日期：">
            <el-input v-model="formGjmdyj.updatetime" disabled></el-input>
          </el-form-item>
          <el-form-item label="预警时间：">
            <el-input v-model="formGjmdyj.earlywarningtime" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="处置信息：">
            <el-input v-model="formGjmdyj.czInfo" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="状态：">
            <el-input v-model="formGjmdyj.workstatus" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gjmdyjVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!--境内受托协查-->
    <el-dialog class="submitwrap" title="境内受托协查" :visible.sync="jnstxcVisible" width="60%">
      <div>
        <el-form :model="formJnst" label-width="150px">
          <el-form-item label="来件日期：">
            <el-input v-model="formJnst.dateArrial" disabled></el-input>
          </el-form-item>
          <el-form-item label="协查文号：">
            <el-input v-model="formJnst.referenceNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="来文标题：">
            <el-input v-model="formJnst.communicationTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="协查类型：">
            <el-input v-model="formJnst.investigationType" disabled></el-input>
          </el-form-item>
          <el-form-item label="紧急程度：">
            <el-input v-model="formJnst.assUrgency" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="涉罪类型：">
            <el-input v-model="formJnst.crimeType" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="涉罪类型：">
              <el-select v-model="formJnst.crimeType" placeholder="请选择" multiple disabled style="width: 100% !important">
                <el-option v-for="(item,index) in this.sheZui" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="来文单位：">
            <el-input v-model="formJnst.communicationUnite" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jnstxcVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!--规则预警-->
    <el-dialog class="submitwrap" title="规则预警" :visible.sync="gzyjVisible" width="60%">
      <div>
        <el-form :model="formGzyj" label-width="150px">
          <el-form-item label="预警编号：">
            <el-input v-model="formGzyj.yjbh" disabled></el-input>
          </el-form-item>
          <el-form-item label="主体名称：">
            <el-input v-model="formGzyj.bodyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="formGzyj.certNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="预警日期：">
            <el-input v-model="formGzyj.yjDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-input v-model="formGzyj.status" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gzyjVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!--模型预警-->
    <el-dialog class="submitwrap" title="模型预警" :visible.sync="mxyjVisible" width="60%">
      <div>
        <el-form :model="formMxyj" label-width="150px">
          <el-form-item label="预警编号：">
            <el-input v-model="formMxyj.yjbh" disabled></el-input>
          </el-form-item>
          <el-form-item label="主体名称：">
            <el-input v-model="formMxyj.bodyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="formMxyj.certNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="预警日期：">
            <el-input v-model="formMxyj.yjDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-input v-model="formMxyj.status" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mxyjVisible = false">返回</el-button>
      </span>
    </el-dialog>
        <!--上报分析申请-->
    <el-dialog class="submitwrap" title="上报分析申请" :visible.sync="sbypxsVisible" width="60%">
      <div>
        <add :sbypxsId="sbypxsId"></add>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sbypxsVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <el-dialog class="submitwrap" title="举报" :visible.sync="juBaoVisible" width="70%">
      <div>
        <ju-bao :juBaoId="juBaoId"></ju-bao>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="juBaoVisible = false">返回</el-button>
      </span>
    </el-dialog>
      <!--境外受托协查-->
    <el-dialog class="submitwrap" title="境外受托协查" :visible.sync="jingWaiAndGuoJi" width="60%">
      <div>
        <jingWai :jingWaiXtf="jingWaiXtf"></jingWai>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jingWaiAndGuoJi = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAnalysisiIndex } from '@/api/cueManage'
import { mapGetters } from 'vuex'
import { getUUIDTo } from '@/utils'
// 自主分析接口引用
import { triggerInfo, selectSubject, addSubject, selectSubjectList, importSubject, showInfoById,
  downloadSubject, getFileListById, delFileListById, initAnalysisUpdate, getSheZui, getSBId, isEditUser, getClueIdByIndexNum, getJuBaoId } from '@/api/sys-monitoringAnalysis/cueManage/autonomousAnalysis/autonomousAnalysis.js'
import { isValidBlank, noNothing, headerAndFooter } from '@/utils/formValidate' // 校验规则
import { getToken } from '@/utils/auth' // 验权
import add from '@/views/sys-monitoringAnalysis/judgedClues/add'
import juBao from '@/views/sys-monitoringAnalysis/reportingManagement/newQuery.vue'
import jingWai from '@/views/sys-monitoringAnalysis/cueManage/interIntelligence/index'
export default {
  components: {
    add,
    juBao,
    jingWai
  },
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isQiCao: false,
      isDone: false,
      sbypxsId: {
        id: '',
        type: 'xtfZiZhu'
      },
      jingWaiXtf: {
        mailId: '',
        title: '',
        intelBusinessType: '',
        fileType: 0,
        pageFlag: 'lookFlow',
        updateFlag: '',
        theme: ''
      },
      // 规则预警
      formGzyj: {
        yjbh: '',
        bodyName: '',
        certNo: '',
        yjDate: '',
        status: ''
      },
      // 模型预警
      formMxyj: {
        yjbh: '',
        bodyName: '',
        certNo: '',
        yjDate: '',
        status: ''
      },
      mxyjVisible: false,
      // 境内受托协查
      formJnst: {
        dateArrial: '',
        referenceNumber: '',
        communicationTitle: '',
        investigationType: '',
        assUrgency: '',
        crimeType: '',
        communicationUnite: ''
      },
      // 高级名单预警
      formGjmdyj: {
        code: '',
        ctnm: '',
        ctid: '',
        listSourceDocNum: '',
        sourceDire: '',
        sourceBusiness: '',
        updatetime: '',
        earlywarningtime: '',
        czInfo: '',
        workstatus: ''
      },
      // 可疑交易报告预警
      formKyjybgyj: {
        warningNumber: '',
        messageName: '',
        subMissionType: '',
        institutionName: '',
        subMissionDate: '',
        urgencyDegree: '',
        crimesType: ''
      },
      noDis: false,
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      fileListTB: [],
      fileListXS: [],
      fileListZT: [],
      fileListFenXiXS: [],
      fileListFenXiTB: [],
      keyIndex: '', // 标识符用来控制是新增还是返显
      uuId: '',
      newUUId: '', // 线索和通报需要的uuid
      anaIdByBefore: '', // 前面传过来的id
      activeName: 'first', // tabs
      activeNameBefore: '', // tabs
      activeName2: 'firstTwo',
      oneDisable: true,
      secDisable: true,
      thrDisable: true,
      submitVisible: false, // 提交弹框
      closeVisible: false, // 关闭弹框
      adviceVisible: false, // 意见弹框
      searchVisible2: false,
      searchVisible1: false,
      showUploadFile: true, // 附件列表显示
      fileListFj: [],
      juBaoVisible: false,
      juBaoId: '',
      sbypxsVisible: false, // 上报分析申请
      kyjybgyjVisible: false, // 可疑交易报告预警
      jnstxcVisible: false, // 境内受托协查
      gjmdyjVisible: false, // 高级名单预警
      gzyjVisible: false, // 规则预警
      radio: 1, // 提交弹框单选框
      // 工作流处置跳转 -------宋显鹏
      ismanagement: false,
      analysisId: '',
      // 处理单数据
      chuLiTable: {
        hostRoom: '', // 主办公室
        agentsTelephone: '', // 经办人及电话
        fileContent: '', // 内容
        bankLeadIntruc: '', // 行领导批示
        centLeadOpinions: '', // 中心领导意见
        internalOpinions: '', // 内部意见
        counterOpnions: '' // 会签意见
      },
      // 处理单校验规则
      formChuLiRules: {
        // 主办处室
        hostRoom: [
          { validator: headerAndFooter, trigger: 'blur' }
        ],
        // 经办人及电话
        agentsTelephone: [
          { validator: headerAndFooter, trigger: 'blur' }
        ],
        // 请示内容
        fileContent: [
        ],
        // 行领导批示
        bankLeadIntruc: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 中心领导意见
        centLeadOpinions: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 内部意见
        internalOpinions: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 会签意见
        counterOpnions: [
          { validator: isValidBlank, trigger: 'blur' }
        ]
      },
      // 触发信息表单
      form: {
        triggerType: 1,
        triggerForm: '',
        radioInput: '',
        index: '',
        radio: '可疑交易线索'
      },
      showRadio: false, // 触发信息按钮显示
      showInput: false, // 触发信息按钮显示
      // 触发信息校验
      formRules: {
        triggerForm: [
          { required: true, message: '请选择触发来源' }
        ],
        index: [
          { validator: noNothing, trigger: 'blur' },
          { required: true, message: '内容不能为空' }
        ],
        radioInput: [
          { validator: isValidBlank, trigger: 'blur' }
        ]
      },
      // 主体信息弹窗
      formMainVisible: false,
      // 表单label长度
      formLabelWidth: '120px',
      // 新增主体信息表单
      addFormMain: {
        account: '', // 账号
        bodyType: '', // 主体类型
        certiNum: '', // 主体证件号
        detalInfo: '', // 备注
        dimeType: '', // 可疑类型
        standInfo: '', // 标注状态
        suspiciousDesc: '', // 可疑描述
        subjectName: '' // 主体名称
      },
      // 新增主体信息校验规则
      addFormMainRules: {
        // 账号
        account: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 主体类型
        bodyType: [
          { required: false, message: '内容不能为空', trigger: 'change' }
          // { validator: common_Validate, trigger: 'blur' }
        ],
        // 主体证件号
        certiNum: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号码', trigger: 'blur' }
        ],
        // 备注
        detalInfo: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 可疑类型
        dimeType: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 标注状态
        standInfo: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 主体名称
        subjectName: [
          { required: false, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ]
      },
      // 主体信息表单
      formMain: {
        mainName: '', // 主体名称
        idNum: '', // 主体证件号
        account: '', // 账号
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10
      },
      // 主体信息查询校验规则
      formMainRef: {
        //  主体名称
        mainName: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 主体证件号
        idNum: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 账号
        account: [
          { validator: isValidBlank, trigger: 'blur' }
        ]
      },
      // 主体信息列表
      formMainTable: {
      // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        // 总条数
        total: 10
      },
      // 主体信息导入列表
      fileList: [],
      fileList1: [],
      showFile: false,
      // 正文信息
      formTwo: {
        info: [],
        name: '',
        record: ''
      },
      sheZui: [], // 涉罪类型
      // 可疑交易线索数据
      formTwoXS: {
        // ------下面是可疑交易线索数据字段------//
        cDispose: '', // 可疑交易线索----可疑交易名称
        ctriggerMessage: '', // 可疑交易线索----关联移送记录
        cbodyMessage: '', // 可疑交易线索----主要交易发生地
        cDealdate: '', // 可疑交易线索----交易时间段
        cRmb: '', //  可疑交易线索----累计交易金额(人民币)
        cYb: '', //  可疑交易线索----累计交易金额(外币)
        cNumber: '', //  可疑交易线索----涉及交易笔数
        cMainnumber: '', //  可疑交易线索----涉及主要账户个数
        cJudge: [], //  可疑交易线索----初步判断
        cSubject: '', // 可疑交易线索----交易主体身份及相关信息
        cPoints: '', // 可疑交易线索----检测分析触发点
        cSuggest: '' // 可疑交易线索----建议，
      },
      showXSInfo: false,
      // 可疑交易线索校验
      formTwoXSRules: {
        // 可疑交易线索----可疑交易名称
        cDispose: [
        ],
        // 可疑交易线索----关联移送记录
        ctriggerMessage: [
        ],
        // 可疑交易线索----主要交易发生地
        cbodyMessage: [
        ],
        // 可疑交易线索----交易时间段
        cDealdate: [
        ],
        //  可疑交易线索----累计交易金额(人民币)
        cRmb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        //  可疑交易线索----累计交易金额(外币)
        cYb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        //  可疑交易线索----涉及交易笔数
        cNumber: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        //  可疑交易线索----涉及主要账户个数
        cMainnumber: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        //  可疑交易线索----初步判断
        cJudge: [
        ],
        // 可疑交易线索----交易主体身份及相关信息
        cSubject: [
        ],
        // 可疑交易线索----检测分析触发点
        cPoints: [
        ],
        // 可疑交易线索----建议
        cSuggest: [
        ]
      },
      // 可疑交易通报
      formTwoTB: {
        // ------下面是可疑交易通报数据字段------//
        aDispose: '', // 可疑交易通报----可疑交易名称
        triggerMessage: '', // 可疑交易通报----关联移送记录
        bodyMessage: '', // 可疑交易通报----主要交易发生地
        aDealdate: '', // 可疑交易通报----交易时间段
        aRmb: '', // 可疑交易通报----累计交易金额(人民币)
        aYb: '', // 可疑交易通报----累计交易金额(外币)
        aNumber: '', // 可疑交易通报----涉及交易笔数
        aMainnumber: '', // 可疑交易通报----涉及主要账户个数
        aJudge: [], // 可疑交易通报----初步判断
        aSubject: '', // 可疑交易通报----交易主体身份及相关信息
        aPoints: '', // 可疑交易通报----检测分析触发点
        aSuggest: '' // 可疑交易通报----建议
      },
      showTBInfo: false,
      formTwoTBRules: {
        // 可疑交易通报----可疑交易名称
        aDispose: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 可疑交易通报----关联移送记录
        triggerMessage: [
        ],
        // 可疑交易通报----主要交易发生地
        bodyMessage: [
        ],
        // 可疑交易通报----交易时间段
        aDealdate: [
        ],
        // 可疑交易通报----累计交易金额(人民币)
        aRmb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // 可疑交易通报----累计交易金额(外币)
        aYb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // 可疑交易通报----涉及交易笔数
        aNumber: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 可疑交易通报----涉及主要账户个数
        aMainnumber: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 可疑交易通报----初步判断
        aJudge: [
        ],
        // 可疑交易通报----交易主体身份及相关信息
        aSubject: [
        ],
        // 可疑交易通报----检测分析触发点
        aPoints: [
        ],
        // 可疑交易通报----建议
        aSuggest: [
        ]
      },
      // 附件列表模块--附件列表
      accessoryTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        // 总条数
        total: 0
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
      ],
      fenXiTable: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        // 总条数
        total: 0
      },
      fenXiTable1: {
        // 请求信息分页
        list: [],
        // 默认开始页码
        currentPage: 1,
        // 每页显示条数
        pagesize: 10,
        // 总条数
        total: 0
      },
      stopRepeat: 0,
      isDisabled: true,
      keyIndexDaigo: false,
      submitFlag: false,
      zhuTiCount: 0,
      jingWaiAndGuoJi: false,
      daoArr: []// 导出的数组
    }
  },
  watch: {
    businessFlag(val) {
      if (val) this.updateForm()
      this.$store.dispatch('changeFlag', false)
    },
    workFlow: {
      www(newVal, oldVal) {
        console.log(newVal, 333)
      }
    },
    formContent: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal.workflow.nodeAttributes) {
          if (newVal.workflow.nodeAttributes.length > 0) {
            if (newVal.workflow.nodeAttributes[0].extendKey === 'editFlag' && newVal.workflow.nodeAttributes[0].extendValue === 'Y') {
              this.isDisabled = false
            } else {
              this.isDisabled = true
              this.formRules = {}
              this.formTwoXSRules = {}
              this.formTwoTBRules = {}
            }
          }
        }

        // console.log(newVal.cluesDO.cId)
        // var info = newVal.initAnalysisDO
        // this.anaId = info.anaId
        // this.cId = newVal.cluesDO.cId
        // console.log(this.cId)
        // this.conductId = newVal.documentsDO.conductId
        // -----处理单数据----- //
        if (newVal.processDO) {
          this.proId = newVal.processDO.proId
          this.chuLiTable.hostRoom = newVal.processDO.hostRoom // 主办公室
          this.chuLiTable.agentsTelephone = newVal.processDO.agentsTelephone // 经办人及电话
          this.chuLiTable.fileContent = newVal.processDO.fileContent // 内容
          this.chuLiTable.bankLeadIntruc = newVal.processDO.bankLeadIntruc // 行领导批示
          this.chuLiTable.centLeadOpinions = newVal.processDO.centLeadOpinions // 中心领导意见
          this.chuLiTable.internalOpinions = newVal.processDO.internalOpinions // 内部意见
          this.chuLiTable.counterOpnions = newVal.processDO.counterOpnions // 会签意见
        }

        // -----触发信息数据----- //
        this.form.triggerForm = newVal.initAnalysisDO.triggerSource // 触发来源
        this.form.index = newVal.initAnalysisDO.anaIndexNum // 索引编号
        if (this.form.triggerForm === '其他来源' || this.form.triggerForm === '普通名单预警' || this.form.triggerForm === '互联网舆情' || this.form.triggerForm === '领导批示') {
          this.showRadio = true
          this.showInput = true
          this.form.radioInput = newVal.initAnalysisDO.radioInput
        }
        this.formMainTable.list = newVal.subjectDOList
        // -----正文信息中的可疑交易线索数据----- //
        if (newVal.cluesDO) {
          this.anaId = newVal.cluesDO.anaId
          this.form.radio = '可疑交易线索'
          this.isShow = true
          this.activeName2 = 'firstTwo'
          this.showXSInfo = true
          this.showTBInfo = false
          this.bOrC = true
          this.cId = newVal.cluesDO.cId
          this.formTwoXS.cDispose = newVal.cluesDO.cDispose // 可疑交易名称
          this.formTwoXS.ctriggerMessage = newVal.cluesDO.cTriggerMessage // 关联移送记录
          this.formTwoXS.cbodyMessage = newVal.cluesDO.cBodymessage // 主要交易发生地
          // this.formTwoXS.cDealdate = JSON.parse(newVal.cluesDO.cDealdate) || '' // 交易时间段
          this.formTwoXS.cDealdate = newVal.cluesDO.cDealdate.split(',')// 交易时间段
          this.formTwoXS.cRmb = newVal.cluesDO.cRmb // 累计交易金额(人民币)
          this.formTwoXS.cYb = newVal.cluesDO.cYb // 累计交易金额(外币)
          this.formTwoXS.cNumber = newVal.cluesDO.cNumber // 涉及交易笔数
          this.formTwoXS.cMainnumber = newVal.cluesDO.cMainnumber // 涉及主要账户个数
          this.formTwoXS.cJudge = JSON.parse(newVal.cluesDO.cJudge) // 初步判断
          this.formTwoXS.cSubject = newVal.cluesDO.cSubject // 交易主体身份及相关信息
          this.formTwoXS.cPoints = newVal.cluesDO.cPoints // 检测分析触发点
          this.formTwoXS.cSuggest = newVal.cluesDO.cSuggest // 建议
          getFileListById(newVal.cluesDO.cId).then(res => {
            this.fenXiTable.list = res.data
          })
        } else {
          this.bOrC = false
        }
        if (newVal.bulletinDO) {
          this.anaId = newVal.bulletinDO.anaId
          // -----正文信息中的可疑交易通报数据----- //
          this.form.radio = '可疑交易通报'
          this.isShow = true
          this.activeName2 = 'secondTwo'
          this.showXSInfo = false
          this.showTBInfo = true
          this.aId = newVal.bulletinDO.aId
          this.formTwoTB.aDispose = newVal.bulletinDO.aDispose // 可疑交易名称
          this.formTwoTB.triggerMessage = newVal.bulletinDO.triggerMessage // 关联移送记录
          this.formTwoTB.bodyMessage = newVal.bulletinDO.bodyMessage // 主要交易发生地
          // this.formTwoTB.aDealdate = JSON.parse(newVal.bulletinDO.aDealdate) || '' // 交易时间段
          this.formTwoTB.aDealdate = newVal.bulletinDO.aDealdate.split(',') // 交易时间段
          this.formTwoTB.aRmb = newVal.bulletinDO.aRmb // 累计交易金额(人民币)
          this.formTwoTB.aYb = newVal.bulletinDO.aYb // 累计交易金额(外币)
          this.formTwoTB.aNumber = newVal.bulletinDO.aNumber // 涉及交易笔数
          this.formTwoTB.aMainnumber = newVal.bulletinDO.aMainnumber // 涉及主要账户个数
          this.formTwoTB.aJudge = JSON.parse(newVal.bulletinDO.aJudge) // 初步判断
          this.formTwoTB.aSubject = newVal.bulletinDO.aSubject // 交易主体身份及相关信息
          this.formTwoTB.aPoints = newVal.bulletinDO.aPoints // 检测分析触发点
          this.formTwoTB.aSuggest = newVal.bulletinDO.aSuggest // 建议
          getFileListById(newVal.bulletinDO.aId).then(res => {
            this.fenXiTable1.list = res.data
          })
        }
        if (newVal.attachFile) {
          this.accessoryTable.list = newVal.attachFile
        }
        // 判断状态是不是已办，
        if (newVal.workflow.roleType !== 'done') {
          this.isDone = false
          isEditUser(this.anaId).then(res => {
            if (res.code === 200) {
              if (res.data === true) {
                this.isQiCao = true
              } else {
                this.isQiCao = false
              }
            }
            console.log(res)
          }).catch(() => {
            console.log(1111)
          })
        } else {
          this.isDone = true
        }
        // 获取流转信息
        // recode(newVal.workflow.proInstId).then(res => {
        //   console.log(res)
        //   if (res.data) {
        //     this.liuZhuan.list = res.data
        //   }
        // })
      }
    }
  },
  computed: {
    ...mapGetters(['institution']),
    ...mapGetters(['businessFlag', 'workFlow2business', 'formContent']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    // 上传附件
    uploadUrl() {
      return `monitor/initiative/importSubject?anaId=` + this.anaId + `&token=` + getToken()
    },
    // 上传可疑交易线索表
    uploadUrl1() {
      return `monitor/initiative/uploadClues?token=` + getToken()
    },
    // 上传可疑交易通报表
    uploadUrl2() {
      return `monitor/initiative/uploadBulletin?token=` + getToken()
    },
    // 附件列表--上传附件线索
    uploadUrl3() {
      return `/monitor/initiative/uploadAttach?mainId=` + this.anaId + `&token=` + getToken() + '&type=clue'
    },
    // 附件列表--上传附件通报
    uploadUrl4() {
      return `/monitor/initiative/uploadAttach?mainId=` + this.anaId + `&token=` + getToken() + '&type=bulletin'
    },

    // 下载主体信息模板
    // downloadMb1() {
    //   return `/monitor/initiative/downloadNameTemplate?token=` + getToken()
    // },
    // 下载可疑交易模板
    // downloadMb2() {
    //   location.href = `/monitor/initiative/downloadSuspiciousTemplate?token=` + getToken()
    // },
    // 下载可疑交易模板
    downloadZT() {
      return `/monitor/initiative/subjectExport?ids=` + this.daoArr.join(',') + `&token=` + getToken()
    }
  },
  mounted() {
    this.getSheZuiLX()
    // 前面页面传过来的状态码用来判断是查看还是新增
    // this.keyIndex = this.$route.query.keyIndex
    if (this.keyIndex === '0') {
      this.isShow = true
      this.activeName2 = 'firstTwo'
      this.showXSInfo = true
      this.showTBInfo = false
      this.uuId = getUUIDTo()
      this.newUUId = this.newGetUUIDTo()
      this.getSheZuiLX()
    }
    if (this.keyIndex === '1') {
      this.uuId = this.$route.query.anaId
      this.showFileListById()
      this.seeInfoById()
      this.getMainNameList()
      this.getSheZuiLX()
    }

    if (this.keyIndex === '2') {
      this.form.triggerForm = this.$route.query.triggerForm
      this.form.index = this.$route.query.index
      this.isShow = true
      this.activeName2 = 'firstTwo'
      this.showXSInfo = true
      this.showTBInfo = false
      this.uuId = getUUIDTo()
      this.newUUId = this.newGetUUIDTo()
      this.getSheZuiLX()
      this.keyIndexDaigo = true
    }
  },
  methods: {
    certificateone() {
      switch (this.addFormMain.bodyType) {
        case '个人':
          this.addFormMainRules.certiNum = [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号码', trigger: 'blur' }
          ]
          this.addFormMainRules.subjectName = [
            { required: false, message: '内容不能为空', trigger: 'blur' },
            { validator: isValidBlank, trigger: 'blur' }
          ]
          break
        case '机构':
          this.addFormMainRules.subjectName = [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: isValidBlank, trigger: 'blur' }
          ]
          this.addFormMainRules.certiNum = [
            { required: false, message: '内容不能为空', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号码', trigger: 'blur' }
          ]
          break
      }
    },
    // 分析概述线索上传
    uploadUrlFenXiXS() {
      return `/monitor/initiative/uploadAttach?mainId=` + this.cId + `&token=` + getToken() + '&type=clue'
    },
    // 分析概述通报上传
    uploadUrlFenXiTB() {
      return `/monitor/initiative/uploadAttach?mainId=` + this.aId + `&token=` + getToken() + '&type=bulletin'
    },
    updateForm11() {
      // bOrC是用来判断正文信息中是线索还是通报
      if (this.bOrC === false) {
        const formArchivesInfo = {
          anaId: this.anaId,
          workflow: this.workFlow2business,
          triggerSource: this.form.triggerForm,
          indexNum: this.form.index,
          processDO: {
            proId: this.proId || '',
            hostRoom: this.chuLiTable.hostRoom,
            agentsTelephone: this.chuLiTable.agentsTelephone,
            fileContent: this.chuLiTable.fileContent,
            bankLeadIntruc: this.chuLiTable.bankLeadIntruc,
            centLeadOpinions: this.chuLiTable.centLeadOpinions,
            internalOpinions: this.chuLiTable.internalOpinions,
            counterOpnions: this.chuLiTable.counterOpnions
          },
          bulletinDO: {
            aId: this.aId + '1',
            aDispose: this.formTwoTB.aDispose,
            triggerMessage: this.formTwoTB.triggerMessage,
            bodyMessage: this.formTwoTB.bodyMessage,
            aDealdate: this.formTwoTB.aDealdate,
            aRmb: this.formTwoTB.aRmb,
            aYb: this.formTwoTB.aYb,
            aNumber: this.formTwoTB.aNumber,
            aMainnumber: this.formTwoTB.aMainnumber,
            aJudge: this.formTwoTB.aJudge,
            aSubject: this.formTwoTB.aSubject,
            aPoints: this.formTwoTB.aPoints,
            aSuggest: this.formTwoTB.aSuggest
          },
          subjectDOList: this.formMainTable.list
        }
        initAnalysisUpdate(formArchivesInfo).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        })
      } else {
        const formArchivesInfo = {
          anaId: this.anaId,
          workflow: this.workFlow2business,
          triggerSource: this.form.triggerForm,
          indexNum: this.form.index,
          processDO: {
            proId: this.proId || '',
            hostRoom: this.chuLiTable.hostRoom,
            agentsTelephone: this.chuLiTable.agentsTelephone,
            fileContent: this.chuLiTable.fileContent,
            bankLeadIntruc: this.chuLiTable.bankLeadIntruc,
            centLeadOpinions: this.chuLiTable.centLeadOpinions,
            internalOpinions: this.chuLiTable.internalOpinions,
            counterOpnions: this.chuLiTable.counterOpnions
          },
          cluesDO: {
            cId: this.cId,
            cDispose: this.formTwoXS.cDispose,
            ctriggerMessage: this.formTwoXS.ctriggerMessage,
            cbodyMessage: this.formTwoXS.cbodyMessage,
            cDealdate: this.formTwoXS.cDealdate,
            cRmb: this.formTwoXS.cRmb,
            cYb: this.formTwoXS.cYb,
            cNumber: this.formTwoXS.cNumber,
            cMainnumber: this.formTwoXS.cMainnumber,
            cJudge: this.formTwoXS.cJudge,
            cSubject: this.formTwoXS.cSubject,
            cPoints: this.formTwoXS.cPoints,
            cSuggest: this.formTwoXS.cSuggest
          },
          subjectDOList: this.formMainTable.list
        }
        initAnalysisUpdate(formArchivesInfo).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$store.dispatch('changeFlag', false)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          }
        })
      }
    },
    downloadMb2() {
      location.href = `/monitor/initiative/downloadSuspiciousTemplate?token=` + getToken()
    },
    // 下载主体信息模板
    downloadMb1() {
      location.href = `/monitor/initiative/downloadNameTemplate?token=` + getToken()
    },
    changeRadio(val) {
      if (val === '其他来源' || val === '普通名单预警' || val === '互联网舆情' || val === '领导批示') {
        this.showRadio = true
        this.showInput = true
        this.form.radioInput = ''
      } else {
        this.showRadio = false
        this.showInput = false
        this.form.radioInput = ''
      }
    },
    // 获取涉罪类型
    getSheZuiLX() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
    },
    // 清空主体信息查询条件
    clearSubject() {
      this.formMain.mainName = ''
      this.formMain.idNum = ''
      this.formMain.account = ''
    },
    // 导出列表选择框
    handleSelectionChange(val, rows) {
      if (val.length > 0) {
        this.daoArr = []
        val.forEach(ele => {
          this.daoArr.push(ele.subId)
        })
      } else {
        this.daoArr = []
      }
    },
    // 导出
    subjectExport() {
      if (this.daoArr.length === 0 || this.daoArr === []) {
        this.$message({
          type: 'error',
          message: '至少勾选一条主体信息进行导出'
        })
        return false
      } else {
        location.href = `/monitor/initiative/subjectExport?ids=` + this.daoArr.join(',') + `&token=` + getToken()
      }

      // subjectExport(this.daoArr.join(',')).then(res => {
      //   if (res.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '导出成功'
      //     })
      //   }
      // })
    },
    logDate() {
      console.log(this.formTwoTB.aDealdate)
    },
    // 新造的uuid
    newGetUUIDTo() {
      return 'xxxxxxxxxxxx4xxxyxxxxxxzxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
      })
    },
    // 保存表单
    updateForm() {
      if (this.stopRepeat === 1) {
        return false
      } else {
        // 先校验处理单信息
        if (this.form.radio === '可疑交易线索') {
          this.$refs['formChuLiRule'].validate((valid) => {
            if (valid) {
              // 处理单校验通过后在校验触发信息
              this.$refs['form'].validate((valid) => {
                // 触发信息校验通过后在校验正文信息
                if (valid) {
                  this.$refs['formTwoXS'].validate((valid) => {
                    if (valid) {
                      this.stopRepeat++
                      const obj = {
                        anaId: this.anaId,
                        workflow: this.workFlow2business,
                        triggerSource: this.form.triggerForm,
                        indexNum: this.form.index,
                        radioInput: this.form.radioInput,
                        processDO: {
                          proId: this.proId || '',
                          hostRoom: this.chuLiTable.hostRoom,
                          agentsTelephone: this.chuLiTable.agentsTelephone,
                          fileContent: this.chuLiTable.fileContent,
                          bankLeadIntruc: this.chuLiTable.bankLeadIntruc,
                          centLeadOpinions: this.chuLiTable.centLeadOpinions,
                          internalOpinions: this.chuLiTable.internalOpinions,
                          counterOpnions: this.chuLiTable.counterOpnions
                        },
                        cluesDO: {
                          cId: this.cId,
                          cDispose: this.formTwoXS.cDispose,
                          ctriggerMessage: this.formTwoXS.ctriggerMessage,
                          cbodyMessage: this.formTwoXS.cbodyMessage,
                          cDealdate: this.formTwoXS.cDealdate.join(','),
                          cRmb: this.formTwoXS.cRmb,
                          cYb: this.formTwoXS.cYb,
                          cNumber: this.formTwoXS.cNumber,
                          cMainnumber: this.formTwoXS.cMainnumber,
                          cJudge: this.formTwoXS.cJudge,
                          cSubject: this.formTwoXS.cSubject,
                          cPoints: this.formTwoXS.cPoints,
                          cSuggest: this.formTwoXS.cSuggest
                        },
                        subjectDOList: this.formMainTable.list
                      }
                      initAnalysisUpdate(obj).then(res => {
                        if (res.code === 200) {
                          this.$message({
                            message: '提交成功',
                            type: 'success'
                          })
                          this.$store.dispatch('changeFlag', false)
                          setTimeout(() => {
                            this.$router.push({ name: 'home' })
                          }, 1000)
                        }
                      })
                    } else {
                      this.$message({
                        type: 'error',
                        message: '正文信息中的可疑交易线索校验不通过，请仔细检查'
                      })
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '触发信息校验不通过，请仔细检查'
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '处理单校验不通过，请仔细检查'
              })
            }
          })
        } else {
          this.$refs['formChuLiRule'].validate((valid) => {
            if (valid) {
              // 处理单校验通过后在校验触发信息
              this.$refs['form'].validate((valid) => {
                // 触发信息校验通过后在校验正文信息
                if (valid) {
                  this.$refs['formTwoTB'].validate((valid) => {
                    if (valid) {
                      this.stopRepeat++
                      const obj = {
                        anaId: this.anaId,
                        workflow: this.workFlow2business,
                        triggerSource: this.form.triggerForm,
                        indexNum: this.form.index,
                        radioInput: this.form.radioInput,
                        processDO: {
                          proId: this.proId || '',
                          hostRoom: this.chuLiTable.hostRoom,
                          agentsTelephone: this.chuLiTable.agentsTelephone,
                          fileContent: this.chuLiTable.fileContent,
                          bankLeadIntruc: this.chuLiTable.bankLeadIntruc,
                          centLeadOpinions: this.chuLiTable.centLeadOpinions,
                          internalOpinions: this.chuLiTable.internalOpinions,
                          counterOpnions: this.chuLiTable.counterOpnions
                        },
                        bulletinDO: {
                          aId: this.aId + '1',
                          aDispose: this.formTwoTB.aDispose,
                          triggerMessage: this.formTwoTB.triggerMessage,
                          bodyMessage: this.formTwoTB.bodyMessage,
                          aDealdate: this.formTwoTB.aDealdate.join(','),
                          aRmb: this.formTwoTB.aRmb,
                          aYb: this.formTwoTB.aYb,
                          aNumber: this.formTwoTB.aNumber,
                          aMainnumber: this.formTwoTB.aMainnumber,
                          aJudge: this.formTwoTB.aJudge,
                          aSubject: this.formTwoTB.aSubject,
                          aPoints: this.formTwoTB.aPoints,
                          aSuggest: this.formTwoTB.aSuggest
                        },
                        subjectDOList: this.formMainTable.list
                      }
                      initAnalysisUpdate(obj).then(res => {
                        if (res.code === 200) {
                          this.$message({
                            message: '提交成功',
                            type: 'success'
                          })
                          this.$store.dispatch('changeFlag', false)
                          setTimeout(() => {
                            this.$router.push({ name: 'home' })
                          }, 1000)
                        }
                      })
                    } else {
                      this.$message({
                        type: 'error',
                        message: '正文信息中的可疑交易通报校验不通过，请仔细检查'
                      })
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '触发信息校验不通过，请仔细检查'
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '处理单校验不通过，请仔细检查'
              })
            }
          })
        }
      }
    },
    // 通过anaId查看主体信息详情
    seeInfoById() {
      showInfoById(this.uuId).then(res => {
        // -----处理单数据----- //
        if (res.data.processDO) {
          this.chuLiTable.hostRoom = res.data.processDO.hostRoom // 主办公室
          this.chuLiTable.agentsTelephone = res.data.processDO.agentsTelephone // 经办人及电话
          this.chuLiTable.fileContent = res.data.processDO.fileContent // 内容
          this.chuLiTable.bankLeadIntruc = res.data.processDO.bankLeadIntruc // 行领导批示
          this.chuLiTable.centLeadOpinions = res.data.processDO.centLeadOpinions // 中心领导意见
          this.chuLiTable.internalOpinions = res.data.processDO.internalOpinions // 内部意见
          this.chuLiTable.counterOpnions = res.data.processDO.counterOpnions // 会签意见
        }

        // -----触发信息数据----- //
        if (res.data.intiAnalysisDO) {
          this.form.triggerForm = res.data.intiAnalysisDO.triggerSource // 触发来源
          this.form.index = res.data.intiAnalysisDO.anaIndexNum // 索引编号
          if (this.form.triggerForm === '其他来源' || this.form.triggerForm === '普通名单预警' || this.form.triggerForm === '互联网舆情' || this.form.triggerForm === '领导批示') {
            this.showRadio = true
            this.showInput = true
            this.form.radioInput = res.data.intiAnalysisDO.radioInput
          }
        }
        // -----正文信息中的可疑交易线索数据----- //
        if (res.data.cluesDO !== null && res.data.cluesDO !== undefined) {
          this.form.radio = '可疑交易线索'
          this.isShow = true
          this.activeName2 = 'firstTwo'
          this.showXSInfo = true
          this.showTBInfo = false
          this.formTwoXS.cDispose = res.data.cluesDO.cdispose // 可疑交易名称
          this.formTwoXS.ctriggerMessage = res.data.cluesDO.ctriggerMessage // 关联移送记录
          this.formTwoXS.cbodyMessage = res.data.cluesDO.cbodymessage // 主要交易发生地
          // this.formTwoXS.cDealdate = JSON.parse(res.data.cluesDO.cdealdate) || '' // 交易时间段
          this.formTwoXS.cDealdate = res.data.cluesDO.cdealdate.split(',')// 交易时间段
          this.formTwoXS.cRmb = res.data.cluesDO.crmb // 累计交易金额(人民币)
          this.formTwoXS.cYb = res.data.cluesDO.cyb // 累计交易金额(外币)
          this.formTwoXS.cNumber = res.data.cluesDO.cnumber // 涉及交易笔数
          this.formTwoXS.cMainnumber = res.data.cluesDO.cmainnumber // 涉及主要账户个数
          this.formTwoXS.cJudge = JSON.parse(res.data.cluesDO.cjudge) // 初步判断
          this.formTwoXS.cSubject = res.data.cluesDO.csubject // 交易主体身份及相关信息
          this.formTwoXS.cPoints = res.data.cluesDO.cpoints // 检测分析触发点
          this.formTwoXS.cSuggest = res.data.cluesDO.csuggest // 建议
          getFileListById(res.data.cluesDO.cid).then(res => {
            this.fenXiTable.list = res.data
          })
        }
        this.formMainTable.list = res.data.pageInfo.list
        this.formMainTable.total = res.data.pageInfo.total
        if (res.data.bulletinDO !== null && res.data.bulletinDO !== undefined) {
          // -----正文信息中的可疑交易通报数据----- //
          this.form.radio = '可疑交易通报'
          this.isShow = true
          this.activeName2 = 'secondTwo'
          this.showXSInfo = false
          this.showTBInfo = true
          this.formTwoTB.aDispose = res.data.bulletinDO.adispose // 可疑交易名称
          this.formTwoTB.triggerMessage = res.data.bulletinDO.triggerMessage // 关联移送记录
          this.formTwoTB.bodyMessage = res.data.bulletinDO.bodyMessage // 主要交易发生地
          // this.formTwoTB.aDealdate = JSON.parse(res.data.bulletinDO.adealdate) || '' // 交易时间段
          this.formTwoTB.aDealdate = res.data.bulletinDO.adealdate.split(',') // 交易时间段
          this.formTwoTB.aRmb = res.data.bulletinDO.armb // 累计交易金额(人民币)
          this.formTwoTB.aYb = res.data.bulletinDO.ayb // 累计交易金额(外币)
          this.formTwoTB.aNumber = res.data.bulletinDO.anumber // 涉及交易笔数
          this.formTwoTB.aMainnumber = res.data.bulletinDO.amainnumber // 涉及主要账户个数
          this.formTwoTB.aJudge = JSON.parse(res.data.bulletinDO.ajudge) // 初步判断
          this.formTwoTB.aSubject = res.data.bulletinDO.asubject // 交易主体身份及相关信息
          this.formTwoTB.aPoints = res.data.bulletinDO.apoints // 检测分析触发点
          this.formTwoTB.aSuggest = res.data.bulletinDO.asuggest // 建议
          getFileListById(res.data.bulletinDO.aid).then(res => {
            this.fenXiTable1.list = res.data
          })
        }
      })
    },
    // 回显的附件列表
    showFileListById() {
      getFileListById(this.uuId).then(res => {
        this.accessoryTable.list = res.data
      })
    },
    // 触发信息查询详情
    showTriggerInfo(id) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.triggerForm === '境内受托协查') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: this.form.index, // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.jnstxcVisible = true
                this.formJnst.dateArrial = res.data.dateArrial
                this.formJnst.referenceNumber = res.data.referenceNumber
                this.formJnst.communicationTitle = res.data.communicationTitle
                this.formJnst.investigationType = res.data.investigationType
                this.formJnst.assUrgency = res.data.assUrgency
                this.formJnst.crimeType = JSON.parse(res.data.crimeType)
                this.formJnst.communicationUnite = res.data.communicationUnite
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '可疑交易报告预警') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: this.form.index, // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.kyjybgyjVisible = true
                this.formKyjybgyj.warningNumber = res.data.warningNumber
                this.formKyjybgyj.messageName = res.data.messageName
                this.formKyjybgyj.subMissionType = res.data.subMissionType
                this.formKyjybgyj.institutionName = res.data.institutionName
                this.formKyjybgyj.subMissionDate = res.data.subMissionDate
                this.formKyjybgyj.urgencyDegree = res.data.urgencyDegree
                this.formKyjybgyj.crimesType = res.data.crimesType
                // this.formKyjybgyj.crimesType = JSON.parse(res.data.crimesType)
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '高级名单预警') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: this.form.index, // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.gjmdyjVisible = true
                this.formGjmdyj.code = res.data.list[0].code
                this.formGjmdyj.ctnm = res.data.list[0].ctnm
                this.formGjmdyj.ctid = res.data.list[0].ctid
                this.formGjmdyj.batchdt = res.data.list[0].batchdt
                this.formGjmdyj.taskId = res.data.list[0].taskId
                this.formGjmdyj.listSourceDocNum = res.data.list[0].listSourceDocNum
                this.formGjmdyj.sourceDire = res.data.list[0].sourceDire
                this.formGjmdyj.sourceBusiness = res.data.list[0].sourceBusiness
                this.formGjmdyj.updatetime = res.data.list[0].earlywarningtime
                this.formGjmdyj.earlywarningtime = res.data.list[0].earlywarningtime
                // this.formGjmdyj.workstatus = res.data.workstatus
                switch (res.data.list[0].workstatus) {
                  case '1':
                    this.formGjmdyj.workstatus = '未分配'
                    break
                  case '2':
                    this.formGjmdyj.workstatus = '已分配'
                    break
                  case '3':
                    this.formGjmdyj.workstatus = '处理中'
                    break
                  case '4':
                    this.formGjmdyj.workstatus = '处理完成'
                    break
                }
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          } else if (this.form.triggerForm === '规则预警') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: this.form.index, // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.gzyjVisible = true
                this.formGzyj.yjbh = res.data.warningNum
                this.formGzyj.bodyName = res.data.ctnm
                this.formGzyj.certNo = res.data.ctid
                this.formGzyj.yjDate = res.data.datBegin
                this.formGzyj.status = res.data.status
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '模型预警') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: this.form.index, // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.mxyjVisible = true
                this.formMxyj.bodyName = res.data.subject_name
                this.formMxyj.certNo = res.data.identification_number
                this.formMxyj.yjDate = res.data.m_result_time
                this.formMxyj.yjbh = res.data.warning_number
                this.formMxyj.status = res.data.status
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '上报分析申请') {
            getClueIdByIndexNum(this.form.index).then(res => {
              if (res.code === 200) {
                if (res.data !== '' && res.data !== null) {
                  getSBId(this.form.index).then(res => {
                    if (res.code === 200) {
                      this.sbypxsId.id = res.data
                      this.sbypxsVisible = true
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.message,
                    showClose: true,
                    duration: 6000
                  })
                }
              } else if (res.code === 209) {
                this.$message({
                  type: 'error',
                  message: '未查询到相关信息',
                  showClose: true,
                  duration: 6000
                })
              }
            })

            // this.$router.push({
            //   name: 'judgedClues_add',
            //   params: {
            //     id: id
            //   }
            // })
            // const obj = {
            //   type: this.form.triggerForm, // 触发来源
            //   indexNum: this.form.index, // 索引编号
            //   otherType: this.form.radioInput
            // }
            // triggerInfo(obj).then(res => {
            //   if (res.data !== null && res.data !== []) {
            //     this.mxyjVisible = true
            //     this.formMxyj.bodyName = res.data.subject_name
            //     this.formMxyj.certNo = res.data.identification_number
            //     this.formMxyj.yjDate = res.data.m_result_time
            //     this.formMxyj.yjbh = res.data.warning_number
            //     this.formMxyj.status = res.data.status
            //   } else {
            //     this.$message({
            //       type: 'error',
            //       message: res.message
            //     })
            //   }
            // })
          } else if (this.form.triggerForm === '举报') {
            getJuBaoId(encodeURI(this.form.index)).then(res => {
              if (res.code === 200) {
                if (res.data !== '' && res.data !== null) {
                  // getSBId(this.form.index).then(res => {
                  //   if (res.code === 200) {
                  //     this.sbypxsId = res.data
                  //     this.sbypxsVisible = true
                  //   }
                  // })
                  this.juBaoId = res.data.report.reportId
                  this.juBaoVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: res.message,
                    showClose: true,
                    duration: 6000
                  })
                }
              } else if (res.code === 209) {
                this.$message({
                  type: 'error',
                  message: '未查询到相关信息',
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '境外受托协查') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: encodeURI(this.form.index), // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.jingWaiAndGuoJi = true
                this.jingWaiXtf.mailId = res.data
                this.jingWaiXtf.fileType = '0'
                this.jingWaiXtf.updateFlag = '1'
                this.jingWaiXtf.pageFlag = 'lookFlow'
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else if (this.form.triggerForm === '国际情报转介') {
            const obj = {
              type: this.form.triggerForm, // 触发来源
              indexNum: encodeURI(this.form.index), // 索引编号
              otherType: this.form.radioInput
            }
            triggerInfo(obj).then(res => {
              if (res.data !== null && res.data !== []) {
                this.jingWaiAndGuoJi = true
                this.jingWaiXtf.mailId = res.data
                this.jingWaiXtf.fileType = '3'
                this.jingWaiXtf.updateFlag = '1'
                this.jingWaiXtf.pageFlag = 'lookFlow'
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                  showClose: true,
                  duration: 6000
                })
              }
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '触发信息校验不通过，请仔细检查'
          })
        }
      })

      // const obj = {
      //   type: this.form.triggerForm, // 触发来源
      //   indexNum: this.form.index, // 索引编号
      //   otherType: this.form.radioInput
      // }
      // triggerInfo(obj).then(res => {
      //   this.stxcInfoList = res.data
      //   if (this.stxcInfoList.workstatus) {
      //     switch (this.stxcInfoList.workstatus) {
      //       case '1':
      //         this.stxcInfoList.workstatus = '未分配'
      //         break

      //       case '2':
      //         this.stxcInfoList.workstatus = '已分配'
      //         break
      //       case '3':
      //         this.stxcInfoList.workstatus = '处理中'
      //         break
      //       case '4':
      //         this.stxcInfoList.workstatus = '处理完成'
      //         break
      //     }
      //   }
      // })
    },
    // 主体信息列表
    getMainNameList() {
      const obj = {
        anaId: this.anaId,
        pageNum: this.formMain.currentPage,
        pageSize: this.formMain.pagesize
      }
      selectSubjectList(obj).then(res => {
        this.formMainTable.list = res.data.list
        this.formMainTable.total = res.data.total
      })
    },
    // 主体信息查询
    showSelectSubject() {
      this.$refs['formMainRefs'].validate((valid) => {
        if (valid) {
          const obj = {
            anaId: this.anaId,
            subjectName: this.formMain.mainName, // 主体名称
            certiNum: this.formMain.idNum, // 主体证件号
            account: this.formMain.account, // 账号
            pageNum: this.formMain.currentPage,
            pageSize: this.formMain.pagesize
          }
          selectSubject(obj).then(res => {
            this.formMainTable.list = res.data.list
            this.formMainTable.total = res.data.total
          })
        }
      })
    },
    // 主体信息新增表单重置
    addNewFormMain() {
      this.addFormMainRules.subjectName = [
        { required: false, message: '内容不能为空', trigger: 'blur' },
        { validator: isValidBlank, trigger: 'blur' }
      ]
      this.addFormMainRules.certiNum = [
        { required: false, message: '内容不能为空', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号码', trigger: 'blur' }
      ]
      this.formMainVisible = true
      this.zhuTiCount = 0
      this.$refs['addFormMainRefs'].resetFields()
    },
    // 主体信息新增表单提交
    addSubjectInfo() {
      if (this.zhuTiCount !== 0) {
        return false
      } else {
        if (this.addFormMain.account === '' && this.addFormMain.subjectName === '') {
          this.$message({
            type: 'error',
            message: '账号和主体主体名称必填其一',
            showClose: true,
            duration: 6000
          })
          return false
        }
        if (this.addFormMain.account !== '') {
          this.addFormMainRules.subjectName = [
            { required: false, message: '内容不能为空', trigger: 'blur' },
            { validator: isValidBlank, trigger: 'blur' }
          ]
          this.addFormMainRules.certiNum = [
            { required: false, message: '内容不能为空', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号码', trigger: 'blur' }
          ]
        }
        this.$refs['addFormMainRefs'].validate((valid) => {
          if (valid) {
            this.zhuTiCount++
            const obj = {
              anaId: this.uuId,
              account: this.addFormMain.account,
              bodyType: this.addFormMain.bodyType,
              certiNum: this.addFormMain.certiNum,
              detalInfo: this.addFormMain.detalInfo,
              dimeType: this.addFormMain.dimeType,
              standInfo: this.addFormMain.standInfo,
              subjectName: this.addFormMain.subjectName
            }

            addSubject(obj).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '新增主体信息成功',
                  showClose: true,
                  duration: 6000
                })
                this.formMainVisible = false
                this.getMainNameList()
              }
            }).catch(() => {
              this.$message({
                type: 'success',
                message: '新增主体信息失败',
                showClose: true,
                duration: 6000
              })
              this.formMainVisible = false
              this.zhuTiCount = 0
            })
          } else {
            this.$message({
              type: 'error',
              message: '校验不通过',
              showClose: true,
              duration: 6000
            })
          }
        })
      }
    },
    // 主体信息新增表单提交
    // addSubjectInfo() {
    //   this.$refs['addFormMainRefs'].validate((valid) => {
    //     if (valid) {
    //       const obj = {
    //         anaId: this.anaId,
    //         account: this.addFormMain.account,
    //         bodyType: this.addFormMain.bodyType,
    //         certiNum: this.addFormMain.certiNum,
    //         detalInfo: this.addFormMain.detalInfo,
    //         dimeType: this.addFormMain.dimeType,
    //         standInfo: this.addFormMain.standInfo,
    //         subjectName: this.addFormMain.subjectName
    //       }

    //       addSubject(obj).then(res => {
    //         if (res.code === 200) {
    //           this.$message({
    //             type: 'success',
    //             message: '新增主体信息成功'
    //           })
    //           this.formMainVisible = false
    //           this.getMainNameList()
    //         }
    //       })
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '校验不通过'
    //       })
    //     }
    //   })
    // },
    // 主体信息导入校验
    handleBeforeUploadZT(file) {
      console.log(file)
      if (file.size === 0) {
        this.$message({
          message: '上传文件大小不能等于0KB',
          showClose: true,
          duration: 6000,
          type: 'error'
        })
        this.$refs['fileListZT'].clearFiles()
        return false
      }
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!extension && !extension2) {
        this.submitFlag = false
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        this.$refs['fileListZT'].clearFiles()
        return false
      }
      if (!isLt2M) {
        this.submitFlag = false
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'error',
          showClose: true,
          duration: 6000
        })
        this.$refs['fileListZT'].clearFiles()
        return false
      }
    },
    handleBeforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'error'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'error'
        })
      }
      return extension || (extension2 && isLt2M)
    },
    // 正文信息线索和通报分析概述导入
    handleBeforeUploadXSTB(file) {
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          type: 'error'
        })
      }
      return isLt2M
    },
    // 主体信息导入成功
    showFileList1(res, file, fileList) {
      if (res.code === 200) {
        this.submitFlag = false
        this.$message({
          message: '导入成功',
          type: 'success',
          showClose: true,
          duration: 6000
        })
        this.$refs['fileListZT'].clearFiles()
        this.getMainNameList()
      } else if (res.code === 203) {
        this.submitFlag = false
        this.$confirm('数据重复,确定导入么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitFlag = true
          importSubject(this.uuId).then(res => {
            if (res.code === 200) {
              this.submitFlag = false
              this.$message({
                message: '导入成功',
                type: 'success',
                showClose: true,
                duration: 6000
              })
              this.$refs['fileListZT'].clearFiles()
              this.getMainNameList()
            } else {
              this.submitFlag = false
              this.$message({
                message: '导入失败',
                type: 'error',
                showClose: true,
                duration: 6000
              })
              this.$refs['fileListZT'].clearFiles()
            }
          })
        }).catch(() => {
          this.$refs['fileListZT'].clearFiles()
        })
      } else if (res.code === 205) {
        this.submitFlag = false
        this.$message({
          type: 'error',
          message: res.message,
          showClose: true,
          duration: 6000
        })
        this.$refs['fileListZT'].clearFiles()
      } else {
        this.submitFlag = false
        this.$message({
          type: 'error',
          message: res.message,
          showClose: true,
          duration: 6000
        })
        this.$refs['fileListZT'].clearFiles()
      }
    },
    // 主体信息导入成功
    // showFileList1(res, file) {
    //   if (res.code === 200) {
    //     this.$message({
    //       message: '导入成功',
    //       type: 'success'
    //     })
    //     this.getMainNameList()
    //   } else if (res.code === 203) {
    //     this.$confirm('数据重复,确定导入么？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       importSubject(this.uuId).then(res => {
    //         if (res.code === 200) {
    //           this.$message({
    //             message: '导入成功',
    //             type: 'success'
    //           })
    //           this.getMainNameList()
    //         } else {
    //           this.$message({
    //             message: '导入失败',
    //             type: 'error'
    //           })
    //         }
    //       })
    //     }).catch(() => {})
    //   }
    // },
    // 可以交易线索导入成功
    showFileListXs(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.formTwoXS.cDispose = res.data.cdispose // 可疑交易名称
        this.formTwoXS.ctriggerMessage = res.data.ctriggerMessage // 关联移送记录
        this.formTwoXS.cbodyMessage = res.data.cbodymessage // 主要交易发生地
        this.formTwoXS.cDealdate = res.data.cdealdate.split('，') // 交易时间段
        this.formTwoXS.cRmb = res.data.crmb // 累计交易金额(人民币)
        this.formTwoXS.cYb = res.data.cyb // 累计交易金额(外币)
        this.formTwoXS.cNumber = res.data.cnumber // 涉及交易笔数
        this.formTwoXS.cMainnumber = res.data.cmainnumber // 涉及主要账户个数
        // this.formTwoXS.cJudge = res.data.cjudge // 初步判断
        this.formTwoXS.cSubject = res.data.csubject // 交易主体身份及相关信息
        this.formTwoXS.cPoints = res.data.cpoints // 检测分析触发点
        this.formTwoXS.cSuggest = res.data.csuggest // 建议
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          message: res.message + res.data
        })
        this.fileListXS = []
      } else {
        this.$message({
          type: 'error',
          message: '上传文件格式不正确，请选择下载模板进行上传！'
        })
        this.fileListXS = []
      }
    },
    // 可疑交易通报导入成功
    showFileListTb(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        this.formTwoTB.aDispose = res.data.adispose // 可疑交易名称
        this.formTwoTB.triggerMessage = res.data.triggerMessage // 关联移送记录
        this.formTwoTB.bodyMessage = res.data.bodyMessage // 主要交易发生地
        this.formTwoTB.aDealdate = res.data.adealdate.split('，') // 交易时间段
        this.formTwoTB.aRmb = res.data.armb // 累计交易金额(人民币)
        this.formTwoTB.aYb = res.data.ayb // 累计交易金额(外币)
        this.formTwoTB.aNumber = res.data.anumber // 涉及交易笔数
        this.formTwoTB.aMainnumber = res.data.amainnumber // 涉及主要账户个数
        // this.formTwoTB.aJudge = res.data.ajudge // 初步判断
        this.formTwoTB.aSubject = res.data.asubject // 交易主体身份及相关信息
        this.formTwoTB.aPoints = res.data.apoints // 检测分析触发点
        this.formTwoTB.aSuggest = res.data.asuggest // 建议
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          message: res.message + res.data
        })
        this.fileListTB = []
      } else {
        this.$message({
          type: 'error',
          message: '上传文件格式不正确，请选择下载模板进行上传！'
        })
        this.fileListTB = []
      }
    },
    // 分析概述线索上传成功
    showFileListFenXi(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.$refs.showFileListFenXi.clearFiles()
        getFileListById(this.anaId).then(res => {
          this.fenXiTable.list = res.data
        })
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          message: res.message
        })
        this.$refs.showFileListFenXi.clearFiles()
      }
    },
    // 分析概述通报上传成功
    showFileListFenXi1(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.$refs.showFileListFenXi1.clearFiles()
        getFileListById(this.anaId).then(res => {
          this.fenXiTable1.list = res.data
        })
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          message: res.message
        })
        this.$refs.showFileListFenXi1.clearFiles()
      }
    },
    // 附件列表模块--上传附件成功
    showFileListFj(res, file) {
      if (res.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.showUploadFile = false
        this.fileListFj = []
        this.showGetFileListById()
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          message: res.message
        })
        this.fileListFj = []
      }
    },
    // 附件列表模块--附件上传成功后调取显示附件列表的方法
    showGetFileListById() {
      // const obj = {
      //   anaId: this.uuId
      // }
      getFileListById(this.anaId).then(res => {
        this.accessoryTable.list = res.data
      })
    },
    // 附件列表模块--下载附件
    // downloadFileById(scope) {
    //   return `http://10.10.121.119:8087/upload/download/` + scope
    // },
    downloadFileById(scope) {
      location.href = '/file-service/upload/download/' + scope + '?moduleName=' + encodeURI('线索管理')
    },
    // 附件列表模块--删除附件
    delRow(scope) {
      this.$confirm('确定删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delFileListById(scope.row.attachId).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showGetFileListById()
          }
        })
      }).catch(() => {})
    },
    // 主体信息模板下载
    downloadMb() {
      downloadSubject().then(res => {
        if (res.code === 200) {
          this.$message({
            message: '下载成功',
            type: 'success'
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleRemoveFenXiXS(file, fileList) {
      this.fileListFenXiXS = []
    },
    handleRemoveFenXiTB(file, fileList) {
      this.fileListFenXiTB = []
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
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
    // 新增主体信息切换条数
    handleSizeChangeFormMain(size) {
      this.formMain.pagesize = size
      this.getMainNameList()
      // console.log(`每页 ${size} 条`)
    },
    // 切换页数
    handleCurrentChangeFormMain(currentPage) {
      this.formMain.currentPage = currentPage
      this.getMainNameList()
      // console.log(`当前页: ${currentPage}`)
    },
    // 新增主体信息切换条数
    handleSizeChange(size) {
      this.formMainTable.currentPage = size
      // console.log(`每页 ${size} 条`)
    },
    handleCurrentChange(currentPage) {
      this.formMainTable.currentPage = currentPage
      // console.log(`当前页: ${currentPage}`)
    },
    // 线索和通报判断逻辑
    handleTab() {
      if (this.form.radio === '可疑交易线索') {
        this.activeName2 = 'firstTwo'
        this.showXSInfo = true
        this.showTBInfo = false
      } else {
        this.activeName2 = 'secondTwo'
        this.showXSInfo = false
        this.showTBInfo = true
      }
      this.isShow = true
    },
    // 返回
    goBack() {
      this.$router.go(-1)
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
    // var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    // this.fetchData(listQuery)
    if (this.$route.params.name) this.activeName = this.$route.params.name
    if (this.$route.query.ismanagement) {
      this.getSheZuiLX()
      // -------宋显鹏添加工作流处置标识-----
      if (this.$route.query.ismanagement) {
        this.ismanagement = true
      }
    }
  }

}
</script>

<style lang="scss">
.filewarper {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .processrow {
    padding-bottom: 10px;
    span {
      font-size: 0.9em;
    }
  }
  .oddinput .el-date-editor--daterange{
    width: 100% !important;
  }
  .noBorder .el-form-item__content{
    line-height: 70px;
  }
  .noBorder .el-textarea__inner{
    border: none;
    resize:none;
    height: 45px;
  }
  .noBorderTwo .el-textarea__inner{
    border: none;
    resize:none;
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
