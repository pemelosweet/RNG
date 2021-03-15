<template>
  <treeselect :multiple="true" :options="options" placeholder="选择" v-model="value" />
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: 'TreeSelect',
  components: { Treeselect },
  data() {
    return {
      value: null,
      options: [
        {
          id: 'node-1',
          label: 'wwwwwwwww',
          children: [
            {
              id: 'aaa',
              label: 'wwwwwwwwww'
            },
            {
              id: 'bbb',
              label: 'wwwwwwwww'
            }
          ]
        },
        {
          id: 'node-2',
          label: 'eeeeeeeeee',
          children: [
            {
              id: 'node-2-a',
              label: '保险公司'
            },
            {
              id: 'node-2-b',
              label: '保险资产管理公司'
            }
          ]
        },
        {
          id: 'node-3',
          label: '证券业',
          children: [
            {
              id: 'node-3-a',
              label: '证券经纪'
            },
            {
              id: 'node-3-b',
              label: '证券投资咨询'
            }
          ]
        },
        {
          id: 'node-4',
          label: '六类'
        },
        {
          id: 'node-5',
          label: '消费金融公司'
        },
        {
          id: 'node-6',
          label: '贷款公司'
        },
        {
          id: 'node-7',
          label: '银行卡组织'
        },
        {
          id: 'node-8',
          label: '资金清算中心'
        },
        {
          id: 'node-9',
          label: '支付机构',
          children: [
            {
              id: 'node-9-a',
              label: '清算组织'
            },
            {
              id: 'node-9-b',
              label: '支付机构'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
