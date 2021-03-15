<template>
  <div class="cueManage_interIntelligence_noticeForm">
    <el-form :model="noticeForm" :disabled="disableds"  :rules="rules" ref="noticeForm">
      <fieldset class="classFiledset">
        <legend>信息披露方</legend>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="编号" prop="tongbaoNum">
              <el-input :disabled="disabled"   v-model="noticeForm.tongbaoNum" maxlength="20"  placeholder="请输入编号,最长20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国家/地区">
              <el-select :disabled="disabled" clearable  v-model="noticeForm.plState" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
         
        </el-row>
  <el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="机构" prop="plOrg">
              <el-input :disabled="disabled"   v-model="noticeForm.plOrg" maxlength="50"  placeholder="请输入机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
  </el-row>
        <el-row :gutter="20">
             <el-col :span="12">
            <el-form-item label="联系人" prop="plLinkman">
              <el-input :disabled="disabled"   v-model="noticeForm.plLinkman" maxlength="30"  placeholder="请输入联系人,最长30字符"></el-input>
            </el-form-item>
          </el-col>
             <el-col :span="12">
            <el-form-item label="职务" prop="plDuty">
              <el-input :disabled="disabled"   v-model="noticeForm.plDuty" maxlength="30"  placeholder="请输入职务,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
   <el-row :gutter="20">
         <el-col :span="12">
            <el-form-item label="地址" prop="plAddress">
              <el-input :disabled="disabled"   v-model="noticeForm.plAddress" maxlength="50"  placeholder="请输入地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
              <el-col :span="12">
            <el-form-item label="电话" prop="plPhone">
              <el-input :disabled="disabled"   v-model="noticeForm.plPhone" maxlength="30"  placeholder="请输入电话,最长30字符"></el-input>
            </el-form-item>
          </el-col>
   </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="传真" prop="plFax">
              <el-input :disabled="disabled"   v-model="noticeForm.plFax" maxlength="30"  placeholder="请输入传真,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="E-mail" prop="plEmail">
              <el-input :disabled="disabled"   v-model="noticeForm.plEmail" maxlength="30"  placeholder="请输入E-mail,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="法定代表人" prop="plLegal">
              <el-input :disabled="disabled"   v-model="noticeForm.plLegal" maxlength="20"  placeholder="请输入法定代表人,最长20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务" prop="reqLegalDuty">
              <el-input :disabled="disabled"   v-model="noticeForm.reqLegalDuty" maxlength="30"  placeholder="请输入职务,最长30字符"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>

        <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item label="签名" prop="plSignature">
              <el-input :disabled="disabled"   v-model="noticeForm.plSignature" maxlength="30"  placeholder="请输入签名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker  value-format="yyyy-MM-dd" :disabled="disabled" v-model="noticeForm.plDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset class="classFiledset">
        <legend>信息披露至</legend>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国家/地区">
              <el-select :disabled="disabled" clearable  v-model="noticeForm.plzStateorg" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构" prop="plzOrg">
              <el-input :disabled="disabled"   v-model="noticeForm.plzOrg" maxlength="50"  placeholder="请输入机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
 <el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="联系人" prop="plzLinkman">
              <el-input :disabled="disabled"   v-model="noticeForm.plzLinkman" maxlength="30"  placeholder="请输入联系人,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务" prop="plzDuty">
              <el-input :disabled="disabled"   v-model="noticeForm.plzDuty" maxlength="30"  placeholder="请输入职务,最长30字符"></el-input>
            </el-form-item>
          </el-col>
 </el-row>
        <el-row :gutter="20">
          
          <el-col :span="12">
            <el-form-item label="电话" prop="plzPhone">
              <el-input :disabled="disabled"   v-model="noticeForm.plzPhone" maxlength="30"  placeholder="请输入电话,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="plzFax">
              <el-input :disabled="disabled"   v-model="noticeForm.plzFax" maxlength="30"  placeholder="请输入传真,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="E-mail" prop="plzEmail">
              <el-input :disabled="disabled"   v-model="noticeForm.plzEmail" maxlength="30"  placeholder="请输入E-mail,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="plzAddress">
              <el-input :disabled="disabled"   v-model="noticeForm.plzAddress" maxlength="50"  placeholder="请输入地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
 <fieldset class="classFiledset">
        <legend>金融及其他信息</legend>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="关联企业" prop="fEnterprise">
              <el-input :disabled="disabled"   v-model="noticeForm.fEnterprise" maxlength="30"  placeholder="请输入关联企业,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="fAdress">
              <el-input :disabled="disabled"   v-model="noticeForm.fAdress" maxlength="50"  placeholder="请输入地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
      
        </el-row>
 <el-row :gutter="20">
    <el-col :span="12">
            <el-form-item label="银行名称" prop="fBankname">
              <el-input :disabled="disabled"   v-model="noticeForm.fBankname" maxlength="30"  placeholder="请输入银行名称,最长30字符"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="银行账号" prop="fBankaccount">
              <el-input :disabled="disabled"   v-model="noticeForm.fBankaccount" maxlength="30"  placeholder="请输入银行账号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
 </el-row>
        <el-row :gutter="20">
        
          <el-col :span="12">
            <el-form-item label="银行地址" prop="fBankadress">
              <el-input :disabled="disabled"   v-model="noticeForm.fBankadress" maxlength="50"  placeholder="请输入银行地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
        <div style="height:32px">
        <el-button style="float:right"   :disabled="disabled"   @click="add">新增</el-button>
      </div>
      <fieldset class="classFiledset">
        <legend>主体信息</legend>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主体名称(自然人或企业)" prop="ztName">
              <el-input :disabled="disabled"   v-model="noticeForm.ztName" maxlength="30"  placeholder="请输入主体名称,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="别名" prop="ztBname">
              <el-input :disabled="disabled"   v-model="noticeForm.ztBname" maxlength="30"  placeholder="请输入别名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        
        </el-row>
  <el-row :gutter="20">
      <el-col :span="12">
            <el-form-item label="地址" prop="ztAddress">
              <el-input :disabled="disabled"   v-model="noticeForm.ztAddress" maxlength="30"  placeholder="请输入地址,最长30字符"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="该主体与本调查的关系" prop="ztGuanxi">
              <el-input :disabled="disabled"   v-model="noticeForm.ztGuanxi" maxlength="30"  placeholder="请输入该主体与本调查的关系,最长30字符"></el-input>
            </el-form-item>
          </el-col>
  </el-row>
        <el-row :gutter="20">
        
          <el-col :span="12">
            <el-form-item label="职业活动" prop="ztActivity">
              <el-input :disabled="disabled"   v-model="noticeForm.ztActivity" maxlength="30"  placeholder="请输入职业活动,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码(社会保险号，营业执照等)" prop="ztIdnum">
              <el-input :disabled="disabled"   v-model="noticeForm.ztIdnum" maxlength="30"  placeholder="请输入证件号码,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="护照号" prop="ztPassport">
              <el-input :disabled="disabled"   v-model="noticeForm.ztPassport" maxlength="30"  placeholder="请输入护照号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="颁发机构" prop="ztIdnumorg">
              <el-input :disabled="disabled"   v-model="noticeForm.ztIdnumorg" maxlength="50"  placeholder="请输入颁发机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
         <el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="其他证件号码" prop="ztOtheridnum">
              <el-input :disabled="disabled"   v-model="noticeForm.ztOtheridnum" maxlength="30"  placeholder="请输入其他证件号码,最长30字符"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="其他证件号码颁发机构" prop="ztOtheridnumorg">
              <el-input :disabled="disabled"   v-model="noticeForm.ztOtheridnumorg" maxlength="50"  placeholder="请输入其他证件号码颁发机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row :gutter="20">
         
          <el-col :span="12">
            <el-form-item label="电话号码" prop="ztPhone">
              <el-input :disabled="disabled"   v-model="noticeForm.ztPhone" maxlength="30"  placeholder="请输入电话号码,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他(请注明)" prop="ztOther">
              <el-input :disabled="disabled"   v-model="noticeForm.ztOther" maxlength="30"  placeholder="请输入其他,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国籍">
              <el-select :disabled="disabled" clearable  v-model="noticeForm.ztNationlity" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="ztSex">
               <el-select :disabled="disabled" clearable  v-model="noticeForm.ztSex" filterable placeholder="请选择" class="w100">
                <el-option label="男" value="男" ></el-option>
                 <el-option label="女" value="女" ></el-option>
              </el-select>
              <!-- <el-input :disabled="disabled"   v-model="noticeForm.ztSex" maxlength="50"  placeholder="请输入性别,最长50字符"></el-input> -->
            </el-form-item>
          </el-col>
      
        </el-row>
         <el-row :gutter="20">
    <el-col :span="12">
            <el-form-item label="生日" prop="ztBirthday">
              <el-date-picker :disabled="disabled" v-model="noticeForm.ztBirthday" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="ztBirthplace" label="出生地">
              <el-select  :disabled="disabled" clearable  v-model="noticeForm.ztBirthplace" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="ztProvinces">
              <el-input style="margin-top:32px" :disabled="disabled"  maxlength="25"  v-model="noticeForm.ztProvinces" placeholder="州/省"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item   prop="ztCity">
              <el-input  style="margin-top:32px" :disabled="disabled" maxlength="25"  v-model="noticeForm.ztCity" placeholder="城市"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="classFiledset">
        <legend>交易对手信息</legend>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="对方名称(自然人或企业)" prop="rivlName">
              <el-input :disabled="disabled"   v-model="noticeForm.rivlName" maxlength="30"  placeholder="请输入对方名称,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方证件号(社会保险号，营业执照等)" prop="rivlIdnum"> 
              <el-input :disabled="disabled"   v-model="noticeForm.rivlIdnum" maxlength="30"  placeholder="请输入对方证件号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
  <el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="护照号" prop="rivlPassportnum">
              <el-input :disabled="disabled"   v-model="noticeForm.rivlPassportnum" maxlength="30"  placeholder="请输入护照号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
    <el-col :span="12">
            <el-form-item label="银行名" prop="rivlBankname">
              <el-input :disabled="disabled"   v-model="noticeForm.rivlBankname" maxlength="30"  placeholder="请输入银行名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
  </el-row>
        <el-row :gutter="20">
      
          <el-col :span="12">
            <el-form-item label="银行账号" prop="rivlBankaccount">
                 <el-input :disabled="disabled"   v-model="noticeForm.rivlBankaccount" maxlength="30"  placeholder="请输入银行账号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交易日期" prop="rivlTradedate">
              <el-date-picker   value-format="yyyy-MM-dd" :disabled="disabled" v-model="noticeForm.rivlTradedate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="交易金额" prop="rivlTradeamount">
              <el-input :disabled="disabled"   v-model="noticeForm.rivlTradeamount" maxlength="10"  placeholder="请输入交易金额,最长12字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-top:30px">
            <el-form-item label="交易方向">
              <el-radio :disabled="disabled" v-model="noticeForm.rivlTradedirection" label="1">收款</el-radio>
              <el-radio :disabled="disabled" v-model="noticeForm.rivlTradedirection" label="2">付款</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
            <div class="vfor" v-for="(el,index) in myarr" :key="index">
         <div style="height:32px">
        <el-button style="float:right"   :disabled="disabled"   @click.prevent="removeDomain(el)">删除</el-button>
      </div>
         <fieldset class="classFiledset">
        <legend>主体信息{{index+2}}</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主体名称(自然人或企业)" prop="ztName">
              <el-input :disabled="disabled"   v-model="el.ztName" maxlength="30"  placeholder="请输入主体名称(自然人或企业),最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="别名" prop="ztBname">
              <el-input :disabled="disabled"   v-model="el.ztBname" maxlength="30"  placeholder="请输入别名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
        
        </el-row>
         <el-row :gutter="20">
         <el-col :span="12">
            <el-form-item label="地址" prop="ztAddress">
              <el-input :disabled="disabled"   v-model="el.ztAddress" maxlength="50"  placeholder="请输入地址,最长50字符"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="该主体与本调查的关系" prop="ztGuanxi">
              <el-input :disabled="disabled"   v-model="el.ztGuanxi" maxlength="30"  placeholder="请输入该主体与本调查的关系,最长30字符"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row :gutter="20">
        
          <el-col :span="12">
            <el-form-item label="职业活动" prop="ztActivity">
              <el-input :disabled="disabled"   v-model="el.ztActivity" maxlength="30"  placeholder="请输入职业活动,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码(社会保险号，营业执照等)" prop="ztIdnum">
              <el-input :disabled="disabled"   v-model="el.ztIdnum" maxlength="30"  placeholder="请输入证件号码(社会保险号，营业执照等),最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="护照号" prop="ztPassport">
              <el-input :disabled="disabled"   v-model="el.ztPassport" maxlength="30"  placeholder="请输入护照号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="颁发机构" prop="ztIdnumorg">
              <el-input :disabled="disabled"   v-model="el.ztIdnumorg" maxlength="50"  placeholder="请输入颁发机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
   <el-row :gutter="20">
 <el-col :span="12">
            <el-form-item label="其他证件号码" prop="ztOtheridnum">
              <el-input :disabled="disabled"   v-model="el.ztOtheridnum" maxlength="30"  placeholder="请输入其他证件号码,最长30字符"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="其他证件号码颁发机构" prop="ztOtheridnumorg">
              <el-input :disabled="disabled"   v-model="el.ztOtheridnumorg" maxlength="50"  placeholder="请输入其他证件号码颁发机构,最长50字符"></el-input>
            </el-form-item>
          </el-col>
   </el-row>
        <el-row :gutter="20">
         
          <el-col :span="12">
            <el-form-item label="电话号码" prop="ztPhone">
              <el-input :disabled="disabled"   v-model="el.ztPhone" maxlength="30"  placeholder="请输入电话号码,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他(请注明)" prop="ztOther">
              <el-input :disabled="disabled"   v-model="el.ztOther" maxlength="30"  placeholder="请输入其他(请注明),最长30字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国籍" prop="ztNationlity">
              <el-select :disabled="disabled" clearable  v-model="el.ztNationlity" filterable placeholder="请选择" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="ztSex">
               <el-select v-model="el.ztSex"  :disabled="disabled" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
              <!-- <el-input :disabled="disabled"   v-model="form.ztSex" maxlength="30"  placeholder="请输入性别,最长30字符"></el-input> -->
            </el-form-item>
          </el-col>
     
        </el-row>
 <el-row :gutter="20">
     <el-col :span="12">
            <el-form-item label="生日" prop="ztBirthday">
              <el-date-picker  value-format="yyyy-MM-dd" :disabled="disabled" v-model="el.ztBirthday" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
 </el-row>
        <el-row :gutter="20">
           <el-col :span="8">
            <el-form-item label="出生地"  prop="ztBirthplace">
              <el-select :disabled="disabled" clearable  v-model="el.ztBirthplace" filterable placeholder="国家/地区" class="w100">
                <el-option v-for="(item,idx) in  countryOption" :label="item.chSName" :value="item.numCode" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="ztProvinces" >
              <el-input style="margin-top:32px" :disabled="disabled"  maxlength="25"  v-model="el.ztProvinces" placeholder="州/省"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  prop="ztCity">
              <el-input style="margin-top:32px"  :disabled="disabled"  maxlength="25"  v-model="el.ztCity" placeholder="城市"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="classFiledset">
        <legend>交易对手信息{{index+2}}</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="对方名称(自然人或企业)" prop="rivlName">
              <el-input :disabled="disabled"   v-model="el.rivlName" maxlength="30"  placeholder="请输入对方名称,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方证件号(社会保险号，营业执照等)" prop="rivlIdnum">
              <el-input :disabled="disabled"   v-model="el.rivlIdnum" maxlength="30"  placeholder="请输入对方证件号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
       
        </el-row>
   <el-row :gutter="20">
   <el-col :span="12">
            <el-form-item label="护照号" prop="rivlPassportnum">
              <el-input :disabled="disabled"   v-model="el.rivlPassportnum" maxlength="30"  placeholder="请输入护照号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行名" prop="rivlBankname">
              <el-input :disabled="disabled"   v-model="el.rivlBankname" maxlength="30"  placeholder="请输入银行名,最长30字符"></el-input>
            </el-form-item>
          </el-col>
   </el-row>
        <el-row :gutter="20">
          
          <el-col :span="12">
            <el-form-item label="银行账号" prop="rivlBankaccount">
              <el-input :disabled="disabled"   v-model="el.rivlBankaccount" maxlength="30"  placeholder="请输入银行账号,最长30字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交易日期" prop="rivlTradedate">
              <!-- <el-date-picker :picker-options="pickerOptions" :disabled="disabled" v-model="form.rivlTradedate" type="date" placeholder="选择日期">
              </el-date-picker> -->
               <el-date-picker   value-format="yyyy-MM-dd" :disabled="disabled" v-model="el.rivlTradedate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="交易金额" prop="rivlTradeamount">
              <el-input :disabled="disabled"   v-model="el.rivlTradeamount" maxlength="20"  placeholder="请输入交易金额,最长20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-top:30px">
            <el-form-item label="交易方向" prop="rivlTradedirection">
              <el-radio :disabled="disabled" v-model="el.rivlTradedirection" label="1">收款</el-radio>
              <el-radio :disabled="disabled" v-model="el.rivlTradedirection" label="2">付款</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      </div>
      <el-form-item label="情况描述">
        <el-input :disabled="disabled"   :autosize="{ minRows: 2, maxRows: 24}"  v-model="noticeForm.rivlCase" type="textarea" maxlength="500"  placeholder="请输入情况描述,最长500字符"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { country } from '@/api/common/citys.js'
