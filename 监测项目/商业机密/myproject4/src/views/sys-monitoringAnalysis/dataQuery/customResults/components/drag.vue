<template>
<div>
  <div id="box">
    <div class="box">
      <div class="title">
        <span :class="{active: leftSelect === data1.length}" @click="selectAll(data1)">未选列表</span>
        <span>{{leftSelect ? leftSelect : 0}}/{{data1.length}}</span>
      </div>

      <div class="search_parent">
        <!-- <div class="search_div"> -->
          <input class="search_input" v-model="sourceData" :class="heightLight ? 'search_input_focus' : ''" type="text" @focus="heightLight=true" @blur="heightLight=false" placeholder="请输入字段名称">
        <!-- </div> -->
      </div>

      <div @drop="dropPub($event, 2)" @dragover.prevent class="left">
        <div style="float: left; width: 50%;"
          @drag="ondrag"
          @dragstart="dragstart($event, item)"
          @dragend="dragend"
          draggable="true"
          class="hover-color"
          :class="{active: item.isSelect }"
          v-on:click="hanldleClick(data1, item.id)"
          v-for="(item,index) in changeSourceData"
          :key="index">{{item.value}}</div>
      </div>
    </div>

    <div class="middle">
      <div v-on:click="moveItem(data2, data1, 1)" :class="{active: rightSelect > 0}"><i class="el-icon-arrow-left"></i></div>
      <div v-on:click="moveItem(data1, data2, 0)" :class="{active: leftSelect > 0}"><i class="el-icon-arrow-right"></i></div>
    </div>

    <div class="box">
      <div class="title">
        <span :class="{active: rightSelect === data2.length}" @click="selectAll(data2)">已选列表</span>
        <span>{{rightSelect ? rightSelect : 0}}/{{data2.length}}</span>
      </div>

      <div class="search_parent">
        <!-- <div class="search_div"> -->
          <input class="search_input" v-model="targetData" :class="heightLight1 ? 'search_input_focus' : ''" @focus="heightLight1=true" @blur="heightLight1=false" type="text" placeholder="请输入字段名称">
        <!-- </div> -->
      </div>

      <div @drop="dropPub($event, 1)" @dragover.prevent class="right">
        <div
        class="hover-color"
        @drag="ondrag"
        @dragstart="dragstart($event, item)"
        @dragend="dragend"
        draggable="true"
        :class="{active: item.isSelect }"
        v-on:click="hanldleClick(data2, item.id)"
        v-for="(item,index) in changeTargetData"
        :key="index">{{item.value}}</div>
      </div>
    </div>
  </div>
  <el-row style="text-align: right; margin-top: 10px;">
    <el-button type="primary" @click="onUpdate" :loading="updateLoading">确 定</el-button>
    <el-button type="primary" plain @click="handleClose">取 消</el-button>
  </el-row>
  </div>
