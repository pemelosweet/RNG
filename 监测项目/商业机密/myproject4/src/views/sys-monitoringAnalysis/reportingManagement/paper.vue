<template>
  <div class="reportingManagement_paper">
    <el-card>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24" class="pre_blue">
          <p style="float:left;">被举报人信息</p>
          <div style="float:left;color:red;font-size:14px;margin-top:17px;">（最多可填写五个被举报人）</div>
          <p style="float:right;cursor:pointer;" @click="tianClick">添加人员</p>
        </el-col>
      </el-row>
        <div v-for="(item, index) in form.memberList" :key="index + 'aa'">
          <div v-if="item.memberFunc === '2'">
          <div class="br-box"></div>
          <el-row>
            <el-col :span="24" style="border-top:1px solid #ccc;">
            <p style="float:left;font-size:14px;">被举报人信息</p>
            <p class="el-icon-close" style="float:right" @click="delClick(index)" v-if="index !== 0"></p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="类别：" :prop="'memberList.' + index + '.memberType'" :rules="rules.memberType">
                <el-select v-model="item.memberType" @change="memberTypeChange(index)" style="width:100%;" clearable>
                  <el-option label="个人" value="1"></el-option>
                  <el-option label="机构" value="2"></el-option>
                  <el-option label="银行账户" value="3"></el-option>
                  <el-option label="其他" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <template v-if="item.memberType==''">
                <el-form-item label="证件类型：" :prop="'memberList.' + index + '.memberCredType'" :rules="rules.memberCredType">
                  <el-select v-model="item.memberCredType" style="width:100%;" clearable></el-select>
                </el-form-item>
              </template>
              <template v-if="item.memberType=='1'">
                <el-form-item label="证件类型：" :prop="'memberList.' + index + '.memberCredType'" :rules="rules.memberCredType">
                  <el-select v-model="item.memberCredType" style="width:100%;" clearable>
                    <el-option label="居民身份证" value="1"></el-option>
                    <el-option label="港澳居民来往内地通行证" value="2"></el-option>
                    <el-option label="中国护照" value="3"></el-option>
                    <el-option label="台湾居民来往大陆通行证" value="4"></el-option>
                    <el-option label="台湾居民居住证" value="5"></el-option>
                    <el-option label="外国护照" value="6"></el-option>
                    <el-option label="港澳居民居住证" value="7"></el-option>
                    <!-- <el-option label="组织机构代码" value="8"></el-option>
                    <el-option label="企业信用代码" value="9"></el-option> -->
                    <el-option label="其他个人证件" value="10"></el-option>
                    <el-option label="外国人永久居留身份证" value="11"></el-option>
                    <!-- <el-option label="外国人工作许可证（A类、B类、C类）" value="12"></el-option> -->
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="item.memberType=='3'">
                <el-form-item label="证件类型：">
                  <el-select v-model="item.memberCredType" style="width:100%;" clearable>
                    <el-option label="居民身份证" value="1"></el-option>
                    <el-option label="港澳居民来往内地通行证" value="2"></el-option>
                    <el-option label="中国护照" value="3"></el-option>
                    <el-option label="台湾居民来往大陆通行证" value="4"></el-option>
                    <el-option label="台湾居民居住证" value="5"></el-option>
                    <el-option label="外国护照" value="6"></el-option>
                    <el-option label="港澳居民居住证" value="7"></el-option>
                    <el-option label="组织机构代码" value="8"></el-option>
                    <el-option label="企业信用代码" value="9"></el-option>
                    <el-option label="其他个人证件" value="10"></el-option>
                    <el-option label="外国人永久居留身份证" value="11"></el-option>
                    <!-- <el-option label="外国人工作许可证（A类、B类、C类）" value="12"></el-option> -->
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="item.memberType=='2'">
                <el-form-item label="证件类型：" :prop="'memberList.' + index + '.memberCredType'" :rules="rules.memberCredType">
                  <el-select v-model="item.memberCredType" style="width:100%;" clearable>
                    <el-option label="组织机构代码" value="8"></el-option>
                    <el-option label="企业信用代码" value="9"></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template v-if="item.memberType=='4'">
                <el-form-item label="证件类型：" style="width:100%;" :prop="'memberList.' + index + '.memberCredType'" :rules="rules.memberCredType">
                  <el-input v-model="item.memberCredType" maxlength="15" placeholder="最多输入15位"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <div v-if="item.memberType==''">
                <el-form-item label="证件号码：" :prop="'memberList.' + index + '.memberCredNo'" :rules="rules.memberCredNo">
                  <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='1'">
                <el-form-item label="证件号码：" :prop="'memberList.' + index + '.memberCredNo'" :rules="rules.memberCredNo">
                  <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='2'">
                <el-form-item label="证件号码：" :prop="'memberList.' + index + '.memberCredNo'" :rules="rules.memberCredNo">
                  <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='3'">
                <el-form-item label="证件号码：">
                  <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='4'">
                <el-form-item label="证件号码：" :prop="'memberList.' + index + '.memberCredNo'" :rules="rules.memberCredNo">
                  <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <div v-if="item.memberType==''">
                <el-form-item label="账号：" :prop="'memberList.' + index + '.accountNo'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                  <el-input v-model="item.accountNo" maxlength="64" placeholder="最多输入64位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='1'">
                <el-form-item label="账号：" :prop="'memberList.' + index + '.accountNo'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                  <el-input v-model="item.accountNo" maxlength="64" placeholder="最多输入64位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='2'">
                <el-form-item label="账号：" :prop="'memberList.' + index + '.accountNo'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                  <el-input v-model="item.accountNo" maxlength="64" placeholder="最多输入64位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='3'">
                <el-form-item label="账号：" :prop="'memberList.' + index + '.accountNo'" :rules="rules.accountNo">
                  <el-input v-model="item.accountNo" maxlength="64" placeholder="最多输入64位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='4'">
                <el-form-item label="账号：" :prop="'memberList.' + index + '.accountNo'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                  <el-input v-model="item.accountNo" maxlength="64" placeholder="最多输入64位"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div v-if="item.memberType=='' || item.memberType=='1' || item.memberType=='2' || item.memberType=='4'">
                <el-form-item label="姓名/名称：" :prop="'memberList.' + index + '.memberName'" :rules="rules.memberName">
                  <el-input v-model="item.memberName" maxlength="128" placeholder="最多输入128位"></el-input>
                </el-form-item>
              </div>
              <div v-if="item.memberType=='3'">
                <el-form-item label="姓名/名称：" :prop="'memberList.' + index + '.memberName'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                  <el-input v-model="item.memberName" maxlength="128" placeholder="最多输入128位"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="单位：" :prop="'memberList.' + index + '.memberCompany'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                <el-input v-model="item.memberCompany" maxlength="64" placeholder="最多输入64位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务：" :prop="'memberList.' + index + '.memberPosition'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                <el-input v-model="item.memberPosition" maxlength="32" placeholder="最多输入32位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式：">
                <el-input v-model="item.telNo" maxlength="32" placeholder="最多输入32位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="20">
              <el-form-item label="已向其他执法机关报案或举报的情况:">
                <el-input type="textarea" rows="5" v-model="item.memberOthers" placeholder="最多输入64位" maxlength="64"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="已向人民银行系统（司局、分支行等）举报、投诉及处理情况：">
                <el-input type="textarea" rows="5" v-model="item.memberPbc" placeholder="最多输入64位" maxlength="64"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
        </div>

        <!-- </el-form> -->
      
      <el-row :gutter="20">
        <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px"> -->
          <el-col :span="24" class="pre_blue">
            <p style="float:left;">举报人及其他受害人信息</p>
            <div style="float:left;color:red;font-size:14px;margin-top:17px;">（最多可填写五个举报人及其他受害人）</div>
            <p style="float:right;cursor:pointer;" @click="preAddClick" v-if="form.isDisabled!=0">添加人员</p>
            <p style="width:40px;float:right;"></p>
            <div style="float:right;">
              <el-form-item label="匿名或是署名：" style="margin-top:10px;">
                <el-radio-group v-model="form.isDisabled">
                  <el-radio label="0">匿名</el-radio>
                  <el-radio label="1">署名</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
      </el-row>
            <template v-if="form.isDisabled!=0">
            <div v-for="(item, index) in form.memberList2" :key="index + 'bb'">
              <div v-if="item.memberFunc === '1'">
              <div class="br-box"></div>
              <el-row>
                <el-col :span="24" style="border-top:1px solid #ccc;">
                  <p style="float:left;font-size:14px;">举报人信息</p>
                  <p class="el-icon-close" style="float:right;cursor:pointer;" @click="preDelClick(index)" v-if="index !== 0"></p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="姓名/名称：" :prop="'memberList2.' + index + '.memberName'" :rules="rules.memberName2">
                    <el-input v-model="item.memberName" maxlength="128" placeholder="最多输入128位"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="类别：" :prop="'memberList2.' + index + '.memberType'" :rules="rules.memberType2">
                    <el-select v-model="item.memberType" style="width:100%;" @change="reporterChange(index)" clearable>
                      <el-option label="个人" value="1"></el-option>
                      <el-option label="机构" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <template v-if="item.memberType==''">
                    <el-form-item label="证件类型：" :prop="'memberList2.' + index + '.memberCredType'" :rules="rules.memberCredType2">
                      <el-select v-model="item.memberCredType" style="width:100%;" clearable></el-select>
                    </el-form-item>
                  </template>
                  <template v-if="item.memberType=='1'">
                    <el-form-item label="证件类型：" :prop="'memberList2.' + index + '.memberCredType'" :rules="rules.memberCredType2">
                      <el-select v-model="item.memberCredType" style="width:100%;" clearable>
                        <el-option label="居民身份证" value="1"></el-option>
                        <el-option label="港澳居民来往内地通行证" value="2"></el-option>
                        <el-option label="中国护照" value="3"></el-option>
                        <el-option label="台湾居民来往大陆通行证" value="4"></el-option>
                        <el-option label="台湾居民居住证" value="5"></el-option>
                        <el-option label="外国护照" value="6"></el-option>
                        <el-option label="港澳居民居住证" value="7"></el-option>
                        <!-- <el-option label="组织机构代码" value="8"></el-option>
                        <el-option label="企业信用代码" value="9"></el-option> -->
                        <el-option label="其他个人证件" value="10"></el-option>
                        <el-option label="外国人永久居留身份证" value="11"></el-option>
                        <!-- <el-option label="外国人工作许可证（A类、B类、C类）" value="12"></el-option> -->
                      </el-select>
                    </el-form-item>
                  </template>
                  <template v-if="item.memberType=='2'">
                    <el-form-item label="证件类型：" :prop="'memberList2.' + index + '.memberCredType'" :rules="rules.memberCredType2">
                      <el-select v-model="item.memberCredType" style="width:100%;" clearable>
                        <el-option label="组织机构代码" value="8"></el-option>
                        <el-option label="企业信用代码" value="9"></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-col>
                <el-col :span="8">
                  <div v-if="item.memberType==''">
                    <el-form-item label="证件号码：" :prop="'memberList2.' + index + '.memberCredNo'" :rules="rules.memberCredNo2">
                      <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                    </el-form-item> 
                  </div>
                  <div v-if="item.memberType=='1'">
                    <el-form-item label="证件号码：" :prop="'memberList2.' + index + '.memberCredNo'" :rules="rules.memberCredNo2">
                      <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.memberType=='2'">
                    <el-form-item label="证件号码：" :prop="'memberList2.' + index + '.memberCredNo'" :rules="rules.memberCredNo2">
                      <el-input v-model="item.memberCredNo" maxlength="100" placeholder="最多输入100位"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="单位：" :prop="'memberList.' + index + '.memberCompany'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                    <el-input v-model="item.memberCompany" maxlength="64" placeholder="最多输入64位"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="职务：" :prop="'memberList.' + index + '.memberPosition'" :rules="[{ validator: isValidInputBuZheng, trigger: ['blur', 'change'] }]">
                    <el-input v-model="item.memberPosition" maxlength="32" placeholder="最多输入32位"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式：">
                    <el-input v-model="item.telNo" maxlength="32" placeholder="最多输入32位"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            </div>
          </template>
        <el-row :gutter="20">
          <el-col :span="24" class="pre_blue" style="border-bottom:1px solid #ccc;">
            <p>举报详细信息</p>
          </el-col>
        </el-row>
          <div class="br-box" style="height:20px;"></div>
          <el-row>
            <el-col :span="24">
              <!-- <el-form-item label="举报事由：">
                <el-select
                  v-model="form.reporterReason"
                  multiple
                  filterable
                  default-first-option
                  placeholder="请选择标签" style="width:100%;" @change="changeFn">
                  <el-option
                    v-for="(item, index) in options5"
                    :key="index + 'cc'"
                    :label="item.codeName"
                    :value="item.codeId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="举报事由：" prop="reporterReason" >
                      <el-select
                        filterable
                        clearable
                        v-model="form.reporterReason"
                        multiple
                        placeholder="请选择"
                        style="width:100%"
                        @change="replenish"
                      >
                        <el-option
                          v-for="(item,index) in options5"
                          :key="index"
                          :label="item.codeName"
                          :value="item.codeId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item
                      v-if="isReplenishOne"
                      prop="supplementOne"
                      :rules="[{required:true, validator: szisValidInput1, trigger: 'blur'}]"
                    >
                      <el-input
                        maxlength="100"
                        v-model="supplementOne"
                        placeholder="请填写关于司法机构或行政调查已介入的可疑交易行为的补充"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item
                      v-if="isReplenish"
                      prop="reporterRemark"
                    >
                      <el-input
                        maxlength="100"
                        v-model="form.reporterRemark"
                        placeholder="请填写关于涉嫌其他犯罪的可疑交易行为的补充"
                      ></el-input>
                    </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-col :span="10">
            <el-form-item label="举报事由（其他）：">
              <el-input v-model="form.reporterRemark"></el-input>
            </el-form-item>
          </el-col> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="举报正文：" prop="reporterText">
                <el-input type="textarea" v-model="form.reporterText" maxlength="1500" placeholder="最多输入1500位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="附件：">
                <el-upload
                  class="upload-demo"
                  :action="fileUrl"
                  name="files"
                  :on-exceed="handleExceed"
                  :beforeUpload="beforeAvatarUpload"
                  :limit="5"
                  :file-list="fileList" :on-success="successFn">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传zip、rar文件，最多上传5个，且单个不得超过10M</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        <!-- </el-form> -->
        <div class="br-box"></div>
        <el-row>
          <el-col :span="2">
            <div class="none-box"></div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="submitForm" :loading="submitLoading">提交</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="resetForm">重填</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" plain @click="goTopClick">返回</el-button>
          </el-col>
        </el-row>
      
     </el-form>
    </el-card>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { paperApi } from '@/api/sys-monitoringAnalysis/reportingManagement/paperPreservation'
