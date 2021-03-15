<template>
  <div class="intelligentAnalyze_view">
    <el-card>
      <div slot="header">
        <span>接收大额交易报告份数</span>
      </div>
      <div class="searchBlock">
        <el-form :model="form">
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="140px">
                <template slot="label">
                  <span>行业选择：</span>
                  <el-checkbox :indeterminate="form.isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>

                </template>
                
                <el-checkbox-group
                  v-model="form.tyep1"
                  @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="item in form.tradeData" :key="item" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="140px">
                <template slot="label">
                  <span>地区选择：</span> 
                  <el-checkbox :indeterminate="form.isIndeterminate2" v-model="form.checkAll2" @change="handleCheckAll">全选</el-checkbox>
                </template>
               
                <el-checkbox-group
                  v-model="form.tyep2"
                  @change="handleChecked">
                  
                  <el-checkbox v-for="item in form.areaData" :key="item" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="24" style="textAlign:right">
            <el-button type="primary" @click="statement">生成报表</el-button>
            <el-button type="primary"  @click="graph">生成图表</el-button>
          </el-col>
        </el-row>

      </div>
      <div class="listBlock" > 
        <!-- <el-table :data="tableData" :border=false>
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column label="接收大额交易报告份数">
            <el-table-column label="接收大额报告份数（份）" prop="receive"></el-table-column>
            <el-table-column label="接收大额报告涉及笔数（笔）" prop="involve" ></el-table-column>
          </el-table-column>
        </el-table> -->
        <iframe 
          v-loading.body="loading"
          :src="url" 
          frameborder="0"
          id="iFrame1"
          width="100%"
          scrolling="no"
          height="540px"
      ></iframe>
     
        
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
          :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination> -->
         
        
      </div>
      <div style="textAlign:center">
        <router-link :to="{name:'macroAnalysis_intelligentAnalyze'}">
          <el-button type="primary">返 回</el-button>
        </router-link>
        
      </div>
    </el-card>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          tradeData: [
            '银行业',
            '金融业',
            '证券业'
          ],
          isIndeterminate: false,
          checkAll: null,
          tyep1: [],
          isIndeterminate2: false,
          checkAll2: null,
          tyep2: [],
          areaData: [
            '总行', '上海总行', '天津分行', '沈阳分行', '南京分行', '济南分行', '武汉分行', '广州分行', '成都分行', '西安分行', '营业管理部', '重庆营业管理部', '石家庄中支', '太原中支', '呼和浩特中支', '长春中支', '哈尔滨中支', '杭州中支', '福州中支', '合肥中支', '郑州中支'
  
          ]
        },
        tableData: [
          {
            receive: 20,
            involve: 30
          },
          {
            receive: 68,
            involve: 125
          },
          {
            receive: 95,
            involve: 68
          },
          {
            receive: 162,
            involve: 596
          },
          {
            receive: 256,
            involve: 263
          },
          {
            receive: 65,
            involve: 56
          }
        ],
        flag: 0,
        currentPage: 1,
        url: '',
        loading: false
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.form.tyep1 = val ? this.form.tradeData : []
        this.form.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        const checkedCount = value.length
        this.form.checkAll = checkedCount === this.form.tradeData.length
        this.form.isIndeterminate = checkedCount > 0 && checkedCount < this.form.tradeData.length
      },
      handleCheckAll(val) {
        this.form.tyep2 = val ? this.form.areaData : []
        this.form.isIndeterminate2 = false
      },
      handleChecked(value) {
        const checkedCount = value.length
        this.form.checkAll2 = checkedCount === this.form.areaData.length
        this.form.isIndeterminate2 = checkedCount > 0 && checkedCount < this.form.areaData.length
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      statement() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 5000)
        console.log(this.$route.query)
        if (this.$route.query.key === 'wholesale') {
          this.url = 'http://192.168.1.139:8080/MicroStrategy/servlet/mstrWeb?Server=DESKTOP-8ATJ77Q&Project=hongguan&Port=0&evt=2048001&src=mstrWeb.2048001&visMode=0&currentViewMedia=1&documentID=91C7CBD74F94200B04800A9E9E29B2DC&pwd=&hiddensections=header,footer,path,dockTop,dockLeft'
        } else if (this.$route.query.key === 'doubtful') {
          this.url = 'http://192.168.1.139:8080/MicroStrategy/servlet/mstrWeb?Server=DESKTOP-8ATJ77Q&Project=hongguan&Port=0&evt=2048001&src=mstrWeb.2048001&visMode=0&currentViewMedia=1&documentID=A38A5C734BCE53445AFCA99F921C2E8F&uid=administrator&pwd=&hiddensections=header,footer,path,dockTop,dockLeft'
        } else {
          this.url = ''
        }
        console.log(this.url)
      },
      graph() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 5000)
        console.log(this.$route.query)
        if (this.$route.query.key === 'wholesale') {
          this.url = 'http://192.168.1.139:8080/MicroStrategy/servlet/mstrWeb?Server=DESKTOP-8ATJ77Q&Project=hongguan&Port=0&evt=2048001&src=mstrWeb.2048001&visMode=0&currentViewMedia=1&documentID=0A65A88640411A714A41699BC56D9275&uid=administrator&pwd=&hiddensections=header,footer,path,dockTop,dockLeft'
        } else if (this.$route.query.key === 'doubtful') {
          this.url = 'http://192.168.1.139:8080/MicroStrategy/servlet/mstrWeb?Server=DESKTOP-8ATJ77Q&Project=hongguan&Port=0&evt=2048001&src=mstrWeb.2048001&visMode=0&currentViewMedia=1&documentID=A669F07947FD94D8F26B5B8F2A2C6679&uid=administrator&pwd=&hiddensections=header,footer,path,dockTop,dockLeft'
        } else {
          this.url = ''
        }
        console.log(this.url)
      }
    },
    mounted() {
      const oIframe = document.getElementById('iFrame1')
      // const deviceWidth = document.documentElement.clientWidth
      const deviceHeight = document.getElementById('iFrame1').contentWindow.document.body.scrollHeight
      // oIframe.style.width = deviceWidth + 'px'
      oIframe.style.height = deviceHeight + 'px'
    }
  }
</script>

<style lang="scss">
.intelligentAnalyze_view{
  .searchBlock{
    margin-bottom: 20px;
    .el-checkbox-group{
      .el-checkbox{
        margin-left: 20px;
        width: 120px;
        // overflow: hidden;
        // text-overflow:ellipsis;
        // white-space: nowrap;
      }
    
     } 
  }
  .listBlock{
    margin-bottom: 30px
  }
  
  
}

</style>