</template>
<script>
// import { setTimeout } from 'timers'
import {
  updateData
} from '@/api/sys-monitoringAnalysis/dataQuery/customResult'
export default {
  props: {
    sourceLeft: {
      type: Array
    },
    targetRight: {
      type: Array
    },
    value: {
      type: Array,
      detault: []
    },
    updateObj: {
      type: Object,
      detault: null
    },
    queryNo: {
      type: String,
      detault: ''
    },
    pkQttcId: {
      type: String,
      detault: ''
    }
  },
  data() {
    return {
      updateLoading: false,
      heightLight: false,
      heightLight1: false,
      data1: [],
      data2: [],
      target: {
        x: '',
        y: '',
        id: ''
      },
      sourceData: '',
      targetData: '',
      changeSourceData: [],
      changeTargetData: []
    }
  },
  created() {
    this.sourceLeft.forEach(item => {
      this.data1.push(
        {
          id: item.key,
          value: item.label,
          isSelect: false
        }
      )
    })
    this.changeSourceData = this.data1
    this.changeTargetData = this.data2
  },
  mounted() {
    console.log('watch-this.pkQttcId', this.pkQttcId)
    const empty = []
    if (this.targetRight.length > 0) {
      this.targetRight.forEach(item => {
        empty.push(
          {
            id: item.key,
            value: item.label,
            isSelect: false
          }
        )
      })
      this.data2 = empty
      this.changeTargetData = empty
    }
  },
  watch: {
    sourceLeft() {
      // console.log('watch-this.sourceLeft2', this.sourceLeft)
      this.data1 = []
      this.data2 = []
      this.sourceLeft.forEach(item => {
        this.data1.push(
          {
            id: item.key,
            value: item.label,
            isSelect: false
          }
        )
      })
      // console.log('watch-this.data1', this.data1)
      // console.log('watch-this.data2', this.data2)
      this.changeSourceData = this.data1
      this.changeTargetData = this.data2
    },
    value() {
      // console.log('watch--this.value', this.value)
      // 通过编辑按钮的接口拿到已经存在的课件id，然后遍历源数据，删除已经存在的课件
      if (this.value.length > 0) {
        this.value.forEach(item => {
          this.data1.forEach((v, i) => {
            if (item === v.id) {
              this.data1.splice(i, 1)
            }
          })
        })
      // console.log(this.data1, 'changesourceData')
      }
    },
    targetRight() {
      // console.log('watch-this.targetRight', this.targetRight)
      const empty = []
      // console.log(this.targetRight)
      if (this.targetRight.length > 0) {
        this.targetRight.forEach(item => {
          empty.push(
            {
              id: item.key,
              value: item.label,
              isSelect: false
            }
          )
        })
        this.data2 = empty
        this.changeTargetData = empty
      }
    },
    sourceData(val) {
      const emptyArr = []
      if (val) {
        for (let i = 0; i < this.data1.length; i++) {
          if (this.data1[i].value.indexOf(val) !== -1) {
            emptyArr.push(this.data1[i])
          }
        }
        this.changeSourceData = emptyArr
      } else {
        this.changeSourceData = this.data1
      }
    },
    targetData(val) {
      const emptyArr = []
      if (val) {
        for (let i = 0; i < this.data2.length; i++) {
          if (this.data2[i].value.indexOf(val) !== -1) {
            emptyArr.push(this.data2[i])
          }
        }
        this.changeTargetData = emptyArr
      } else {
        this.changeTargetData = this.data2
      }
    }
  },
  methods: {
    ondrag(event) {
      this.target.y = event.y
      this.target.x = event.x
    },
    dropPub(event, type) {
      if (type === 1) {
        this.drop(event, this.data1, this.data2, type)
      } else {
        this.drop(event, this.data2, this.data1, type)
      }
    },
    drop(event, handle, target, type) {
    // 被拖拽数据中的id值
      const id = event.dataTransfer.getData('id')
      handle.forEach((item, index) => {
        if (item.id === id) {
          const temp = handle.splice(index, 1)
          temp[0].isSelect = false
          target.push(temp[0])
        }
      })
      this.resort(event, target, type)
    },
    resort(event, target, type) {
      const eles = event.currentTarget.children
      const emptyArray = []
      // type=1 从左往右拖拽 type=2 从右往左拖拽
      if (type === 1) {
        target.forEach(item => {
          emptyArray.push(item.id)
        })
        // v-model 可以监听这个input事件的触发
        this.$emit('input', emptyArray)
      }
      if (type === 2) {
        const tempId = event.dataTransfer.getData('id')
        this.changeTargetData.forEach(item => {
          if (item.id !== tempId) {
            emptyArray.push(item.id)
          }
        })
        // v-model 可以监听这个input事件的触发
        this.$emit('input', emptyArray)
      }
      // 两个框拖拽数据
      for (let i = 0; i < target.length; i++) {
        if (target[i].id === this.target.id) {
          target[i].y = this.target.y
        } else {
        // 获取元素在页面上位置，纵坐标
          target[i].y = eles[i].getBoundingClientRect().y
        }
      }
      // 单个框中换位置
      for (let i = 0; i < target.length - 1; i++) {
        for (let j = 0; j < target.length - i - 1; j++) {
          if (target[j].y > target[j + 1].y) {
            const swap = target[j]
            target[j] = target[j + 1]
            target[j + 1] = swap
          }
        }
      }
      // vue强制更新视图
      this.$forceUpdate()
    },
    dragstart(event, item) {
      this.target.id = item.id
      event.dataTransfer.setData('id', item.id)
    },
    dragend(event) {
      event.dataTransfer.clearData()
    },
    hanldleClick(data, id) {
      data.forEach(element => {
        if (element.id === id) {
          element.isSelect = !element.isSelect
        }
      })
    },
    moveItem(handle, target, count) {
      const temp = handle.filter(item => {
        return item.isSelect === true
      })
      if (temp.length <= 0) return false
      temp.forEach(item => {
        const index = handle.indexOf(item)
        handle.splice(index, 1)
        item.isSelect = false
        target.push(item)
      })
      console.log('handle', handle)
      console.log('target', target)
      console.log('count', count)
    },
    selectAll(data) {
      const isSelectAll = data.every(item => {
        return item.isSelect === true
      })
      data.forEach(item => {
        if (isSelectAll) {
          item.isSelect = false
        } else {
          item.isSelect = true
        }
      })
    },
    onUpdate() { // 修改确定按钮
      // this.$refs.dialogForm.validate((valid) => {
      // if (valid) {
      const paramsObj = this.getUpdateParams()
      this.updateLoading = true
      // console.log('pkQttcId', this.pkQttcId)
      updateData(paramsObj, this.pkQttcId).then(res => {
        if (res.code === 200) {
          this.updateLoading = false
          this.$message({
            showClose: true,
            duration: 6000,
            message: '修改成功！',
            type: 'success'
          })

          this.dialogVisible = false
          this.$emit('dialogState', this.dialogVisible)
          // setTimeout(() => {
          //   this.getData()
          // }, 50)
        } else {
          this.updateLoading = false
          this.$message({
            showClose: true,
            duration: 6000,
            message: res.message,
            type: 'error'
          })
        }
      }).catch(() => {
        this.updateLoading = false
      })
      // } else {
      //   return false
      // }
      // })
    },
    getUpdateParams() {
      var obj = {}
      if (this.updateObj.scopeTableColumns) {
        const qId = []
        const qName = []
        this.data2.forEach((item, index) => {
          this.updateObj.scopeTableColumns.forEach((item2, index2) => {
            if (item.id === index2 + 1) {
              qId.push(item2.pkQstc)
              qName.push(item2.qstcNameCh)
            }
          })
        })
        obj = {
          fkQttc: this.updateObj.pkQst, // 表id
          qstcIds: qId.toString(), // 表字段id
          qttQttcCh: this.updateObj.qstNameCh, // 表名
          qstIdsCh: qName.toString(), // 表字段名
          dataCount: this.queryNo
        }
      }
      return obj
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('dialogState', this.dialogVisible)
    }
  },
  computed: {
    leftSelect() {
      // console.log('data1', this.data1)
      if (this.data1.length === 0) return false
      const arr = this.data1.filter(item => {
        return item.isSelect === true
      })
      return arr.length
    },
    rightSelect() {
      // console.log('data2', this.data2)
      if (this.data2.length === 0) return false
      const arr = this.data2.filter(item => {
        return item.isSelect === true
      })
      return arr.length
    }
  }
}
</script>
<style lang="scss" scoped>
#box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 47%;
    border: 1px solid rgb(235, 238, 245);
  }
  .box .title {
    font-size: 14px;
    box-sizing: border-box;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
  }
  .box .title span:first-child {
    display: inline-block;
    background: #f5f7fa;
    background-image: url(../../../../../assets/drag/check-box-outline-blank.png);
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    padding-left: 35px;
    cursor: pointer;
  }
  .box .title span:first-child.active {
    background-image: url(../../../../../assets/drag/check_box.png);
  }
  .left, .right {
    // width: 245px;
    height: 250px;
    padding: 5px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x:hidden;
  }
  .left >div , .right > div {
    cursor: pointer;
    text-align: left;
    background-image: url(../../../../../assets/drag/check-box-outline-blank.png);
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px 20px;
    font-size: 14px;
    padding-left: 35px;
    line-height: 30px;
  }
  .left > div.active , .right > div.active {
    background-image: url(../../../../../assets/drag/check_box.png);
  }
  .left > div.hover-color:hover, .right > div.hover-color:hover {
    color: rgb(64, 158, 255);
  }
  .middle {
    margin:0 20px;
  }
  .middle > div {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    background-color: #f5f7fa;
    color: #c0c4cc;
  }
  .middle > div.active {
    background-color: #409eff;
    border-color: #409eff;
    color: #ffffff;
  }
  .search_parent {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  /* .search_div {
    border: 1px solid #dddddd;
    border-radius: 20px;
    width: 150px;
    height: 30px;
    padding-left: 10px;
  } */
  .search_input {
    width: 220px;
    height: 10px;
    border-radius: 50px;
    border: 1px solid #ccc;
    outline: none;
    padding: 10px 0px 10px 10px;
    font-size: 14px;
    text-align: center;
  }
  .search_input_focus {
    border: 1px solid #409eff;
  }
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgb(192, 196, 204);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(192, 196, 204);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgb(192, 196, 204);
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgb(192, 196, 204);
  }
  
</style>
