<template>
  <div class="intelligenceFile_view">
    <el-card>
      <a @click="routerBack" class="back" :style="backImg"></a>
      <div slot="header">
        <span>可疑线索交详情</span>
      </div>
      <h3 style="textAlign:center;letterSpacing:6px">可疑线索交易表</h3>
      <div class="listBlock" style="padding:0 15%">
        <el-form label-width="140px">
          <el-form-item label="可疑交易名称" >
            <div class="itmeContent">x x x 账 户</div>
          </el-form-item>
          <el-form-item label="关联移送记录"  class="double">
            <div class="itmeContent">
              <ol>
                <li>
                  张某账户可疑交易 （线索表编号：[2013]_2_1）
                </li>
                <li>
                  张某账户可疑交易 （线索表编号：[2013]_2_1）
                </li>
              </ol>
            </div>
          </el-form-item>
          <el-form-item label="主要交易发生地" >
            <div class="itmeContent">某省、某市、谋县</div>
          </el-form-item>
          <el-form-item label="交易时间段" >
            <div class="itmeContent">2017年11月至20181月16日</div>
          </el-form-item>
          <el-form-item label="累计交易名额" class="double">
            <el-row>
              <el-col :span="8">
                <div class="border itmeContent">人民币：约268万元</div>
                <div class="itmeContent">外币币：约136万元</div>
              </el-col>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="设计交易笔数">
                    <div class="itmeContent"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="涉及主要账户个数"></el-form-item>
                </el-col>
              </el-row>
            </el-row>
           
          </el-form-item> 
          <el-form-item  label="初步判断">
            <div class="itmeContent"></div>
          </el-form-item>
          <el-form-item  label="交易主体身份相关信息">
            <div class="itmeContent"></div>
          </el-form-item>
          <el-form-item  label="监测分析触发点">
            <div class="itmeContent"></div>
          </el-form-item>
          <el-form-item  label="分析概述">
            <div class="itmeContent"></div>
          </el-form-item>
          <el-form-item  label="建议">
            <div class="itmeContent"></div>
          </el-form-item>
          <el-form-item label="附件" class="unKnow">
            <div class="itmeContent">
              <ol>
                <li>账户信息列表</li>
                <li>交易明细</li>
                <li>身份信息列表</li>
              </ol>
            </div>
          </el-form-item>
        </el-form>
       
      
      </div>

      <div style="padding:20px 30px;textAlign:center">
        <el-button type="primary">导 出</el-button>
        <el-button type="primary" plain @click="routerBack">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        backImg: {
          backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
          backgroundRepeat: 'no-repeat'
        }
      }
    },
    methods: {
      routerBack() {
        this.$router.go(-1) // 返回上一层
      }
    }
  }
</script>

<style lang="scss">
$border:#ebeef5;
$LH:48px;
@mixin doubleLH($LH){
    line-height:$LH*2;
    left:20px;
};
.intelligenceFile_view{
  position: relative;
  .listBlock{
    .el-form-item__label , .el-form-item__content{
      line-height: $LH
    }
    .el-form-item__label{
      text-align: center;
    }
    .el-form-item{
      margin-bottom: 0;
      border: 1px solid $border;
      border-top: none;
      &:first-child{
        border-top: 1px solid $border
      }
    }
    .el-form-item__content{
      border-left: 1px solid $border;
      
    }
    .itmeContent{
      padding-left: 20px;
    }
    .double{
      .el-form-item__label{
        @include doubleLH($LH)
      }
      .el-form-item{
        border-top: none;
        border-bottom: none
      }

      .border{
         border-bottom: 1px solid $border
      }
      
    }
    .unKnow{
      .el-form-item__label{
        @include doubleLH($LH*2)
      }
      
    }
    

  }
}

</style>