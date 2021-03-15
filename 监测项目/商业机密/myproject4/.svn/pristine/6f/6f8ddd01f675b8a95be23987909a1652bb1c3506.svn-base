<template>
  <div class="dataLifecycle">
    <el-card>
      <div class="header">
        <el-row>
          <el-col :span="8">
            <span>数据生命周期管理</span>
          </el-col>
          <el-col :span="14" style="textAlign:right">
            <span v-for="(item,index) in tags" :key="index" @click="tagIndex=index; componentId='con'+(index+1)" class="tag" :class="{active:tagIndex==index}">{{item}}</span>
          </el-col>          
        </el-row>
      </div>
      <div style="margin-top: 12px; margin-bottom: 30px;height: 1px;background: #e8e8e8;"></div>
      <div class="container">
        <component :is="componentId"></component>
      </div>

    </el-card>


  </div>
</template>

<script>
 import Auto from '@/views/sys-monitoringAnalysis/dataHandl/dataLifecycle/auto.vue'
 import Hadle from '@/views/sys-monitoringAnalysis/dataHandl/dataLifecycle/hadle.vue'
 import Count from '@/views/sys-monitoringAnalysis/dataHandl/dataLifecycle/count.vue'
 export default {
   components: {
     'con1': Auto,
     'con2': Hadle,
     'con3': Count
   },
   data() {
     return {
       componentId: 'con1',
       form: {
         select: ''

       },
       input5: '',
       select: '1',
       restaurants: [],
       value1: '',
       tagIndex: 0,
       tags: [
         '自动迁移参数配置',
         '手动数据迁移',
         '统计和日志'
       ]
 
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

<style scoped lang="scss">
.dataLifecycle{
  .tag{
    font-size: 14px;
    font-weight: 500;
    padding: 10px 4px;
    margin-left: 20px;
    &:hover{
      cursor: pointer;
      color: #409EFF;
      border-bottom: 3px solid #409EFF
    }
  }
  .tag.active{
    color: #409EFF;
    border-bottom: 3px solid #409EFF

  }
  
  
  
}

</style>