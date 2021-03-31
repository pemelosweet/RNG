<template>
    <div class="travel-demo">
        <el-card>
            <h1>旅程相关时间节点组件 npm run mock</h1>
        </el-card>
        <el-card>
            <template #header>员工旅行 StaffTravelLine</template>
            <StaffTravelLine :list="staffStopList"></StaffTravelLine>
        </el-card>
        <el-card>
            <template #header>产品旅行 ProductionTravelLine</template>
            <ProductionLine :list="productionStopList"></ProductionLine>
        </el-card>
        <el-card>
            <template #header>客户旅行 ClientTravelLine</template>
            <StaffTravelLine :list="clientStopList"></StaffTravelLine>
        </el-card>
    </div>
</template>
<script type="text/jsx" lang="ts">
    import { defineComponent } from 'vue'
    import { getStaffTravelList, getProductionTravelList, getClientTravelList } from '@/api/Travel'
    import StaffTravelLine from './components/StaffTravelLine/index.vue'
    import StaffStopData from './classes/StaffStopData'
    import ProductionLine from './components/ProductionLine/index.vue'
    import ProductionStopData from './classes/ProductionStopData'

    export default defineComponent({
        name: 'Travel',
        components: {
            StaffTravelLine,
            ProductionLine,
        },
        data() {
            return {
                staffStopList: [] as Array<StaffStopData>,
                productionStopList: [] as Array<ProductionStopData>,
                clientStopList: [] as Array<StaffStopData>,
            }
        },
        mounted() {
            const me = this
            getStaffTravelList(me.$route['query']['staffId'] || 0).then((res:any) => {
                if (res.success === true) {
                    // console.log(res.data.data)
                    me.staffStopList = res.data.data.map(item => {
                        return new StaffStopData(item.id,item.date, item.message, item.type)
                    })
                }
            })
            getProductionTravelList(me.$route['query']['staffId'] || 0).then((res:any) => {
                if (res.success === true) {
                    console.log(res.data.data)
                    me.productionStopList = res.data.data.map(item => {
                        return new ProductionStopData(
                            item.id, item.date, item.name, item.poster, item.firstSaleDate, item.firstSaleAmount,
                            item.lastSaleDate, item.lastSaleAmount, item.totalSaleAmount, item.totalReturnedAmount,
                            item.totalReturnedRate
                        )
                    })
                }
            })
            getClientTravelList(me.$route['query']['staffId'] || 0).then((res:any) => {
                if (res.success === true) {
                    me.clientStopList = res.data.data.map(item => {
                        return new StaffStopData(item.id, item.date)
                    })
                }
            })
        },
        setup(props, context) {
            return {
            }
        }
    })
</script>
<style lang="scss">
    .travel-demo {
        .el-card {
            margin-bottom: 2rem;
        }
    }
</style>