import { queryApi } from '@/api/sys-monitoringAnalysis/reportingManagement/uploadAttachments'
import { isValidInputBuZheng } from '@/utils/formValidate.js'
export default {
  data() {
    return {
      submitLoading: false,
      isReplenish: false,
      isValidInputBuZheng: isValidInputBuZheng,
      files: '',
      fileList: [],
      paramster: 'JBSZ',
      options5: [],
      value10: [],
      value1: '',
      form: {
        reportId: '',
        reporterText: '', // 举报正文
        reporterReason: '', // 举报事由下拉
        reporterRemark: '', // 其他事由
        memberList: [
          {
            accountNo: '', // 账号
            memberCompany: '', // 单位职务
            memberCredNo: '', // 证件号码
            memberCredType: '', // 证件类型
            memberFunc: '2', // 人员类型
            memberName: '', // 姓名
            memberOthers: '', // 已向其他执法机关报案或举报的情况
            memberPbc: '',
            memberType: '', // 类别
            telNo: '',
            memberPosition: ''
          }],
        memberList2: [
          {
            accountNo: '', // 账号
            memberCompany: '', // 单位职务
            memberCredNo: '', // 证件号码
            memberCredType: '', // 证件类型
            memberFunc: '1', // 人员类型
            memberName: '', // 姓名
            memberType: '', // 类别
            telNo: '',
            memberPosition: ''
          }
        ],
        isDisabled: '1' // 匿名
      },
      rules: {
        memberType: [
          { required: true, message: '请选择被举报人类别', trigger: 'change' }
        ],
        memberCredType: [
          { required: true, message: '请选择被举报人证件类型', trigger: 'change' },
          { validator: isValidInputBuZheng, trigger: 'change' }
        ],
        memberCredNo: [
          { required: true, message: '请输入被举报人证件号码', trigger: 'blur' },
          { validator: this.validdateMobile, trigger: 'blur' }
        ],
        accountNo: [
          { required: true, message: '请输入被举报人账号', trigger: 'blur' },
          { max: 64, message: '请输入被举报人账号', trigger: 'blur' },
          { validator: isValidInputBuZheng, trigger: ['blur', 'change'] }
        ],
        memberName: [
          { required: true, message: '请输入被举报人姓名', trigger: 'blur' },
          { max: 128, message: '请输入正确姓名', trigger: 'blur' },
          { validator: isValidInputBuZheng, trigger: ['blur', 'change'] }
        ],
        memberName2: [
          { required: true, message: '请输入举报人姓名', trigger: 'blur' },
          { max: 128, message: '请输入正确姓名', trigger: 'blur' },
          { validator: isValidInputBuZheng, trigger: ['blur', 'change'] }
        ],
        memberType2: [
          { required: true, message: '请选择举报人类别', trigger: 'change' }
        ],
        memberCredType2: [
          { required: true, message: '请选择举报人证件类型', trigger: 'change' },
          { validator: isValidInputBuZheng, trigger: 'change' }
        ],
        memberCredNo2: [
          { required: true, message: '请输入举报人证件号码', trigger: 'blur' },
          { validator: this.validdateMobile2, trigger: 'blur' }
        ],
        reporterText: [
          { required: true, message: '请输入举报正文', trigger: 'blur' },
          { max: 1500, message: '最多可填写1500个字符', trigger: 'blur' }
        ]
      },
      token: getToken()
    }
  },
  computed: {
    fileUrl(file) {
      return `/monitor/fill-report/upload-allAttach?reportId=${this.form.reportId}&token=${this.token}`
    }
  },
  mounted() {
    this.queryFn()
  },
  methods: {
    // 判断涉罪类型是否显示补充
    replenish() {
      if (this.form.reporterReason.indexOf('1402') !== -1) {
        this.isReplenish = true
      } else {
        this.isReplenish = false
      }
    },
    goTopClick() {
      this.$router.go(-1)
    },
    validdateMobile(rule, value, callback) {
      const arr = rule.field.split('.')
      const item = Number(arr[1])
      if (this.form.memberList[item].memberCredType === '') {
        return callback(new Error('请先选择证件类型'))
      } else if (this.form.memberList[item].memberType === '1' && this.form.memberList[item].memberCredType === '1') {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(value) === true) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else if (this.form.memberList[item].memberType === '1' && this.form.memberList[item].memberCredType === '2') {
        if (value.length === 9) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else if (this.form.memberList[item].memberType === '1' && this.form.memberList[item].memberCredType === '3') {
        const re = new RegExp('(^[a-zA-Z0-9]{5,17}$)')
        if (re.test(value) === true) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else {
        callback()
      }
    },
    validdateMobile2(rule, value, callback) {
      const arr = rule.field.split('.')
      const item = Number(arr[1])
      if (this.form.memberList2[item].memberCredType === '') {
        return callback(new Error('请先选择证件类型'))
      } else if (this.form.memberList2[item].memberType === '1' && this.form.memberList2[item].memberCredType === '1') {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(value) === true) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else if (this.form.memberList2[item].memberType === '1' && this.form.memberList2[item].memberCredType === '2') {
        if (value.length === 9) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else if (this.form.memberList2[item].memberType === '1' && this.form.memberList2[item].memberCredType === '3') {
        const re = new RegExp('(^[a-zA-Z0-9]{5,17}$)')
        if (re.test(value) === true) {
          callback()
        } else {
          return callback(new Error('请输入正确证件号码'))
        }
      } else {
        callback()
      }
    },
    paperApiFn() {
      paperApi(this.getParams()).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    getParams() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        reportId: obj.reportId,
        reporterText: obj.reporterText,
        reporterReason: obj.reporterReason.join(','),
        memberList: obj.memberList.concat(obj.memberList2),
        isDisabled: obj.isDisabled,
        reporterRemark: obj.reporterRemark
      }
      return newObj
    },
    getParamsTo() {
      const obj = Object.assign({}, this.form)
      const newObj = {
        reportId: obj.reportId,
        reporterText: obj.reporterText,
        reporterReason: obj.reporterReason.join(','),
        memberList: obj.memberList,
        isDisabled: obj.isDisabled,
        reporterRemark: obj.reporterRemark
      }
      return newObj
    },
    queryFn() {
      queryApi(this.paramster).then(res => {
        if (res.code === 200) {
          this.options5 = res.data
        }
      })
    },
    submitForm() {
      console.log(this.form)
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let msg = ''
          let nameNoType = false
          this.form.memberList.map(item => {
            this.form.memberList2.map(item2 => {
              if (item.memberName !== '' && item2.memberName !== '' && item.memberCredNo !== '' && item2.memberCredNo !== '' && item.memberName === item2.memberName && item.memberCredNo === item2.memberCredNo) {
                nameNoType = true
                msg = '举报人和被举报人姓名证件号码不能相同'
              } else if (item.memberCredNo !== '' && item2.memberCredNo !== '' && item.memberCredNo === item2.memberCredNo) {
                nameNoType = true
                msg = '举报人和被举报人证件号码不能相同'
              }
            })
          })
          if (nameNoType) {
            this.$message.warning(msg)
          } else {
            this.submitLoading = true
            if (this.form.isDisabled === '1') {
              paperApi(this.getParams()).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.$router.go(-1)
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
                this.submitLoading = false
              }).catch(() => { this.submitLoading = false })
            } else {
              paperApi(this.getParamsTo()).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.$router.go(-1)
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
                this.submitLoading = false
              }).catch(() => { this.submitLoading = false })
            }
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      console.log(this.form.isDisabled)
      this.$refs.formRef.resetFields()
      this.form.reporterText = ''
      this.form.reporterReason = ''
      this.form.reporterRemark = ''
      this.isReplenish = false
      for (let i = 0; i < this.form.memberList.length; i++) {
        this.form.memberList[i].accountNo = ''
        this.form.memberList[i].memberCompany = ''
        this.form.memberList[i].memberCredNo = ''
        this.form.memberList[i].memberCredType = ''
        this.form.memberList[i].memberOthers = ''
        this.form.memberList[i].memberPbc = ''
        this.form.memberList[i].memberType = ''
        this.form.memberList[i].telNo = ''
        this.form.memberList[i].memberPosition = ''
      }
      for (let i = 0; i < this.form.memberList2.length; i++) {
        this.form.memberList2[i].accountNo = ''
        this.form.memberList2[i].memberCompany = ''
        this.form.memberList2[i].memberCredNo = ''
        this.form.memberList2[i].memberCredType = ''
        this.form.memberList2[i].memberOthers = ''
        this.form.memberList2[i].memberPbc = ''
        this.form.memberList2[i].memberType = ''
        this.form.memberList2[i].telNo = ''
        this.form.memberList2[i].memberPosition = ''
      }
    },
    tianClick() {
      if (this.form.memberList.length !== 5) {
        const newList = {
          accountNo: '',
          memberCompany: '',
          memberCredNo: '',
          memberCredType: '',
          memberFunc: '2',
          memberName: '',
          memberOthers: '',
          memberPbc: '',
          memberType: '',
          telNo: '',
          memberPosition: ''
        }
        this.form.memberList.push(newList)
      } else {
        this.$message({
          message: '最多添加5个被举报人',
          type: 'warning'
        })
      }
    },
    delClick(index) {
      this.form.memberList.splice(index, 1)
    },
    preAddClick() {
      if (this.form.memberList2.length !== 5) {
        const newList = {
          accountNo: '',
          memberCompany: '',
          memberCredNo: '',
          memberCredType: '',
          memberFunc: '1',
          memberName: '',
          memberOthers: '',
          memberPbc: '',
          memberType: '',
          telNo: '',
          memberPosition: ''
        }
        this.form.memberList2.push(newList)
      } else {
        this.$message({
          message: '最多添加5个举报人',
          type: 'warning'
        })
      }
      console.log(this.form.memberList)
    },
    preDelClick(index) {
      this.form.memberList2.splice(index, 1)
    },
    memberTypeChange(index) {
      this.form.memberList[index].memberCredType = ''
    },
    reporterChange(index) {
      this.form.memberList2[index].memberCredType = ''
    },
    changeFn() {
      console.log(this.value1)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件`)
    },
    beforeAvatarUpload(file) {
      this.files = file
      console.log(this.files)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'zip'
      const extension2 = testmsg === 'rar'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 zip、rar格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过10MB!',
          type: 'warning'
        })
      }
      return extension || extension2 && isLt2M
    },
    successFn(res, file) {
      if (res.code === 200) {
        this.form.reportId = res.data
        console.log(file)
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style>
.br-box {
  width: 100%;
  height: 10px;
  float: left;
}
.none-box {
  width: 100%;
  height: 1px;
}
</style>


