 <template>
  <div class="cueManage_investigation_archives" v-loading.fullscreen.lock="submitFlag" element-loading-text="文件正在上传，请耐心等待！">
    <el-card>
      <a @click="goBack" class="back" :style="backImg"></a>
      <div slot="header">
        协查文件档案表
      </div>
      <div style="marginBottom:18px">
        <el-row>
          <el-col v-if="this.roles === 'center'" :span="24">
            <span style="marginRight:20px">流程操作：</span>
            <!-- <el-button type="primary" plain> 经办人员可见</el-button> -->
            <!-- <el-button type="primary" plain :disabled="this.editableTabsValue === '0'||this.editableTabsValue === '2' || this.editableTabsValue === '4' ||this.editableTabsValue === '5'" v-if="isCenter"> 协查分类</el-button>
            <el-button type="primary" plain :disabled="this.editableTabsValue === '0'||this.editableTabsValue === '2' || this.editableTabsValue === '4' ||this.editableTabsValue === '5'" v-if="isCenter">预分配</el-button>
            <el-button type="primary" plain :disabled="this.editableTabsValue === '0'||this.editableTabsValue === '2' || this.editableTabsValue === '4' ||this.editableTabsValue === '5'" v-if="isCenter">人工分配</el-button>
            <el-button type="primary" plain :disabled="this.editableTabsValue === '0'||this.editableTabsValue === '2' || this.editableTabsValue === '4' ||this.editableTabsValue === '5'" v-if="isCenter">打 印</el-button> -->
            <!-- <el-button type="primary" plain disabled v-if="isCenter"> 协查分类</el-button>
            <el-button type="primary" plain disabled v-if="isCenter">预分配</el-button>
            <el-button type="primary" plain disabled v-if="isCenter">人工分配</el-button>-->
            <!-- <el-button type="primary" plain disabled v-if="isCenter">打 印</el-button>  -->
            <el-button type="primary" plain  v-if="this.$route.query.key ==='1'" @click="submitTab()">保存</el-button>
            <el-button type="primary" plain  v-if="this.$route.query.key ==='100'" @click="submitTabUpdate()">保存</el-button>
            <!-- <el-button type="primary" plain v-if="isCenter" @click="dialogVisible=true">提 交</el-button> -->
            <!-- <el-button type="primary" plain v-if="isCenter">关 闭</el-button> -->
            <!-- <el-button type="primary" plain @click="dialogVisible=true">下一步</el-button> -->
            <!-- <el-button type="primary" plain @click="adviceVisible=true"> 意 见</el-button>
            <router-link :to="{name: 'cueManage_investigation'}">
              <el-button type="primary" plain style="margin-left:10px">返 回</el-button>
            </router-link> -->
            <!-- <el-button type="primary" plain> 取 回</el-button>
            <el-button type="primary" plain> 签 收</el-button>
            <el-button type="primary" plain> 委 派</el-button> -->

          </el-col>
          <el-col v-else :span="24">
            <span style="marginRight:20px">流程操作：</span>
            <!-- <el-button type="primary" plain :disabled="this.editableTabsValue === '2'" v-if="isCenter"> 一级协查</el-button>
            <el-button type="primary" plain :disabled="this.editableTabsValue === '2'" v-if="isCenter">分析工具</el-button>
            <el-button type="primary" plain :disabled="this.editableTabsValue === '2'" v-if="isCenter">打 印</el-button> -->
            <el-button type="primary" plain  @click="submitTab()">保 存</el-button>
            <!-- <el-button type="primary" plain :disabled="this.editableTabsValue === '2'" v-if="isCenter" >提 交</el-button>
            <el-button type="primary" plain v-if="isCenter">关 闭</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- {{this.$route.query.status}} -->
        <el-tabs type="border-card" v-model="editableTabsValue">
          <el-tab-pane v-if="this.bianhao !=='bianhao'" label="协查文件档案表" name="2" class="cueManage_investigation_archivesList">
            <el-form :model="formArchives" :rules="formArchivesRules" ref="formArchivesRule" label-width="100px">
              <div class="block">
                <el-row class="title">
                  <el-col :span="8">
                    <span>来件信息1</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="来件日期：" prop="inp1">
                      <el-date-picker :disabled="isBan"  v-model="formArchives.inp1" :picker-options="pickerOptions1" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="协查文号：" prop="inp3">
                      <el-input v-model="formArchives.inp3"  placeholder="协查文号，最长为20字符" :disabled="isBan"  :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关联文号：" prop="inp2">
                      <el-input v-model="formArchives.inp2"  placeholder="关联文号，最长为20字符" :disabled="isBan"  :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="协查类型：" prop="resource">
                      <el-radio-group v-model="formArchives.resource" :disabled="isBan">
                        <el-radio label="一级协查"></el-radio>
                        <el-radio label="研判分析"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急程度：" prop="select">
                      <el-select v-model="formArchives.select"  clearable placeholder="请选择" :disabled="isBan">
                        <el-option
                          v-for="(item,idx) in urgencyDegreeArr"
                          :label="item.codeName"
                          :value="item.codeName"
                          :key="idx"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来文标题：" prop="inp4">
                      <el-input v-if="isBan" v-model="formArchives.inp4"  placeholder="来文标题，最长为30字符" :disabled="isBan" ></el-input>
                      <el-input v-else v-model="formArchives.inp4"  placeholder="来文标题，最长为30字符" :disabled="isBan"  :maxlength="30"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row  :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="来文单位：" prop="inp6">
                      <el-select  placeholder="请选择"  clearable v-model="formArchives.inp6" :disabled="isBan">
                        <el-option
                          v-for="item in this.laiwenUnitArr"
                          :key="item.codeId"
                          :label="item.codeName"
                          :value="item.codeName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="案情标签：" prop="inp5">
                      <el-input v-if="isBan" v-model="formArchives.inp5"  placeholder="案情标签，最长为50字符" :disabled="isBan" ></el-input>
                      <el-input v-else v-model="formArchives.inp5"  placeholder="案情标签，最长为50字符" :disabled="isBan"  :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="涉罪类型：" prop="select2">
                      <el-select v-model="formArchives.select2" placeholder="请选择" multiple filterable  :disabled="isBan">
                        <el-option v-for="(item,index) in this.sheZui" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-button type="text" @click="dialogVisibleSelect = true">查看详情</el-button>
                    <el-dialog
                      title="提示"
                      :visible.sync="dialogVisibleSelect"
                      width="30%">
                      <el-select v-model="formArchives.select2"  clearable placeholder="请选择" multiple collapse-tags>
                        <el-option v-for="(item,index) in this.sheZui" :key="index" :label="item.codeName" :value="item.codeId" :disabled="!isBan"></el-option>
                      </el-select>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleSelect = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisibleSelect = false">确 定</el-button>
                      </span>
                    </el-dialog> -->
                  </el-col>
                </el-row>
                 <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="案情简介：" prop="inp7">
                      <el-input v-model="formArchives.inp7" type="textarea"  placeholder="案情简介，最长为400字符"  :maxlength="400" :disabled="isBan"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="请求事项："  prop="inp8">
                      <el-input v-model="formArchives.inp8" type="textarea"  placeholder="请求事项，最长为400字符" :maxlength="400" :disabled="isBan"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row :gutter="20" class="request_items" ref="requestItems">
                  <el-col :span="24">
                    <el-form-item label="请求事项：">
                      <el-input v-model="formArchives.inp8" type="textarea" clearable  placeholder="请求事项，最长为400字符"  @focus="requestItemsFn()" @blur="clearRequestItemsFn" :maxlength="400"></el-input>
                    </el-form-item>
                  </el-col>
                  <ul class="oUl" ref="requestItemsUl" :style="{'top':'51px'}">
                    <li>当今世界的数据</li>
                    <li>地婚纱的黄金时代</li>
                    <li>我去看科技网</li>
                    <li>当时觉得干啥</li>
                    <li>而他也瑞特</li>
                    <li>网球降低车内的女生v你</li>
                  </ul>
                </el-row> -->
                <!-- <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="协查名单：">
                      <el-select v-model="form.select3" multiple filterable allow-create default-first-option placeholder="请选择协查名单">
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row> -->

              </div>
              <!-- 信息2 -->
              <div class="block" style="margin-top:5px">
                <el-row class="title">
                  <el-col :span="24">
                    <span>来件信息2</span>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            
            <el-form :model="dynamicValidateFormNew" ref="dynamicValidateFormNew" :disabled="isBan" label-width="100px" class="demo-dynamic">
              <template v-for="(domain, index) in dynamicValidateFormNew.domains">
                <el-row :key="index">
                  <el-col :span="9">
                    <el-form-item
                      label='联系人：'
                      :key="'联系人：' + index"
                      :prop="'domains.' + index + '.contactName'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.contactName" :maxlength="32" placeholder="联系人，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item
                      label='联系人电话：'
                      :key="'联系人电话：' + index"
                       :prop="'domains.' + index + '.contactPhone'"
                      :rules="[
                       { pattern: /(^0\d{2,3}-?\d{0,32}$)|(^\d{0,32}$)/, message: '填写正确的电话号码', trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.contactPhone" :maxlength="32" placeholder="联系人电话，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="addDomainNew" v-if="!isBan">+</el-button>
                    <el-button  style="margin-left:10px;"  v-if="!isBan"  @click.prevent="removeDomainNew(domain)">-</el-button>
                  </el-col>
                </el-row>
                 <!-- <el-row  :key="'m'+index">
                    <el-col :span="12">
                    <el-form-item
                      label='负责人：'
                      :key="'负责人：' + index"
                       :prop="'domains.' + index + '.respoName'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      
                      <el-input v-model="domain.respoName" :maxlength="32" placeholder="负责人，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label='负责人电话：'
                      :key="'负责人电话：' + index"
                       :prop="'domains.' + index + '.respoPhone'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.respoPhone" :maxlength="32" placeholder="负责人电话，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :span="2">
                    <el-button  style="margin-left:10px;"  v-if="!isBan"  @click.prevent="removeDomainNew(domain)">删除</el-button>
                  </el-col>
                  </el-row> -->
              </template>
              <template v-for="(domain, index) in dynamicValidateFormNew.domains1" >
                <!-- <el-row :key="index">
                  <el-col :span="12">
                    <el-form-item
                      label='联系人：'
                      :key="'联系人：' + index"
                      :prop="'domains.' + index + '.contactName'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.contactName" :maxlength="32" placeholder="联系人，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label='联系人电话：'
                      :key="'联系人电话：' + index"
                       :prop="'domains.' + index + '.contactPhone'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.contactPhone" :maxlength="32" placeholder="联系人电话，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                 <el-row  :key="'m'+index">
                    <el-col :span="9">
                    <el-form-item
                      label='负责人：'
                      :key="'负责人：' + index"
                       :prop="'domains1.' + index + '.respoName'"
                      :rules="[
                      { validator: zzInfo, trigger: 'blur' }
                      ]">
                      
                      <el-input v-model="domain.respoName" :maxlength="32" placeholder="负责人，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <!-- <el-form-item
                      label='负责人电话：'
                      :key="'负责人电话：' + index"
                       :prop="'domains1.' + index + '.respoPhone'"
                      :rules="[
                       { pattern: /(^0\d{2,3}-?\d{7,8}$)|(^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$)/, message: '填写正确的电话号码', trigger: 'blur' }
                      ]"> -->
                      <el-form-item
                      label='负责人电话：'
                      :key="'负责人电话：' + index"
                       :prop="'domains1.' + index + '.respoPhone'"
                      :rules="[
                        { pattern: /(^0\d{2,3}-?\d{0,32}$)|(^\d{0,32}$)/, message: '填写正确的电话号码', trigger: 'blur' }
                      ]">
                      <el-input v-model="domain.respoPhone" :maxlength="32" placeholder="负责人电话，最长为32字符"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :span="6">
                      <el-button @click="addDomainNew1" v-if="!isBan">+</el-button>
                    <el-button  style="margin-left:10px;"  v-if="!isBan"  @click.prevent="removeDomainNew1(domain)">-</el-button>
                  </el-col>
                  </el-row>
              </template>
            </el-form>
            <!-- <el-row> <el-button type="primary" plain  v-if="this.$route.query.key ==='1' || this.$route.query.key ==='100'" @click="submitTabFanKui()">保存</el-button></el-row> -->
          </el-tab-pane>
          <el-tab-pane label="办理信息" name="0" v-if="this.$route.query.status!=='数据录入已完成'&&this.bianhao !=='bianhao'">
            <!-- <Edit :editList="editList"></Edit> -->
            <el-form :model="formEdit" :rules="formEditRules" ref="formEditRef" :disabled="isBan">
              <el-row :gutter="20">
                <el-col :span="8" >
                  <el-form-item label="移送处经办人：">
                    <el-input v-model="formEdit.inp1" disabled placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="预分配处室：" prop="select2">
                    <el-select v-model="formEdit.select2"  clearable style="width: 100%" placeholder="请选择" @change="select2Change">
                      <el-option label="协查一处" value="FXQ005"></el-option>
                      <el-option label="协查二处" value="FXQ006"></el-option>
                      <el-option label="分析一处" value="FXQ007"></el-option>
                      <el-option label="分析二处" value="FXQ008"></el-option>
                      <el-option label="分析三处" value="FXQ009"></el-option>
                      <el-option label="分析四处" value="FXQ010"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="预分配分析员：" prop="select3">
                    <el-select v-model="formEdit.select3"  clearable style="width: 100%" placeholder="请选择">
                      <el-option  v-for="item in this.formEdit.select3Arr" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                 <!-- <el-col :span="8">
                  <el-form-item label="紧急程度：">
                    <el-select v-model="form.select" placeholder="请选择">
                      <el-option label="特别紧急" value="1"></el-option>
                      <el-option label="紧急" value="2"></el-option>
                      <el-option label="一般" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="分析处室：" prop="select4">
                    <el-select v-model="formEdit.select4"  clearable style="width: 100%"  placeholder="请选择" @change="select4Change">
                      <el-option label="协查一处" value="FXQ005"></el-option>
                      <el-option label="协查二处" value="FXQ006"></el-option>
                      <el-option label="分析一处" value="FXQ007"></el-option>
                      <el-option label="分析二处" value="FXQ008"></el-option>
                      <el-option label="分析三处" value="FXQ009"></el-option>
                      <el-option label="分析四处" value="FXQ010"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="分析员：" prop="select5">
                    <el-select v-model="formEdit.select5"  style="width: 100%"  placeholder="请选择">
                      <el-option  v-for="item in this.formEdit.select5Arr" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="20">
                <el-col :span="8">
                  <el-form-item label="来件个人主体数：" prop="inp7">
                    <el-input v-model="formEdit.inp7"  placeholder="来件个人主体数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来件机构主体数：" prop="inp8">
                    <el-input v-model="formEdit.inp8"  placeholder="来件机构主体数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来件账户数：" prop="inp9">
                    <el-input v-model="formEdit.inp9"  placeholder="来件账户数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <!-- <el-col :span="8">
                  <el-form-item label="来件机构主体数：">
                    <el-input v-model="form.inp8" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办理流程类型：">
                    <el-select v-model="form.select2" placeholder="">
                      <el-option label="即时签批" value="1"></el-option>
                      <el-option label="事后签批" value="2"></el-option>
                      <el-option label="线下签批" value="3"></el-option>
                      <el-option label="代理签批" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="来件账户数：">
                    <el-input v-model="form.inp9" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来件机构主体数：">
                    <el-input v-model="form.inp10" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="协查结果个人数：">
                    <el-input v-model="form.inp11" placeholder=""></el-input>
                  </el-form-item>
                </el-col> -->
                <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="协查结果个人数：" prop="inp11">
                    <el-input v-model="formEdit.inp11"  placeholder="协查结果个人数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
              
              
                
                <el-col :span="8">
                  <el-form-item label="协查结果机构数：" prop="inp12">
                    <el-input v-model="formEdit.inp12"  placeholder="协查结果机构数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="协查结果账户数:" prop="inp13">
                    <el-input v-model="formEdit.inp13"  placeholder="协查结果主体数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
                 <!-- <el-col :span="8">
                  <el-form-item label="交易账户数：" prop="inp15">
                    <el-input v-model="formEdit.inp15"  placeholder="交易账户数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col> -->
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="交易笔数：" prop="inp14">
                    <el-input v-model="formEdit.inp14"  placeholder="交易笔数，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>            
               
                <el-col :span="8">
                  <el-form-item label="本币交易金额(万元RMB):" prop="inp16">
                    <el-input v-model="formEdit.inp16"  placeholder="本币交易金额(万元RMB)，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外币交易金额(折约万美元):" prop="inp17">
                    <el-input v-model="formEdit.inp17"  placeholder="外币交易金额(折约万美元)，最长为9字符"  :maxlength="9"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注项：" prop="inp18">
                    <el-input v-model="formEdit.inp18" placeholder="请输入备注，最长为200字符" type="textarea" :maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row> <el-button type="primary" plain  v-if="this.$route.query.key ==='1' || this.$route.query.key ==='100'" @click="submitTabBanLi()">保存</el-button></el-row> -->
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="处理单" name="1"  v-if="this.$route.query.status!=='数据录入已完成'&&this.bianhao !=='bianhao'">
            <el-form :model="formChuLi" :rules="formChuLiRules" :disabled="isBan" ref="formChuLiRule">
              <el-row class="table">
              <h2 style="text-align:center;height: 80px;line-height:80px;">反洗钱中心文件处理单</h2>
              <table border="1">
                <tr>
                  <td width="200" height="70;" align="center">主办处室</td>
                  <td width="200" colspan="2" height="70" style="line-height: 70px;">
                    <el-form-item prop="hostRoom" class="noBorder">
                      <el-input v-model="formChuLi.hostRoom" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="主办处室，最长为30字符" :maxlength="30"></el-input>
                    </el-form-item>
                  </td>
                  <td width="200" colspan="2">经办人及电话</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="agentsTelephone" class="noBorder">
                      <el-input v-model="formChuLi.agentsTelephone" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入，最长为30字符"  :maxlength="30"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">请示</td>
                  <td height="200" colspan="6">
                    <el-form-item prop="fileContent"  class="noBorderTwo">
                      <el-input v-model="formChuLi.fileContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="关于xxx的请示，最长为100字符"  :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">行领导批示</td>
                  <td colspan="6">
                    <el-form-item prop="bankLeadIntruc" class="noBorder">
                      <el-input v-model="formChuLi.bankLeadIntruc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="行领导批示，最长为100字符" disabled :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td height="200">中心领导意见</td>
                  <td colspan="6">
                    <el-form-item prop="centLeadOpinions" class="noBorder">
                      <el-input v-model="formChuLi.centLeadOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="中心领导意见，最长为100字符" disabled :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td width="200" height="200;" align="center">内部意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="internalOpinions" class="noBorder">
                      <el-input v-model="formChuLi.internalOpinions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="内部意见，最长为100字符" disabled :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                  <td width="200" colspan="2">会签意见</td>
                  <td width="200" colspan="2">
                    <el-form-item prop="counterOpnions" class="noBorder">
                      <el-input v-model="formChuLi.counterOpnions" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="会签意见，最长为100字符" disabled :maxlength="100"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-row>
            <!-- <el-row> <el-button type="primary" plain  v-if="this.$route.query.key ==='1' || this.$route.query.key ==='100'" @click="submitTabChuLi()">保存</el-button></el-row> -->
            </el-form>
          </el-tab-pane>         
          <el-tab-pane v-if="showFormFanKui" label="协查结果反馈表" name="3">
            <el-form :model="formFanKui" ref="formFanKuiRule" :disabled="true">
              <el-row class="table">
                <table border="1" style="width: 880px;">
                  <tr>
                    <td width="200">
                      协查主体名称
                    </td>
                    <td width="600" colspan="5">
                      <el-form-item prop="fmainName" class="noBorder">
                        <el-input v-model="formFanKui.fmainName"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入,最长为40字符" :maxlength="40"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td width="200">
                      主要交易发生地
                    </td>
                    <td width="600" colspan="5" class="noBorder">
                      <el-form-item prop="fAddress">
                        <el-input v-model="formFanKui.fAddress"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入,最长为40字符"  :maxlength="40"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td width="200">
                      交易时间段
                    </td>
                    <td width="600" colspan="5" class="juZhong">
                       <el-form-item>
                          <el-date-picker
                            v-model="formFanKui.fDate"
                            clearable
                            type="daterange"
                            range-separator="至"
                            format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td width="200">
                      累计交易金额
                    </td>
                    <td>
                      <tr>
                        <td>
                          
                          <el-form-item label="人民币:" prop="fRmb" class="noBorder">
                            <el-input v-model="formFanKui.fRmb" :maxlength="20" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入,最长为20字符"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <el-form-item label="外币:" prop="fYb" class="noBorder">
                            <el-input v-model="formFanKui.fYb" :maxlength="20" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入,最长为20字符"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                    </td>
                    <td>涉及交易笔数</td>
                    <td>
                      <el-form-item prop="fNumber" class="noBorder">
                        <el-input v-model="formFanKui.fNumber" class="login-form-input" style="text-align: center" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :maxlength="20" placeholder="请输入,最长为20字符"></el-input>
                      </el-form-item>
                    </td>
                    <td>涉及主要账户个数</td>
                    <td>
                      <el-form-item prop="fAccount" class="noBorder">
                        <el-input v-model="formFanKui.fAccount" type="textarea" class="login-form-input" style="text-align: center" :autosize="{ minRows: 2, maxRows: 4}" :maxlength="20" placeholder="请输入,最长为20字符"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td width="200">分析概述</td>
                    <td width="600" colspan="5">
                      <div class="tableContainer">
                        <el-row>
                          <el-col :span="24"  style="text-align:left">
                            <!-- <h3 style="text-align:center">附件列表</h3> -->
                            <!-- v-show="!disabledBiao" -->
                            <!-- <el-upload
                                ref="showFileListFX"
                                v-show="!disabledBiao"
                                class="upload-demo"
                                :action="uploadUrlFX"
                                :on-success="showFileListFX"
                                :before-upload="handleBeforeUploadFenXi"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceedFenXi">
                                  <el-button size="small" type="primary" style="text-align:center">点击上传</el-button>
                                </el-upload> -->
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-table :data="tableDataFenXi.list" style="width: 700px">
                          <el-table-column label="序号" type="index" width="100"></el-table-column>
                          <!-- <el-table-column label="附件类型" prop="attachType"></el-table-column> -->
                          <el-table-column label="附件名称" prop="attachName"></el-table-column>
                          <el-table-column label="操作" width="140">
                            <template slot-scope="scope">
                              <el-button type="text"><a @click="downloadUrl(scope.row.attachId)">下载</a></el-button>
                              <!-- <el-button type="text" v-if="!isDisabled" @click="delRow(scope)">删除</el-button> -->
                            </template>
                          </el-table-column>
                        </el-table>
                        </el-row>
                        
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="200">附件</td>
                    <td width="600" colspan="5">
                      <div class="tableContainer">
                        <el-row>
                          <el-col :span="24" style="text-align:left">
                            <!-- <h3 style="text-align:center">附件列表</h3> -->
                            <!-- <el-upload
                                v-show="!disabledBiao"
                                ref="showFileList1"
                                class="upload-demo"
                                :action="uploadUrl"
                                :on-success="showFileList1"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed">
                                  <el-button size="small" type="primary" style="text-align:center">点击上传</el-button>
                                </el-upload> -->
                          </el-col>
                        </el-row>
                        <el-table :data="tableData1.list" style="width: 700px">
                          <el-table-column label="序号" type="index" width="100"></el-table-column>
                          <!-- <el-table-column label="附件类型" prop="attachType"></el-table-column> -->
                          <el-table-column label="附件名称" prop="attachName"></el-table-column>
                          <el-table-column label="操作" width="140">
                            <template slot-scope="scope">
                              <el-button type="text"><a @click="downloadUrl(scope.row.attachId)">下载</a></el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                          <!-- <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" background
                            :current-page="tableData1.currentPage"
                            :page-size="tableData1.pagesize"
                            :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData1.total">
                          </el-pagination> -->
                      </div>
                    </td>
                  </tr>
                </table>
              </el-row>
            </el-form>
            <!-- <el-row> <el-button type="primary" plain  v-if="this.$route.query.key ==='1' || this.$route.query.key ==='100'" @click="submitTabXieCha()">保存</el-button></el-row> -->
          </el-tab-pane>
          <el-tab-pane label="相关附件" name="4"  v-if="this.$route.query.status!=='数据录入已完成'&& isZeroSeven && this.bianhao !=='bianhao'">
            <!-- <Correlation></Correlation> -->
            <el-upload
            v-if="!isBan"
            ref="fileListZT"
            class="upload-demo"
            accept=".xls,.xlsx"
            :action="uploadUrl1"
            :on-success="showFileList"
            :on-preview="handlePreview"
            :on-error="onError"
            :on-remove="handleRemove"
            :before-upload="handleBeforeUpload"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed">
              <el-button size="small" type="primary" style="text-align:center">点击上传</el-button>
            </el-upload>
            <div class="tableContainer">
              <el-row>
                <el-col :span="8">
                  <span>附件列表</span>
                  <el-button  size="small" type="text"  v-if="!isBan" style="font-size:14px;margin-left:20px;" @click="downloadXie()">协查名单模板下载</el-button>
                </el-col>
              </el-row>
              <el-table :data="tableData.list">
                <el-table-column label="序号" type="index" width="100"></el-table-column>
                <!-- <el-table-column label="附件类型" prop="attachType"></el-table-column> -->
                <el-table-column label="附件名称" prop="attachName"></el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button style="text-align: center" type="text" @click="downloadUrl(scope.row.attachId)">下载</el-button>
                    <el-button  v-if="!isBan" type="text" @click="delRow(scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
                <!-- <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" background
                  :current-page="tableData.currentPage"
                  :page-size="tableData.pagesize"
                  :page-sizes="[10, 20, 30, 40,50]" layout="total, sizes, prev, pager, next, jumper"
                  :total="tableData.total">
                </el-pagination> -->
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="流转信息" name="5">
            <Transfer-Info></Transfer-Info>
          </el-tab-pane> -->
        </el-tabs>
      </div>

      <!-- 弹出框 -->
      <el-dialog title="任务提交" :visible.sync="dialogVisible" width="600px" class="dialog-block">
        <div class="task">
          <el-form :model="form" label-width="100px">
            <el-form-item label="任务流向：">
              <el-tag style="margin-left:10px">送移送处处长审核</el-tag>
            </el-form-item>
            <el-form-item label="待选用户：">
              <el-radio v-model="form.radio" label="1">备选项1</el-radio>
              <el-radio v-model="form.radio" label="2">备选项2</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <!-- <el-row>
        <el-col :span="23" :offset="1">
          <el-transfer
          v-model="dialogBlock.value1"
          :data="dialogBlock.transferData"
          :titles="['待选用户', '已选用户']"
          ></el-transfer>
        </el-col>
      </el-row> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 意见 -->
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
// import Edit from '@/views/sys-monitoringAnalysis/cueManage/investigation/edit'
import ArchivesList from '@/views/sys-monitoringAnalysis/cueManage/investigation/archivesList'
import Correlation from '@/views/sys-monitoringAnalysis/cueManage/investigation/correlation'
import TransferInfo from '@/views/sys-monitoringAnalysis/cueManage/investigation/transferInfo'
import FeedBack from '@/views/sys-monitoringAnalysis/cueManage/investigation/feedback'
import { checkInfo, addNew, getFileList, downloadFile, deleteFileById, getRoot, getDeptAllRoles, getSheZui, updateInvestigation } from '@/api/sys-monitoringAnalysis/cueManage/investigation/investigation.js'
import { mapGetters } from 'vuex'
import { MYgetsourceBusinessArr } from '@/api/sys-monitoringAnalysis/cueManage/levelConfiguration.js'
// import { noSpaceAndTs } from '@/utils/formValidate' // 没有空格和特殊字符校验
import { noNothing, commonPattern, isValidBlank, headerAndFooter } from '@/utils/formValidate' // 不能为空没有空格和特殊字符校验
import { getToken } from '@/utils/auth' // 验权
export default {
  components: {
    ArchivesList,
    Correlation,
    TransferInfo,
    FeedBack
  },
  data() {
    //  const generateData = _ => {
    //    const data = []
    //    for (let i = 1; i <= 10; i++) {
    //      data.push({
    //        key: i,
    //        label: `备选项 ${i}`
    //      })
    //    }
    //    return data
    //  }
    return {
      tableDataFenXi: {
        list: [],
        currentPage: 1,
        pagesize: 10,
        total: 0
      },
      dialogVisibleSelect: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      dynamicValidateFormNew: {
        domains: [
          {
            contactName: null,
            contactPhone: null
          }
        ],
        domains1: [
          {
            respoName: null,
            respoPhone: null
          }
        ]
      },
      domainRules: {
        // '联系人'
        contactName: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // '联系人电话',
        contactPhone: [
          { max: 20, message: '长度不得大于20个字符', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // '负责人',
        respoName: [
          { max: 20, message: '长度不得大于20个字符', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // '负责人电话',
        respoPhone: [
          { max: 20, message: '长度不得大于20个字符', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ]
      },
      editableTabsValue: '2',
      dialogVisible: false,
      adviceVisible: false,
      form: {
        radio: '1'
      },
      // 境内协查类文件新增
      editList:
        { user: this.name },
      // 办理信息数据
      formEdit: {
        inp1: '', // 移送经办人 根据登录用户返显
        inp2: '',
        inp3: '',
        inp4: '',
        inp5: '',
        inp6: '',
        inp7: '', // 来件个人主体数
        inp8: '', // 来件机构主体数
        inp9: '', // 来件账户数
        inp10: '',
        inp11: '', // 协查结果个人数
        inp12: '', // 协查结果机构数
        inp13: '', // 协查结果主体数
        inp14: '', // 交易笔数
        inp15: '', // 交易账户数
        inp16: '', // 本币交易金额(万元RMB)
        inp17: '', // 外币交易金额(折约万美元)
        inp18: '', // 备注项
        select: '',
        select2: 'FXQ005', // 预分配处室
        select3: '', // 预分配分析员
        select3Arr: [],
        select4: 'FXQ005', // 分析处室
        select5: '', // 分析员
        select5Arr: []
      },
      // 办理信息表单校验规则
      formEditRules: {
        // 移送经办人
        inp1: [
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 来件个人主体数
        inp7: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 来件机构主体数
        inp8: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 来件账户数
        inp9: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 协查结果个人数
        inp11: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 协查结果机构数
        inp12: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 协查结果主体数
        inp13: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 交易笔数
        inp14: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 交易账户数
        inp15: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // 本币交易金额(万元RMB)
        inp16: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // 外币交易金额(折约万美元)
        inp17: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // 备注项
        inp18: [
        ],
        // 预分配处室
        select2: [
        ],
        // 预分配分析员
        select3: [
        ],
        // 分析处室
        select4: [
        ],
        // 分析员
        select5: [
        ]
      },
      // 办理状态禁用
      isBan: false,
      // 处理单数据
      formChuLi: {
        hostRoom: '', // 主办处室
        agentsTelephone: '', // 经办人及电话
        fileContent: '', // 请示内容
        bankLeadIntruc: '', // 行领导批示
        centLeadOpinions: '', // 中心领导意见
        internalOpinions: '', // 内部意见
        counterOpnions: '' // 会签意见
      },
      // 处理单校验规则
      formChuLiRules: {
        hostRoom: [
          { validator: headerAndFooter, trigger: 'blur' }
        ], // 主办处室
        agentsTelephone: [
          { validator: headerAndFooter, trigger: 'blur' }
        ], // 经办人及电话
        fileContent: [
        ], // 请示内容
        bankLeadIntruc: [
          { validator: isValidBlank, trigger: 'blur' }
        ], // 行领导批示
        centLeadOpinions: [
          { validator: isValidBlank, trigger: 'blur' }
        ], // 中心领导意见
        internalOpinions: [
          { validator: isValidBlank, trigger: 'blur' }
        ], // 内部意见
        counterOpnions: [
          { validator: isValidBlank, trigger: 'blur' }
        ] // 会签意见
      },
      // 协查文件档案表
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm1: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm2: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm3: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      // 协查文件档案表
      formArchives: {
        inp1: '',
        inp2: '',
        inp3: '',
        inp4: '',
        inp5: '',
        inp6: '',
        inp7: '',
        inp8: '',
        inp9: '',
        inp10: '',
        inp11: '',
        inp12: '',
        inp13: '',
        resource: '',
        select: '',
        select2: [],
        select3: []
      },
      // 涉罪类型
      sheZui: [],
      // 协查文件档案表校验规则
      formArchivesRules: {
        // 来件日期
        inp1: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: isValidBlank, trigger: 'blur' }
        ],
        // 协查文号
        inp3: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ],
        // 关联文号
        inp2: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ],
        // 协查类型
        resource: [
          { required: true, message: '内容不能为空', trigger: 'change' },
          { validator: noNothing, trigger: 'change' }
        ],
        // 紧急程度
        select: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        // 涉罪类型
        select2: [
          { required: false, message: '内容不能为空', trigger: 'change' }
        ],
        // 来文标题
        inp4: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ],
        // 案情简介
        inp7: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
          // { validator: noNothing, trigger: 'blur' }
        ],
        // 请求事项
        inp8: [
          // { validator: this.zzInfo, trigger: 'blur' }
        ],
        // 案情标签
        inp5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: noNothing, trigger: 'blur' }
        ],
        // 来文单位
        inp6: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ]
        // 请求事项
        // inp8: [
        //   { validator: noSpaceAndTs, trigger: 'blur' }
        // ]
      },
      contactInfoDOS: [],
      options5: [{
        value: '1',
        label: '协查名单1'
      }, {
        value: '2',
        label: '协查名单2'
      }, {
        value: '3',
        label: '协查名单3'
      }],
      // 附件列表
      fileList: [],
      tableData: {
        list: [],
        currentPage: 1,
        pagesize: 10,
        total: 10
      },
      // 协查反馈表表单数据
      formFanKui: {
        fmainName: '', // '协查主体名称',
        fAddress: '', // '主要交易发生地',
        fDate: '', // '交易时间段',
        fRmb: '', // '累计交易金额(人民币)',
        fYb: '', // '累计交易金额(外币)',
        fNumber: '', // '涉及交易笔数',
        fAccount: '' // '涉及主要账户个数'
      },
      showFormFanKui: false,
      // 协查反馈表表单校验规则
      formFanKuiRules: {
        // '协查主体名称',
        fmainName: [
          { validator: noNothing, trigger: 'blur' }
        ],
        // '主要交易发生地',
        fAddress: [
          { validator: noNothing, trigger: 'blur' }
        ],
        // '交易时间段',
        fDate: [
          { validator: noNothing, trigger: 'blur' }
        ],
        // '累计交易金额(人民币)',
        fRmb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // '累计交易金额(外币)',
        fYb: [
          { pattern: /^\d+(\.\d{1,3})*$/, message: '必须是数字且保留3位小数', trigger: 'blur' }
        ],
        // '涉及交易笔数',
        fNumber: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ],
        // '涉及主要账户个数'
        fAccount: [
          { pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur' }
        ]
      },
      // 反馈表的附件列表
      tableData1: {
        list: [],
        currentPage: 1,
        pagesize: 10,
        total: 10
      },
      assistId: '',
      proId: '',
      mainId: '',
      stopRepeat: 0,
      fenXiOne: 'FXQ005',
      domainsInfoList: [],
      laiwenUnitArr: [],
      urgencyDegreeArr: [],
      loading: '',
      submitFlag: false,
      mainIdArr: [],
      isZeroSeven: true,
      bianhao: ''
    }
  },
  computed: {
    // aa() {
    //   return this.$route.query.key || '0'
    // },
    ...mapGetters(['institution']),
    ...mapGetters(['name']),
    ...mapGetters(['roles']),
    isCenter() {
      return this.institution === this.GLOBAL.INSTITUTION_CENTER
    },
    // 获取涉罪类型
    getRestDictionary() {
      getSheZui('TOSC').then(res => {
        this.sheZui = res.data
      })
      const page = {
        pageNum: '1',
        pageSize: '999'
      }
      MYgetsourceBusinessArr(page, '0').then(res => {
        if (res.code === 200) {
          this.laiwenUnitArr = res.data.list
        }
      }).catch(() => {
        this.loadingA = false
      })
      MYgetsourceBusinessArr(page, '1').then(res => {
        if (res.code === 200) {
          this.urgencyDegreeArr = res.data.list
        }
      }).catch(() => {
        this.loadingA = false
      })
    },
    // 上传附件
    uploadUrl() {
      return `monitor/assist/upload-attach?assistId=` + this.assistId + `&token=` + getToken()
    },
    uploadUrl1() {
      return `monitor/assist/uploadNameList?assistId=` + this.assistId + `&token=` + getToken()
    }

  },
  mounted() {
    this.bianhao = this.$route.query.bianhao
    if (this.bianhao === 'bianhao') {
      this.editableTabsValue = '3'
    }
    this.getRootNothing()
    this.formEdit.inp1 = this.name
    if (this.$route.query.key === '0' || this.$route.query.key === '007') {
      this.isZeroSeven = true
      this.isBan = true
      this.assistId = this.$route.query.assistId
      this.getFileListInfo(this.$route.query.assistId)
      this.getFileListInfo1(this.assistId)
      this.getFileListInfoFenXi(this.assistId + '1')
      this.$nextTick(() => {
        this.checkInfoList(this.$route.query.assistId)
      })
    }
    // 境内情报情报文件列表跳转过来
    // if (this.$route.query.key === '007') {
    //   this.isZeroSeven = false
    //   this.isBan = true
    //   this.assistId = this.$route.query.assistId
    //   // this.getFileListInfo(this.$route.query.assistId)
    //   // if (this.assistId !== null) {
    //   //   this.getFileListInfo1(this.assistId)
    //   //   this.getFileListInfoFenXi(this.assistId + '1')
    //   //   this.checkInfoListXie(this.$route.query.assistId)
    //   // }
    //   this.getFileListInfo1(this.assistId)
    //   this.getFileListInfoFenXi(this.assistId + '1')
    //   this.checkInfoListXie(this.$route.query.assistId)
    //   this.$nextTick(() => {
    //     this.checkInfoList(this.$route.query.assistId)
    //   })
    // }
    if (this.$route.query.isView === '1') {
      this.isZeroSeven = true
      this.isBan = true
      this.assistId = this.$route.query.id
      this.getFileListInfo(this.$route.query.id)
      this.getFileListInfo1(this.assistId)
      this.getFileListInfoFenXi(this.assistId + '1')
      this.$nextTick(() => {
        this.checkInfoList(this.$route.query.id)
      })
    }
    if (this.$route.query.key === '1') {
      this.isZeroSeven = true
      this.getDeptAllRolesIE()
    }
    if (this.$route.query.key === '100') {
      this.isZeroSeven = true
      this.isBan = false
      this.assistId = this.$route.query.assistId
      // this.checkInfoList(this.$route.query.assistId)
      this.getFileListInfo(this.$route.query.assistId)
      this.getFileListInfo1(this.assistId)
      this.getFileListInfoFenXi(this.assistId + '1')
      this.getDeptAllRolesIE()
      this.$nextTick(() => {
        this.checkInfoList(this.$route.query.assistId)
      })
    }
    this.getRestDictionary()
    //  else {
    //   this.checkInfoList(this.$route.query.assistId)
    //   this.getFileListInfo(this.$route.query.assistId)
    // }
  },
  // beforeDestroy() {
  //   this.submitTabBanLi()
  // },
  methods: {
    // 分析概述列表
    getFileListInfoFenXi(id) {
      getFileList(id).then(res => {
        this.tableDataFenXi.list = res.data
      })
    },
    zzInfo(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else {
        callback()
      }
    },
    // ie垃圾
    getDeptAllRolesIE() {
      getDeptAllRoles(this.fenXiOne).then(res => {
        // this.formEdit.select3 = res.data[0]
        // this.formEdit.select5 = res.data[0]
        this.formEdit.select3Arr = res.data
        this.formEdit.select5Arr = res.data
      })
    },
    // 预分配处室联动
    select2Change() {
      this.formEdit.select3 = ''
      this.formEdit.select3Arr = []
      if (this.formEdit.select2 === '') {
        return false
      }
      getDeptAllRoles(this.formEdit.select2).then(res => {
        // if (res.data) {
        //   this.formEdit.select3 = res.data[0]
        // }
        this.formEdit.select3Arr = res.data
      })
    },
    // 分析处室联动
    select4Change() {
      this.formEdit.select5 = ''
      this.formEdit.select5Arr = []
      if (this.formEdit.select4 === '') {
        return false
      }
      getDeptAllRoles(this.formEdit.select4).then(res => {
        // if (res.data) {
        //   this.formEdit.select5 = res.data[0]
        // }
        this.formEdit.select5Arr = res.data
      })
    },
    // 新增联系人负责人
    addDomainNew() {
      this.dynamicValidateFormNew.domains.push({
        contactName: null,
        contactPhone: null
      })
      // 最多添加10个联系人
      if (this.dynamicValidateFormNew.domains.length > 10) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: '最多添加10条数据'
        })
        this.dynamicValidateFormNew.domains = this.dynamicValidateFormNew.domains.slice(0, 10)
      }
    },
    addDomainNew1() {
      this.dynamicValidateFormNew.domains1.push({
        respoName: null,
        respoPhone: null
      })
      // 最多添加10个联系人
      if (this.dynamicValidateFormNew.domains1.length > 10) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: '最多添加10条数据'
        })
        this.dynamicValidateFormNew.domains1 = this.dynamicValidateFormNew.domains1.slice(0, 10)
      }
    },
    // 删除一条
    removeDomainNew(item) {
      var index = this.dynamicValidateFormNew.domains.indexOf(item)
      if (this.dynamicValidateFormNew.domains.length === 1) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: '最少保留1条数据'
        })
        return false
      } else {
        this.dynamicValidateFormNew.domains.splice(index, 1)
      }
    },
    removeDomainNew1(item) {
      var index = this.dynamicValidateFormNew.domains1.indexOf(item)
      if (this.dynamicValidateFormNew.domains1.length === 1) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: '最少保留1条数据'
        })
        return false
      } else {
        this.dynamicValidateFormNew.domains1.splice(index, 1)
      }
    },
    // 获取用户权限
    getRootNothing() {
      getRoot().then(res => {
        console.log(res)
      })
    },
    // 下载附件
    // downloadUrl(scope) {
    //   return `http://10.10.121.119:8087/upload/download/` + scope
    // },
    downloadUrl(scope) {
      location.href = '/file-service/upload/download/' + scope + '?moduleName=' + encodeURI('线索管理')
    },
    downloadXie() {
      location.href = `/monitor/assist/download/assistNameListTemplate?token=` + getToken()
    },
    // 只有协查结果反馈表详情
    checkInfoListXie(id) {
      checkInfo(id).then(res => {
        this.isZeroSeven = false
        // 协查结果反馈表
        if (res.data.contactInfoDOS.length !== 0) {
          // this.mainId = res.data.contactInfoDOS[0].mainId
          this.dynamicValidateFormNew.domains = []
          this.dynamicValidateFormNew.domains1 = []
          this.mainIdArr = []
          res.data.contactInfoDOS.forEach(item => {
            if (item.contactName !== '' && item.contactPhone !== '') {
              this.dynamicValidateFormNew.domains.push({ contactName: item.contactName, contactPhone: item.contactPhone })
            }
            this.mainIdArr.push(item.mainId)
            if (item.respoName !== '' && item.respoPhone !== '') {
              this.dynamicValidateFormNew.domains1.push({ respoName: item.respoName, respoPhone: item.respoPhone })
            }
          })
          // 编辑的联系人显示
          if (this.dynamicValidateFormNew.domains.length === 0 && this.$route.query.key === '100') {
            this.dynamicValidateFormNew.domains.push({ contactName: '', contactPhone: '' })
          }
          if (this.dynamicValidateFormNew.domains1.length === 0 && this.$route.query.key === '100') {
            this.dynamicValidateFormNew.domains1.push({ respoName: '', respoPhone: '' })
          }
        } else {
          this.dynamicValidateFormNew.domains = []
          this.dynamicValidateFormNew.domains1 = []
          this.dynamicValidateFormNew.domains.push({
            contactName: null,
            contactPhone: null
          })
          this.dynamicValidateFormNew.domains1.push({
            respoName: null,
            respoPhone: null
          })
        }
        if (res.data.fdate === null) {
          res.data.fdate = []
        }
        this.formFanKui.fmainName = res.data.fmainName
        this.formFanKui.fAddress = res.data.faddress
        if (res.data.fdate !== null && res.data.fdate !== [] && res.data.fdate !== '') {
          this.formFanKui.fDate = JSON.parse(res.data.fdate)
        } else {
          this.formFanKui.fDate = []
        }
        this.formFanKui.fRmb = res.data.frmb
        this.formFanKui.fYb = res.data.fyb
        this.formFanKui.fNumber = res.data.fnumber
        this.formFanKui.fAccount = res.data.faccount
        // this.formFanKui.fmainName = res.data.fmainName
        // this.dynamicValidateFormNew.domains = []
        // this.dynamicValidateFormNew.domains1 = []
        // res.data.contactInfoDOS.forEach(item => {
        //   if ((item.contactName !== '' && item.contactName !== null) || (item.contactPhone !== '' && item.contactPhone !== null)) {
        //     this.dynamicValidateFormNew.domains.push({ contactName: item.contactName, contactPhone: item.contactPhone })
        //   }
        //   if ((item.respoName !== '' && item.respoName !== null) || (item.respoPhone !== '' && item.respoPhone !== null)) {
        //     this.dynamicValidateFormNew.domains1.push({ respoName: item.respoName, respoPhone: item.respoPhone })
        //   }
        // })
      })
    },
    // 查看详情
    checkInfoList(id) {
      checkInfo(id).then(res => {
        // 办理信息详情
        this.formEdit.select2 = res.data.preDistributionOffice
        this.formEdit.select3 = res.data.preAssignedAnalysts
        this.formEdit.select4 = res.data.analysisRoom
        this.formEdit.select5 = res.data.analysts
        this.formEdit.inp7 = res.data.perSubjectsNum
        this.formEdit.inp8 = res.data.mecSubjectsNum
        this.formEdit.inp9 = res.data.accountNumber
        this.formEdit.inp11 = res.data.indInvestigationRes
        this.formEdit.inp12 = res.data.institutionalRes
        this.formEdit.inp13 = res.data.mbInvestigationRes
        this.formEdit.inp14 = res.data.transactionNumber
        this.formEdit.inp15 = res.data.transactionAccounts
        this.formEdit.inp16 = res.data.localCurrency
        this.formEdit.inp17 = res.data.foreignCurrency
        this.formEdit.inp18 = res.data.memoItem
        // 协查文件档案表
        this.formArchives.inp1 = res.data.dateArrial// 来件日期
        this.formArchives.inp3 = res.data.referenceNumber// 协查文号
        this.formArchives.inp2 = res.data.associatedSymbol// 关联文号
        this.formArchives.resource = res.data.investigationType// 协查类型
        this.formArchives.select = res.data.assUrgency// 紧急程度
        this.formArchives.select2 = JSON.parse(res.data.crimeType)// 涉罪类型

        this.formArchives.inp4 = res.data.communicationTitle// 来文标题
        this.formArchives.inp7 = res.data.caseIntroduction// 案情简介
        this.formArchives.inp5 = res.data.caseLabel// 案情标签
        this.formArchives.inp6 = res.data.communicationUnite// 来文单位
        this.formArchives.inp8 = res.data.requestItems// 请求事项
        // this.formArchives.inp10 = res.data.linkMan// 联系人
        // this.formArchives.inp11 = res.data.linkmanPhone// 联系人电话
        // this.formArchives.inp12 = res.data.responsiblePerson// 负责人
        // this.formArchives.inp13 = res.data.prinCipalsTel// 负责人电话
        // 处理单数据
        this.formChuLi.hostRoom = res.data.hostRoom
        this.formChuLi.agentsTelephone = res.data.agentsTelephone
        this.formChuLi.fileContent = res.data.fileContent
        this.formChuLi.bankLeadIntruc = res.data.bankLeadIntruc
        this.formChuLi.centLeadOpinions = res.data.centLeadOpinions
        this.formChuLi.internalOpinions = res.data.internalOpinions
        this.formChuLi.counterOpnions = res.data.counterOpnions
        // 协查结果反馈表
        if (res.data.contactInfoDOS.length !== 0) {
          // this.mainId = res.data.contactInfoDOS[0].mainId
          this.dynamicValidateFormNew.domains = []
          this.dynamicValidateFormNew.domains1 = []
          this.mainIdArr = []
          res.data.contactInfoDOS.forEach(item => {
            if ((item.contactName !== '' && item.contactName !== null) || (item.contactPhone !== null || item.contactPhone !== null)) {
              this.dynamicValidateFormNew.domains.push({ contactName: item.contactName, contactPhone: item.contactPhone })
            } else {
              this.dynamicValidateFormNew.domains.push({
                contactName: null,
                contactPhone: null
              })
            }
            this.mainIdArr.push(item.mainId)
            if ((item.respoName !== '' && item.respoName !== null) || (item.respoPhone !== '' && item.respoPhone !== null)) {
              this.dynamicValidateFormNew.domains1.push({ respoName: item.respoName, respoPhone: item.respoPhone })
            } else {
              this.dynamicValidateFormNew.domains1.push({
                respoName: null,
                respoPhone: null
              })
            }
          })
          // 编辑的联系人显示
          if (this.dynamicValidateFormNew.domains.length === 0 && this.$route.query.key === '100') {
            this.dynamicValidateFormNew.domains.push({ contactName: '', contactPhone: '' })
          }
          if (this.dynamicValidateFormNew.domains1.length === 0 && this.$route.query.key === '100') {
            this.dynamicValidateFormNew.domains1.push({ respoName: '', respoPhone: '' })
          }
        } else {
          this.dynamicValidateFormNew.domains = []
          this.dynamicValidateFormNew.domains1 = []
          this.dynamicValidateFormNew.domains.push({
            contactName: null,
            contactPhone: null
          })
          this.dynamicValidateFormNew.domains1.push({
            respoName: null,
            respoPhone: null
          })
        }
        // 判断协查结果反馈表是否显示
        if ((res.data.faccount === '' || res.data.faccount === null) && (res.data.faddress === '' || res.data.faddress === null) && (res.data.fdate === '' || res.data.fdate === null) && (res.data.frmb === '' || res.data.frmb === null) && (res.data.fyb === '' || res.data.fyb === null) && (res.data.fnumber === '' || res.data.fnumber === null) && (res.data.fmainName === '' || res.data.fmainName === null) && this.tableDataFenXi.list.length === 0) {
          this.showFormFanKui = false
        } else {
          this.showFormFanKui = true
          if (res.data.fdate === null) {
            res.data.fdate = []
          }
          this.formFanKui.fmainName = res.data.fmainName
          this.formFanKui.fAddress = res.data.faddress
          if (res.data.fdate !== null && res.data.fdate !== [] && res.data.fdate !== '') {
            this.formFanKui.fDate = JSON.parse(res.data.fdate)
          } else {
            this.formFanKui.fDate = []
          }
          this.formFanKui.fRmb = res.data.frmb
          this.formFanKui.fYb = res.data.fyb
          this.formFanKui.fNumber = res.data.fnumber
          this.formFanKui.fAccount = res.data.faccount
        }
        // this.formFanKui.fmainName = res.data.fmainName
        // this.dynamicValidateFormNew.domains = []
        // this.dynamicValidateFormNew.domains1 = []
        // res.data.contactInfoDOS.forEach(item => {
        //   if ((item.contactName !== '' && item.contactName !== null) || (item.contactPhone !== '' && item.contactPhone !== null)) {
        //     this.dynamicValidateFormNew.domains.push({ contactName: item.contactName, contactPhone: item.contactPhone })
        //   }
        //   if ((item.respoName !== '' && item.respoName !== null) || (item.respoPhone !== '' && item.respoPhone !== null)) {
        //     this.dynamicValidateFormNew.domains1.push({ respoName: item.respoName, respoPhone: item.respoPhone })
        //   }
        // })
      })
    },
    // 附件列表
    getFileListInfo(id) {
      getFileList(id).then(res => {
        this.tableData.list = res.data
      })
    },
    // 反馈表附件列表
    getFileListInfo1(id) {
      getFileList(id).then(res => {
        this.tableData1.list = res.data
      })
    },
    // 通过tabs标签控制按钮禁用启用
    // showHideMenu() {
    //   console.log(this.editableTabsValue)
    // },
    // 保存办理信息
    // submitTabBanLi() {
    //   const banLiInfo = {
    //     conductInfoDO: {
    //       transferAgent: this.formEdit.inp1, // "移送经办人"
    //       preDistributionOffice: this.formEdit.select2, // "预分配处室"
    //       preAssignedAnalysts: this.formEdit.select3, // "预分配分析员"
    //       analysisRoom: this.formEdit.select4, //  "分析处室"
    //       analysts: this.formEdit.select5, // "分析员"
    //       perSubjectsNum: this.formEdit.inp7, // "来件个人主体数"
    //       mecSubjectsNum: this.formEdit.inp8, //  "来件机构主体数"
    //       accountNumber: this.formEdit.inp9, // "来件账户数"
    //       indInvestigationRes: this.formEdit.inp11, //  "协查结果个人数"
    //       institutionalRes: this.formEdit.inp12, // '协查结果机构数',
    //       mbInvestigationRes: this.formEdit.inp13, // '协查结果主体数',
    //       transactionNumber: this.formEdit.inp14, // '交易笔数',
    //       localCurrency: this.formEdit.inp16, // '本币交易额',
    //       foreignCurrency: this.formEdit.inp17, // '外币交易额',
    //       transactionAccounts: this.formEdit.inp15, // '交易账户数',
    //       memoItem: this.formEdit.inp18 // '备注'
    //     },
    //     flag: '1'
    //   }
    //   singlePageSave(banLiInfo).then(res => {
    //     console.log(res)
    //   })
    // },
    // // 处理信息
    // submitTabChuLi() {
    //   const chuLiInfo = {
    //     flag: '2',
    //     processDO: {
    //       hostRoom: this.formChuLi.hostRoom, // '主办处室',
    //       agentsTelephone: this.formChuLi.agentsTelephone, // '经办人及电话',
    //       fileContent: this.formChuLi.fileContent, // '请示内容',
    //       bankLeadIntruc: this.formChuLi.bankLeadIntruc, // '行领导批示',
    //       centLeadOpinions: this.formChuLi.centLeadOpinions, // '中心领导意见',
    //       internalOpinions: this.formChuLi.internalOpinions, // '内部意见',
    //       counterOpnions: this.formChuLi.counterOpnions // '会签意见'
    //     }
    //   }

    //   singlePageSave(chuLiInfo).then(res => {
    //     console.log(res)
    //   })
    // },
    // submitTabFanKui() {
    //   if (this.dynamicValidateFormNew.domains.length === this.dynamicValidateFormNew.domains1.length) {
    //     this.domainsInfoList = []
    //     for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
    //       const arr = {
    //         contactName: this.dynamicValidateFormNew.domains[i].contactName,
    //         contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
    //         respoName: this.dynamicValidateFormNew.domains1[i].respoName,
    //         respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
    //       }
    //       this.domainsInfoList.push(arr)
    //     }
    //   } else if (this.dynamicValidateFormNew.domains.length > this.dynamicValidateFormNew.domains1.length) {
    //     this.domainsInfoList = []
    //     for (let i = 0; i < this.dynamicValidateFormNew.domains1.length; i++) {
    //       const arr = {
    //         contactName: this.dynamicValidateFormNew.domains[i].contactName,
    //         contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
    //         respoName: this.dynamicValidateFormNew.domains1[i].respoName,
    //         respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
    //       }
    //       this.domainsInfoList.push(arr)
    //     }
    //     // const len = this.dynamicValidateFormNew.domains.length - this.dynamicValidateFormNew.domains1.length
    //     for (let index = this.dynamicValidateFormNew.domains1.length; index < this.dynamicValidateFormNew.domains.length; index++) {
    //       const arr1 = {
    //         contactName: this.dynamicValidateFormNew.domains[index].contactName,
    //         contactPhone: this.dynamicValidateFormNew.domains[index].contactPhone,
    //         respoName: '',
    //         respoPhone: ''
    //       }
    //       this.domainsInfoList.push(arr1)
    //     }
    //   } else {
    //     this.domainsInfoList = []
    //     for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
    //       const arr = {
    //         contactName: this.dynamicValidateFormNew.domains[i].contactName,
    //         contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
    //         respoName: this.dynamicValidateFormNew.domains1[i].respoName,
    //         respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
    //       }
    //       this.domainsInfoList.push(arr)
    //     }
    //     // const len = this.dynamicValidateFormNew.domains1.length - this.dynamicValidateFormNew.domains.length
    //     for (let index = this.dynamicValidateFormNew.domains.length; index < this.dynamicValidateFormNew.domains1.length; index++) {
    //       const arr1 = {
    //         contactName: '',
    //         contactPhone: '',
    //         respoName: this.dynamicValidateFormNew.domains1[index].respoName,
    //         respoPhone: this.dynamicValidateFormNew.domains1[index].respoPhone
    //       }
    //       this.domainsInfoList.push(arr1)
    //     }
    //   }
    //   const formArchivesInfo = {
    //     documentsDO: {
    //       dateArrial: this.formArchives.inp1, // 来件日期
    //       assUrgency: this.formArchives.select, // 紧急程度
    //       associatedSymbol: this.formArchives.inp2, // 关联文号
    //       caseIntroduction: this.formArchives.inp7, // 案情简介
    //       caseLabel: this.formArchives.inp5, // 案情标签
    //       communicationTitle: this.formArchives.inp4, // 来文标题
    //       communicationUnite: this.formArchives.inp6, // 来文单位
    //       crimeType: this.formArchives.select2, // 涉罪类型
    //       investigationType: this.formArchives.resource, // 协查类型
    //       referenceNumber: this.formArchives.inp3, // 协查文号
    //       requestItems: this.formArchives.inp8 // 请求事项

    //     },
    //     contactInfoDO: this.domainsInfoList,
    //     flag: '3'
    //   }
    //   singlePageSave(formArchivesInfo).then(res => {
    //     console.log(res)
    //   })
    // },
    // 提交表单
    submitTab() {
      if (this.stopRepeat === 1) {
        return false
      } else {
        if (this.roles === 'center') {
          this.$refs['formChuLiRule'].validate((valid) => {
            if (valid) {
              // 先校验办理信息
              this.$refs['formEditRef'].validate((valid) => {
                if (valid) {
                  // 办理信息校验通过校验协查文档
                  this.$refs['formArchivesRule'].validate((valid) => {
                    if (valid) {
                      if (this.dynamicValidateFormNew.domains.length === this.dynamicValidateFormNew.domains1.length) {
                        this.domainsInfoList = []
                        for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
                          const arr = {
                            contactName: this.dynamicValidateFormNew.domains[i].contactName,
                            contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                            respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                            respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                          }
                          this.domainsInfoList.push(arr)
                        }
                      } else if (this.dynamicValidateFormNew.domains.length > this.dynamicValidateFormNew.domains1.length) {
                        this.domainsInfoList = []
                        for (let i = 0; i < this.dynamicValidateFormNew.domains1.length; i++) {
                          const arr = {
                            contactName: this.dynamicValidateFormNew.domains[i].contactName,
                            contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                            respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                            respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                          }
                          this.domainsInfoList.push(arr)
                        }
                        // const len = this.dynamicValidateFormNew.domains.length - this.dynamicValidateFormNew.domains1.length
                        for (let index = this.dynamicValidateFormNew.domains1.length; index < this.dynamicValidateFormNew.domains.length; index++) {
                          const arr1 = {
                            contactName: this.dynamicValidateFormNew.domains[index].contactName,
                            contactPhone: this.dynamicValidateFormNew.domains[index].contactPhone,
                            respoName: '',
                            respoPhone: ''
                          }
                          this.domainsInfoList.push(arr1)
                        }
                      } else {
                        this.domainsInfoList = []
                        for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
                          const arr = {
                            contactName: this.dynamicValidateFormNew.domains[i].contactName,
                            contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                            respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                            respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                          }
                          this.domainsInfoList.push(arr)
                        }
                        // const len = this.dynamicValidateFormNew.domains1.length - this.dynamicValidateFormNew.domains.length
                        for (let index = this.dynamicValidateFormNew.domains.length; index < this.dynamicValidateFormNew.domains1.length; index++) {
                          const arr1 = {
                            contactName: '',
                            contactPhone: '',
                            respoName: this.dynamicValidateFormNew.domains1[index].respoName,
                            respoPhone: this.dynamicValidateFormNew.domains1[index].respoPhone
                          }
                          this.domainsInfoList.push(arr1)
                        }
                      }
                      this.stopRepeat++
                      const formArchivesInfo = {
                        assistId: this.assistId,
                        processDO: {
                          hostRoom: this.formChuLi.hostRoom, // '主办处室',
                          agentsTelephone: this.formChuLi.agentsTelephone, // '经办人及电话',
                          fileContent: this.formChuLi.fileContent, // '请示内容',
                          bankLeadIntruc: this.formChuLi.bankLeadIntruc, // '行领导批示',
                          centLeadOpinions: this.formChuLi.centLeadOpinions, // '中心领导意见',
                          internalOpinions: this.formChuLi.internalOpinions, // '内部意见',
                          counterOpnions: this.formChuLi.counterOpnions // '会签意见'
                        },
                        conductInfoDO: {
                          transferAgent: this.formEdit.inp1, // "移送经办人"
                          preDistributionOffice: this.formEdit.select2, // "预分配处室"
                          preAssignedAnalysts: this.formEdit.select3, // "预分配分析员"
                          analysisRoom: this.formEdit.select4, //  "分析处室"
                          analysts: this.formEdit.select5, // "分析员"
                          perSubjectsNum: this.formEdit.inp7, // "来件个人主体数"
                          mecSubjectsNum: this.formEdit.inp8, //  "来件机构主体数"
                          accountNumber: this.formEdit.inp9, // "来件账户数"
                          indInvestigationRes: this.formEdit.inp11, //  "协查结果个人数"
                          institutionalRes: this.formEdit.inp12, // '协查结果机构数',
                          mbInvestigationRes: this.formEdit.inp13, // '协查结果主体数',
                          transactionNumber: this.formEdit.inp14, // '交易笔数',
                          localCurrency: this.formEdit.inp16, // '本币交易额',
                          foreignCurrency: this.formEdit.inp17, // '外币交易额',
                          transactionAccounts: this.formEdit.inp15, // '交易账户数',
                          memoItem: this.formEdit.inp18 // '备注'
                        },
                        documentsDO: {
                          dateArrial: this.formArchives.inp1, // 来件日期
                          assUrgency: this.formArchives.select, // 紧急程度
                          associatedSymbol: this.formArchives.inp2, // 关联文号
                          caseIntroduction: this.formArchives.inp7, // 案情简介
                          caseLabel: this.formArchives.inp5, // 案情标签
                          communicationTitle: this.formArchives.inp4, // 来文标题
                          communicationUnite: this.formArchives.inp6, // 来文单位
                          crimeType: this.formArchives.select2, // 涉罪类型
                          investigationType: this.formArchives.resource, // 协查类型
                          referenceNumber: this.formArchives.inp3, // 协查文号
                          requestItems: this.formArchives.inp8 // 请求事项

                          // linkMan: this.formArchives.inp10, // 联系人
                          // linkmanPhone: this.formArchives.inp11, // 联系人电话
                          // responsiblePerson: this.formArchives.inp12, // 负责人
                          // prinCipalsTel: this.formArchives.inp13 // 负责人电话
                        },
                        // contactInfoDO: this.dynamicValidateFormNew.domains
                        contactInfoDO: this.domainsInfoList
                      }
                      addNew(formArchivesInfo).then(res => {
                        if (res.code === 200) {
                          this.$message({
                            message: '保存成功',
                            showClose: true,
                            duration: 6000,
                            type: 'success'
                          })
                          this.stopRepeat = 0
                          this.$router.push({
                            name: 'cueManage_investigation'
                          })
                        }
                      })
                    } else {
                      this.$message({
                        message: '协查文档中有必填项未填写！',
                        showClose: true,
                        duration: 6000,
                        type: 'error'
                      })
                    }
                  })
                } else {
                  this.$message({
                    message: '办理信息中有必填项未填写！',
                    showClose: true,
                    duration: 6000,
                    type: 'error'
                  })
                }
              })
            } else {
              this.$message({
                message: '处理单中有必填项未填写！',
                type: 'error',
                showClose: true,
                duration: 6000
              })
            }
          })
        } else {
        // 先校验处理单
          this.$refs['formChuLiRule'].validate((valid) => {
            if (valid) {
            // 处理单校验通过后在校验反馈表
              this.$refs['formFanKuiRule'].validate((valid) => {
                if (valid) {
                  this.stopRepeat++
                  const formArchivesInfo = {
                    conductInfoDO: {},
                    documentsDO: {},
                    assistId: this.$route.query.assistId,
                    processDO: {
                      hostRoom: this.formChuLi.hostRoom, // '主办处室',
                      agentsTelephone: this.formChuLi.agentsTelephone, // '经办人及电话',
                      fileContent: this.formChuLi.fileContent, // '请示内容',
                      bankLeadIntruc: this.formChuLi.bankLeadIntruc, // '行领导批示',
                      centLeadOpinions: this.formChuLi.centLeadOpinions, // '中心领导意见',
                      internalOpinions: this.formChuLi.internalOpinions, // '内部意见',
                      counterOpnions: this.formChuLi.counterOpnions // '会签意见'
                    },
                    feedbackDO: {
                      fmainName: this.formFanKui.fmainName, // '协查主体名称',
                      fAddress: this.formFanKui.fAddress, // '主要交易发生地',
                      fDate: this.formFanKui.fDate, // '交易时间段',
                      // fDate: '2019年5月17日16:55:10-2019年5月17日16:55:14',
                      fRmb: this.formFanKui.fRmb, // '累计交易金额(人民币)',
                      fYb: this.formFanKui.fYb, // '累计交易金额(外币)',
                      fNumber: this.formFanKui.fNumber, // '涉及交易笔数',
                      fAccount: this.formFanKui.fAccount // '涉及主要账户个数'
                    }
                  }
                  addNew(formArchivesInfo).then(res => {
                    if (res.code === 200) {
                      this.$message({
                        message: '保存成功',
                        showClose: true,
                        duration: 6000,
                        type: 'success'
                      })
                      this.stopRepeat = 0
                      this.$router.push({
                        name: 'cueManage_investigation'
                      })
                    }
                    console.log('提交成功')
                  })
                } else {
                  this.$message({
                    message: '协查反馈表中有必填项未填写！',
                    type: 'error',
                    showClose: true,
                    duration: 6000
                  })
                }
              })
            } else {
              this.$message({
                message: '处理单中有必填项未填写！',
                type: 'error',
                showClose: true,
                duration: 6000
              })
            }
          })
        }
      }

      // if (this.editableTabsValue === '1') {
      //   console.log('处理单被提交了')
      // } else if (this.editableTabsValue === '2' || this.editableTabsValue === '0') {
      //   console.log(123)
      // } else if (this.editableTabsValue === '3') {
      //   console.log('协查结果反馈表被提交了')
      // } else if (this.editableTabsValue === '4') {
      //   console.log('附件模块被提交了')
      // } else {
      //   console.log('流转信息')
      // }
    },
    // 修改
    submitTabUpdate() {
      if (this.stopRepeat === 1) {
        return false
      } else {
        this.$refs['formChuLiRule'].validate((valid) => {
          if (valid) {
            // 先校验办理信息
            this.$refs['formEditRef'].validate((valid) => {
              if (valid) {
                // 办理信息校验通过校验协查文档
                this.$refs['formArchivesRule'].validate((valid) => {
                  if (valid) {
                    if (this.dynamicValidateFormNew.domains.length === this.dynamicValidateFormNew.domains1.length) {
                      this.domainsInfoList = []
                      for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
                        const arr = {
                          contactName: this.dynamicValidateFormNew.domains[i].contactName,
                          contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                          mainId: this.mainIdArr[i],
                          respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                          respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                        }
                        this.domainsInfoList.push(arr)
                      }
                    } else if (this.dynamicValidateFormNew.domains.length > this.dynamicValidateFormNew.domains1.length) {
                      this.domainsInfoList = []
                      for (let i = 0; i < this.dynamicValidateFormNew.domains1.length; i++) {
                        const arr = {
                          contactName: this.dynamicValidateFormNew.domains[i].contactName,
                          contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                          mainId: this.mainIdArr[i],
                          respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                          respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                        }
                        this.domainsInfoList.push(arr)
                      }
                      // const len = this.dynamicValidateFormNew.domains.length - this.dynamicValidateFormNew.domains1.length
                      for (let index = this.dynamicValidateFormNew.domains1.length; index < this.dynamicValidateFormNew.domains.length; index++) {
                        const arr1 = {
                          contactName: this.dynamicValidateFormNew.domains[index].contactName,
                          contactPhone: this.dynamicValidateFormNew.domains[index].contactPhone,
                          mainId: this.mainIdArr[index],
                          respoName: '',
                          respoPhone: ''
                        }
                        this.domainsInfoList.push(arr1)
                      }
                    } else {
                      this.domainsInfoList = []
                      for (let i = 0; i < this.dynamicValidateFormNew.domains.length; i++) {
                        const arr = {
                          contactName: this.dynamicValidateFormNew.domains[i].contactName,
                          contactPhone: this.dynamicValidateFormNew.domains[i].contactPhone,
                          mainId: this.mainIdArr[i],
                          respoName: this.dynamicValidateFormNew.domains1[i].respoName,
                          respoPhone: this.dynamicValidateFormNew.domains1[i].respoPhone
                        }
                        this.domainsInfoList.push(arr)
                      }
                      // const len = this.dynamicValidateFormNew.domains1.length - this.dynamicValidateFormNew.domains.length
                      for (let index = this.dynamicValidateFormNew.domains.length; index < this.dynamicValidateFormNew.domains1.length; index++) {
                        const arr1 = {
                          contactName: '',
                          contactPhone: '',
                          mainId: this.mainIdArr[index],
                          respoName: this.dynamicValidateFormNew.domains1[index].respoName,
                          respoPhone: this.dynamicValidateFormNew.domains1[index].respoPhone
                        }
                        this.domainsInfoList.push(arr1)
                      }
                    }
                    this.stopRepeat++
                    const formArchivesInfo = {
                      assistId: this.assistId,
                      processDO: {
                        hostRoom: this.formChuLi.hostRoom, // '主办处室',
                        agentsTelephone: this.formChuLi.agentsTelephone, // '经办人及电话',
                        fileContent: this.formChuLi.fileContent, // '请示内容',
                        bankLeadIntruc: this.formChuLi.bankLeadIntruc, // '行领导批示',
                        centLeadOpinions: this.formChuLi.centLeadOpinions, // '中心领导意见',
                        internalOpinions: this.formChuLi.internalOpinions, // '内部意见',
                        counterOpnions: this.formChuLi.counterOpnions // '会签意见'
                      },
                      conductInfoDO: {
                        transferAgent: this.formEdit.inp1, // "移送经办人"
                        preDistributionOffice: this.formEdit.select2, // "预分配处室"
                        preAssignedAnalysts: this.formEdit.select3, // "预分配分析员"
                        analysisRoom: this.formEdit.select4, //  "分析处室"
                        analysts: this.formEdit.select5, // "分析员"
                        perSubjectsNum: this.formEdit.inp7, // "来件个人主体数"
                        mecSubjectsNum: this.formEdit.inp8, //  "来件机构主体数"
                        accountNumber: this.formEdit.inp9, // "来件账户数"
                        indInvestigationRes: this.formEdit.inp11, //  "协查结果个人数"
                        institutionalRes: this.formEdit.inp12, // '协查结果机构数',
                        mbInvestigationRes: this.formEdit.inp13, // '协查结果主体数',
                        transactionNumber: this.formEdit.inp14, // '交易笔数',
                        localCurrency: this.formEdit.inp16, // '本币交易额',
                        foreignCurrency: this.formEdit.inp17, // '外币交易额',
                        transactionAccounts: this.formEdit.inp15, // '交易账户数',
                        memoItem: this.formEdit.inp18 // '备注'
                      },
                      documentsDO: {
                        dateArrial: this.formArchives.inp1, // 来件日期
                        assUrgency: this.formArchives.select, // 紧急程度
                        associatedSymbol: this.formArchives.inp2, // 关联文号
                        caseIntroduction: this.formArchives.inp7, // 案情简介
                        caseLabel: this.formArchives.inp5, // 案情标签
                        communicationTitle: this.formArchives.inp4, // 来文标题
                        communicationUnite: this.formArchives.inp6, // 来文单位
                        crimeType: this.formArchives.select2, // 涉罪类型
                        investigationType: this.formArchives.resource, // 协查类型
                        referenceNumber: this.formArchives.inp3, // 协查文号
                        requestItems: this.formArchives.inp8 // 请求事项
                      },
                      // contactInfoDO: this.dynamicValidateFormNew.domains
                      contactInfoDO: this.domainsInfoList
                    }
                    updateInvestigation(formArchivesInfo).then(res => {
                      if (res.code === 200) {
                        this.$message({
                          message: '保存成功',
                          type: 'success',
                          showClose: true,
                          duration: 6000
                        })
                        this.stopRepeat = 0
                        this.$router.push({
                          name: 'cueManage_investigation'
                        })
                      }
                    }).catch(() => {
                      this.stopRepeat = 0
                    })
                  } else {
                    this.$message({
                      message: '协查文档中有必填项未填写！',
                      type: 'error',
                      showClose: true,
                      duration: 6000
                    })
                  }
                })
              } else {
                this.$message({
                  message: '办理信息中有有必填项未填写！',
                  type: 'error',
                  showClose: true,
                  duration: 6000
                })
              }
            })
          } else {
            this.$message({
              message: '处理单中有有必填项未填写！',
              type: 'error',
              showClose: true,
              duration: 6000
            })
          }
        })
      }

      // if (this.editableTabsValue === '1') {
      //   console.log('处理单被提交了')
      // } else if (this.editableTabsValue === '2' || this.editableTabsValue === '0') {
      //   console.log(123)
      // } else if (this.editableTabsValue === '3') {
      //   console.log('协查结果反馈表被提交了')
      // } else if (this.editableTabsValue === '4') {
      //   console.log('附件模块被提交了')
      // } else {
      //   console.log('流转信息')
      // }
    },
    // 协查文件档案表
    requestItemsFn() {
      this.$refs.requestItemsUl.style.display = 'block'
      const liChilds = this.$refs.requestItemsUl.children
      var _this = this
      for (let i = 0; i < liChilds.length; i++) {
        liChilds[i].onclick = function() {
          _this.formArchives.inp8 += liChilds[i].innerHTML + '\n'
          liChilds[i].style.display = 'none'
          _this.$refs.requestItemsUl.style.display = 'none'
        }
      }
      // document.addEventListener('click', function() {
      //   this.$refs.requestItemsUl.style.display = 'none'
      // }, false)
    },
    clearRequestItemsFn() {
      // this.$refs.requestItemsUl.style.display = 'none'
    },
    dropDown() {
      const liChilds = this.$refs.requestItemsUl.children
      var _this = this
      for (let i = 0; i < liChilds.length; i++) {
        liChilds[i].onclick = function() {
          _this.formArchives.inp8 += liChilds[i].innerHTML + '\n'
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm3.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
        this.dynamicValidateForm1.domains.splice(index, 1)
        this.dynamicValidateForm2.domains.splice(index, 1)
        this.dynamicValidateForm3.domains.splice(index, 1)
      }
    },
    onlyNumberValidate(rule, value, callback) {
      if (!commonPattern.spaceBar.test(value)) {
        callback(new Error('内容不能含有空格'))
      } else if (!commonPattern.number.test(value) && value !== '') {
        callback(new Error('必须输入数值'))
      } else {
        callback()
      }
    },
    // 上传附件控制逻辑
    // 上传文件之前
    handleBeforeUpload(file) {
      this.submitFlag = true
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
      }
      if (!isLt2M) {
        this.submitFlag = false
        this.$message({
          message: '上传文件大小不能超过 500MB!',
          showClose: true,
          duration: 6000,
          type: 'error'
        })
      }
      return extension || (extension2 && isLt2M)
    },
    // 附件上传成功
    showFileList(res) {
      this.submitFlag = false
      if (res.code === -1) {
        this.$message({
          type: 'error',
          message: '请按照模板格式上传且内容不能为空！'
        })
        this.$refs['fileListZT'].clearFiles()
      } else if (res.code === 205) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: res.message
        })
        this.$refs['fileListZT'].clearFiles()
      } else if (res.code === 9001) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 6000,
          message: res.message
        })
        this.$refs['fileListZT'].clearFiles()
      } else {
        this.$refs['fileListZT'].clearFiles()
        this.assistId = res.data
        this.getFileListInfo(this.assistId)
      }
    },
    // 反馈表附件上传成功
    showFileList1() {
      this.getFileListInfo1(this.$route.query.assistId)
    },
    // 附件下载
    downLoadFiles(scope) {
      downloadFile(scope.row.attachId).then(res => {
        console.log('success')
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value > 99999999999999999999) {
        callback(new Error('最多输入20位!'))
        return
      }
      if (!money.test(value)) {
        callback(new Error('请输入正确的数字，最多保留三位小数!'))
      } else {
        callback()
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传附件分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 删除附件
    delRow(scope) {
      this.$confirm('确定要删除此附件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFileById(scope.row.attachId).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              showClose: true,
              duration: 6000,
              type: 'success'
            })
            this.getFileListInfo(this.assistId)
          } else {
            this.$message({
              message: '删除失败',
              showClose: true,
              duration: 6000,
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm1.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm2.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm3.domains.push({
        value: '',
        key: Date.now()
      })
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    onError(res, file, fileList) {
      this.submitFlag = false
      // if (res.code === 444) {
      this.$message({
        type: 'error',
        message: res.message,
        duration: 6000,
        showClose: true
      })
      // }
    }
  }
}
</script>

<style lang="scss">
.cueManage_investigation_archives {
  position: relative;
  .back {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .el-radio__label{
    padding-left: 0
  }
  .el-tabs__content {
    padding: 30px 20px;
  }
  .dialog-block {
    .task {
      .el-radio {
        width: 100%;
        margin-left: 30px;
      }
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }
    .el-transfer__button.el-button--primary {
      min-width: 32px;
      min-height: 32px;
    }
  }
  .tableContainer{
    margin: 10px 0
  }
  .noBorder .el-form-item__content{
    line-height: 70px;
  }
  .noBorder .el-textarea__inner{
    border: none;
    resize:none;
  }
  .noBorderTwo .el-textarea__inner{
    border: none;
    resize:none;
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
  //协查文件档案表样式
  .cueManage_investigation_archivesList {
    .el-date-editor {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .title {
      margin-bottom: 20px;
    }
    .request_items{
      position: relative;
    }
    .oUl{
      width: 80%;
      height: auto;
      border: 1px solid #ccc;
      border-radius: 10px;
      position: absolute;
      left: 112px;
      background: #fff;
      z-index: 10;
      text-indent: 10px;
      display: none;
    }
    .oUl li {
      width: 100%;
      height: 35px;
      border-bottom: 1px solid #ccc;
      line-height: 35px;
      font-size: 14px;
    }
    .oUl li:hover{
      background: #ccc;
    }
}
}
</style>
