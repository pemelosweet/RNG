<template>
  <div class="dataLifecycle_auto">
    <el-form :model="form" label-width="140px">
      <div class="onlineBlock">
        <el-row class="title">
          <el-col :span="12">
            <span >在线归档</span>
          </el-col>
        </el-row>
        <el-row class="line1">
          <el-col   :lg="8" :md="10">
            <el-form-item label="数据年限设置：" >
              <el-select v-model="form.select" placeholder="请选择年限">
                <el-option label="5年" value="1"></el-option>
                <el-option label="4年" value="2"></el-option>
                <el-option label="3年" value="3"></el-option>
                <el-option label="2年" value="4"></el-option>
                <el-option label="1年" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="10" >
            <el-form-item label="数据库选择：" >
              <el-select v-model="form.select2" placeholder="全部">
                <el-option label="银行大额交易接收库" value="1"></el-option>
                <el-option label="银行可疑交易接收库" value="2"></el-option>
                <el-option label="证券大额处理库" value="3"></el-option>
                <el-option label="证券可疑处理库" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="8" :md="10" >
            <el-form-item label="开始时间：" class="time" >
              <el-date-picker
                v-model="form.value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="10" >
            <el-form-item label="迁移频率："  class="w120">
              <el-autocomplete 
                placeholder="请输入内容" 
                v-model="form.input5" 
                class="input-with-select" 
                :fetch-suggestions="querySearch"
                :clearable=true
                @select="handleSelect">
                <el-select v-model="form.select3" slot="append" placeholder="请选择">
                <el-option label="开启" value="1" selected></el-option>
                <el-option label="关闭" value="2"></el-option>
                </el-select>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>              
      </div>
      <div class="offLineBlock">
        <el-row class="title">
          <el-col :span="12">
            <span>离线归档</span>
          </el-col>
        </el-row>
        <el-row class="line1">
          <el-col :lg="8" :md="10" >
            <el-form-item label="数据年限设置：" >
              <el-select v-model="form.select5" placeholder="请选择年限">
                <el-option label="5年" value="1"></el-option>
                <el-option label="4年" value="2"></el-option>
                <el-option label="3年" value="3"></el-option>
                <el-option label="2年" value="4"></el-option>
                <el-option label="1年" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="10" >
            <el-form-item label="数据库选择：" >
              <el-select v-model="form.select4" placeholder="全部">
                <el-option label="银行大额交易接收库" value="1"></el-option>
                <el-option label="银行可疑交易接收库" value="2"></el-option>
                <el-option label="证券大额处理库" value="3"></el-option>
                <el-option label="证券可疑处理库" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="8" :md="10" >
            <el-form-item label="开始时间：" class="time" >
              <el-date-picker
                v-model="form.value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="10" >
            <el-form-item label="迁移频率："  class="w120">
              <el-autocomplete 
                placeholder="请输入内容" 
                v-model="form.input5" 
                class="input-with-select" 
                :fetch-suggestions="querySearch"
                :clearable=true
                @select="handleSelect">
                <el-select v-model="form.select3" slot="append" placeholder="请选择">
                <el-option label="开启" value="1" selected></el-option>
                <el-option label="关闭" value="2"></el-option>
                </el-select>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>              
      </div>
    </el-form>

  </div>
</template>

<script>
 export default {
   data() {
     return {
       form: {
         select: '',
         select2: '',
         select4: '',
         select5: '',
         value1: '',
         input5: '',
         select3: '1'
       },
       restaurants: []

     }
   },
   methods: {
     querySearch(queryString, cb) {
       var restaurants = this.restaurants
       var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
       // 调用 callback 返回建议列表的数据
       cb(results)
     },
     createFilter(queryString) {
       return (restaurant) => {
         return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
       }
     },
     loadAll() {
       return [
         { 'value': '1个月' },
         { 'value': '3个月' },
         { 'value': '半年' },
         { 'value': '一年' }
       ]
     },
     handleSelect(item) {
       console.log(item)
     }
   },
   mounted() {
     this.restaurants = this.loadAll()
   }
 }
</script>

<style lang="scss">
.dataLifecycle_auto{
  .line1{
    .el-select{
      width: 100%
    }

  }
  
  .w120{
    .el-select{
      width: 120px
    }
    .el-autocomplete {
       width: 100%
    }
  }
  .time{
    .el-date-editor{
      min-width: 100%
    }
  }
  .onlineBlock{  
    margin-bottom: 20px;
  }
  .offLineBlock{
    margin-bottom: 30px;
  }
  .title{
    font-size: 16px;
    color: #303133;
    font-weight: 500;
    margin-bottom: 16px
   
  }

}

</style>