import { noSpaceAndTs, commonPattern } from '@/utils/formValidate.js'
export default {
  props: {
    noticeFormData: Object,
    disableds: Boolean,
    myarr: Array
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      disabled: false,
      noticeForm: {
        tongbaoNum: '',
        plState: '',
        plOrg: '',
        plLinkman: '',
        plDuty: '',
        plPhone: '',
        plFax: '',
        plEmail: '',
        plAddress: '',
        plLegal: '',
        reqLegalDuty: '',
        plSignature: '',
        plDate: '',

        plzStateorg: '',
        plzOrg: '',
        plzLinkman: '',
        plzDuty: '',
        plzPhone: '',
        plzFax: '',
        plzEmail: '',
        plzAddress: '',

        ztName: '',
        ztBname: '',
        ztAddress: '',
        ztGuanxi: '',
        ztActivity: '',
        ztIdnum: '',
        ztPassport: '',
        ztIdnumorg: '',
        ztOtheridnumorg: '',
        ztPhone: '',
        ztOther: '',
        ztNationlity: '',
        ztSex: '',
        ztBirthday: '',
        ztCity: '',
        ztProvinces: '',
        ztBirthplace: '',
        ztOtheridnum: '',

        fEnterprise: '',
        fAdress: '',
        fBankname: '',
        fBankaccount: '',
        fBankadress: '',

        rivlName: '',
        rivlIdnum: '',
        rivlPassportnum: '',
        rivlBankname: '',
        rivlBankaccount: '',
        rivlTradedate: '',
        rivlTradeamount: '',
        rivlTradedirection: '',
        rivlCase: ''
      },
      rules: {
        tongbaoNum: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        plOrg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plLinkman: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // plPhone: [{ validator: this.PhoneNum, trigger: 'blur' }],
        plFax: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        plEmail: [{ validator: this.emailValidate, trigger: 'blur' }],
        plAddress: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plLegal: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        reqLegalDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plSignature: [{ validator: this.NullAndTs, trigger: 'blur' }],

        plzStateorg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plzOrg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plzLinkman: [{ validator: this.NullAndTs, trigger: 'blur' }],
        plzDuty: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // plzPhone: [{ validator: this.PhoneNum, trigger: 'blur' }],
        plzFax: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        plzEmail: [{ validator: this.emailValidate, trigger: 'blur' }],
        plzAddress: [{ validator: this.NullAndTs, trigger: 'blur' }],

        ztName: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztBname: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztAddress: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztGuanxi: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztActivity: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztIdnum: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztPassport: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztIdnumorg: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztOtheridnumorg: [{ validator: this.NullAndTs, trigger: 'blur' }],
        // ztPhone: [{ validator: this.PhoneNum, trigger: 'blur' }],
        ztOther: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztNationlity: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        // ztSex: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztCity: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztProvinces: [{ validator: this.NullAndTs, trigger: 'blur' }],
        ztBirthplace: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ztOtheridnum: [{ validator: this.NullAndTs, trigger: 'blur' }],

        fEnterprise: [{ validator: this.NullAndTs, trigger: 'blur' }],
        fAdress: [{ validator: this.NullAndTs, trigger: 'blur' }],
        fBankname: [{ validator: this.NullAndTs, trigger: 'blur' }],
        fBankaccount: [{ validator: this.NullAndTs, trigger: 'blur' }],
        fBankadress: [{ validator: this.NullAndTs, trigger: 'blur' }],

        rivlName: [{ validator: this.NullAndTs, trigger: 'blur' }],
        rivlIdnum: [{ validator: this.NullAndTs, trigger: 'blur' }],
        rivlPassportnum: [{ validator: this.NullAndTs, trigger: 'blur' }],
        rivlBankname: [{ validator: this.NullAndTs, trigger: 'blur' }],
        rivlBankaccount: [{ validator: this.onlyNumberValidate, trigger: 'blur' }],
        rivlTradeamount: [{ validator: this.isValidMoney, trigger: 'blur' }],
        rivlTradedirection: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        rivlCase: [{ validator: this.NullAndTs, trigger: 'blur' }]

      },
      countryOption: [] // 国家
    }
  },
  watch: {
    noticeFormData: {
      handler(val) {
        if (val) {
          this.noticeForm = this.noticeFormData
          this.disabled = this.noticeFormData.noWrite
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getCountryList()
    // this.propsData()
  },
  methods: {
    // 父子赋值
    // propsData() {
    //   this.noticeFormData ? this.noticeForm = this.noticeFormData : this.noticeForm
    // },
    add() {
      this.myarr.push({
        ztName: '',
        ztBname: '',
        ztAddress: '',
        ztGuanxi: '',
        ztActivity: '',
        ztIdnum: '',
        ztPassport: '',
        ztIdnumorg: '',
        ztOtheridnum: '',
        ztOtheridnumorg: '',
        ztPhone: '',
        ztOther: '',
        ztNationlity: '',
        ztSex: '',
        ztBirthday: '',
        ztCity: '',
        ztProvinces: '',
        ztBirthplace: '',
        rivlName: '',
        rivlIdnum: '',
        rivlPassportnum: '',
        rivlBankname: '',
        rivlBankaccount: '',
        rivlTradedate: '',
        rivlTradeamount: '',
        rivlTradedirection: ''
      })
      console.log(this.myarr, 555555555555555555)
    },
    removeDomain(item) {
      var index = this.myarr.indexOf(item)
      if (index !== -1) {
        this.myarr.splice(index, 1)
      }
    },
    emailValidate(rule, value, callback) {
      var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (!email.exec(value)) {
          callback(new Error('请输入邮箱，如：123456@163.com'))
        } else {
          callback()
        }
      }
    },
    PhoneNum(rule, value, callback) {
      // var phone = /^((1[0-9]{10})|((\d{3,4}-)?\d{7,8}))$/
      var phone = /^\d+(-)?(\d+)?$/
      if (value !== null) {
        if (value === '' || value === undefined) {
          callback()
        } else {
          if (!phone.test(value)) {
            callback(new Error('请输入电话，如：1234567或0354-1234567或13位手机号'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 数字检查
    onlyNumberValidate(rule, value, callback) {
      var number = /^\d+(\.\d+)?$/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (!number.test(value)) {
          callback(new Error('必须输入数值'))
        } else {
          callback()
        }
      }
    },
    NullAndTs(rule, value, callback) {
      var spcae = /(^\s)|(\s$)/
      if (spcae.test(value)) {
        callback(new Error('首尾不能有空格'))
      } else if (commonPattern.specialChar.test(value) || commonPattern.specialEng.test(value)) {
        callback(new Error('内容不能填写特殊字符'))
      } else {
        callback()
      }
    },
    // 金额校验
    isValidMoney(rule, value, callback) {
      var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,3})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (value === '' || value === undefined) {
        callback()
      } else {
        if (value > 99999999999999999999) {
          callback(new Error('最多输入20位!'))
          return
        } else if (!money.test(value)) {
          callback(new Error('请输入正确的数字，最多保留三位小数!'))
        } else {
          callback()
        }
      }
    },
    validateForm() {
      let flag = false
      this.$refs['noticeForm'].validate((valid) => {
        flag = valid
      })
      return flag
    },
    // 国家名
    getCountryList() {
      country().then(res => {
        this.countryOption = res.data.list
      })
    }
  }
}
</script>

<style lang="scss">
.cueManage_interIntelligence_noticeForm {
  .classFiledset {
    border-radius: 5px;
    // border-color: #67c23a;
    border-color: #e1f3d8;
    margin-bottom: 10px;
  }
  .el-date-editor--date {
    width: 100% !important;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .title {
    margin-bottom: 20px;
  }
}
</style>
