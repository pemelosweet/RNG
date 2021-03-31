<!-- 商品促销管理 -->
<template>
  <div class="product-promotion">
    <draggable
      class="list-group"
      tag="transition-group"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      v-model="list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="id"

    >
      <template #item="{ element }">
        <div class="list-group-item" :key="element.id">
          <el-row>
            <el-col :span="9" class="item-border">
              <div class="source-tag" :class="{ channel: element.id % 2 }">
                {{ element.id % 2 ? "渠道" : "集团" }}
              </div>
              <el-image style="width: 130px" :src="element.url" type="fill"></el-image>
              <el-row>
                <el-col :span="8" class="right">商品名称：</el-col>
                <el-col :span="16" class="left">洋参蛹虫草胶囊</el-col>
                <el-col :span="8" class="right">商品规格：</el-col>
                <el-col :span="16" class="left">24g</el-col>
                <el-col :span="8" class="right">商品价格：</el-col>
                <el-col :span="16" class="left">9.90元</el-col>
                <el-col :span="8" class="right">商品库存：</el-col>
                <el-col :span="16" class="left">9999</el-col>
              </el-row>
            </el-col>
            <el-col :span="15" class="info">
              <div class="status">{{'进行中'}}</div>
              <i class="el-icon-rank icon"></i>
              <el-row>
                <el-col :span="6" class="right">&nbsp;&nbsp;&nbsp;&nbsp;<b>{{ element.id }}</b>、活动名称：</el-col>
                <el-col :span="18" class="left">双11变通大促销</el-col>
                <el-col :span="6" class="right">活动时间：</el-col>
                <el-col :span="18" class="left">2020年11月1日-2020年12月1日</el-col>
                <el-col :span="13" class="right">活动剩余库存/售出数量：</el-col>
                <el-col :span="11" class="left">9999/0</el-col>
                <el-col :span="6" class="right">优惠类型：</el-col>
                <el-col :span="24" class="left">
                  <discountType :types="discountTypes" />
                </el-col>
                <el-col :span="6" class="right">限购条件：</el-col>
                <el-col :span="24" class="left">
                  <discountType :types="purchaseRestrictions" color="#409EFF" />
                </el-col>
                <el-col :span="6" class="right">创建人：</el-col>
                <el-col :span="18" class="left">yuzhilin321</el-col>

                <el-col
                  :span="24"
                  class="left"
                  style="padding: 5px 5px 0; border-top: 1px"
                >
                  <el-button type="primary" @click="handleStopFn(element.id)">暂停</el-button>
                  <el-button type="primary" @click="handleEditFn(element.id)">编辑</el-button>
                  <el-button type="primary" @click="handleDeleteFn(element.id)">删除</el-button>
                  <el-button type="primary" @click="handleShowInfoFn(element.id)">查看详情</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
// vue功能组件
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted
} from "vue";
// import other
import { ElImage,ElMessage } from "element-plus";
import draggable from "vuedraggable";
import discountType from "@/components/DMC/discountType.vue";
import goods001 from "@/assets/images/DMC/goods_001.png";

export default defineComponent({
  name: "productPromotion",
  // props: {},
  components: {
    ElImage,
    discountType,
    draggable,
  },
  setup(props) {
    // 方法集合
    const funcList = {
      handleStopFn(id){
        ElMessage(`暂停：${id}`)
      },
      handleEditFn(id){
        ElMessage.success(`编辑：${id}`)
      },
      handleDeleteFn(id){
        ElMessage.error(`删除：${id}`)
      },
      handleShowInfoFn(id){
        ElMessage.warning(`查看详情：${id}`)
      },
    }

    // 定义数据和方法
    const data = reactive({
      url: goods001,
      drag: true,
      discountTypes: ["满减", "折扣", "红包", "返券"],
      purchaseRestrictions: ["仅限新人", "没人限购", "每日限购"],
      list: [
        {
          id: 1,
          name: 1,
          url: goods001
        },
        {
          id: 2,
          name: 2,
          url: goods001
        },
        {
          id: 3,
          name: 3,
          url: goods001
        },
        {
          id: 4,
          name: 4,
          url: goods001
        },
        {
          id: 5,
          name: 5,
          url: goods001
        },
        {
          id: 6,
          name: 6,
          url: goods001
        },
      ],
      display: "Transitions",
      order: 7,
      ...funcList
    });

    // 计算属性
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    });

    // 监听数据
    // watch(([])=>{})

    // 生命周期
    // onMounted(()=>{})

    return {
      dragOptions,
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.product-promotion {
  overflow: hidden;
  text-align: center;
  .list-group-item {
    float: left;
    margin: 10px 15px;
    width: 492px;
    height: 242px;
    font-size: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    white-space: nowrap;
    .item-border {
      position: relative;
      line-height: 24px;
      padding: 10px;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        height: 103%;
        background: #dcdfe6;
      }
      .source-tag {
        position: absolute;
        top: -2px;
        left: 20px;
        width: 36px;
        height: 28px;
        color: #fff;
        font-size: 14px;
        line-height: 36px;
        background: #F56C6C;
        font-weight: 700;

        z-index: 1;
        &::before {
          position: absolute;
          content: "";
          left: 0;
          bottom: -12px;
          width: 0;
          height: 0;
          border: 12px solid #F56C6C;
          border-bottom: 0 solid transparent;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
        }
      }
      .channel {
        background: #409EFF;
        &::before {
          position: absolute;
          content: "";
          left: 0;
          bottom: -12px;
          width: 0;
          height: 0;
          border: 12px solid #409EFF;
          border-bottom: 0 solid transparent;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
        }
      }
    }
    .info {
      position: relative;
      padding: 0 10px;
      .status {
        position: absolute;
        top: -2px;
        right: 30px;
        height: 21px;
        line-height: 21px;
        width: 60px;
        background: #F56C6C;
        color: #fff;
        border-radius: 0 0 4px 4px;
        z-index: 1;
      }
      .icon{
        position: absolute;
        right: 1px;
        top: 2px;
        font-size:18px;
        font-weight: bold;
      }
    }
  }
  .left {
    text-align: left;
    line-height: 1.8;
  }
  .right {
    text-align: right;
    line-height: 1.8;
  }
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
