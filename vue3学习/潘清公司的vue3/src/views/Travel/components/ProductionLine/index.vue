<template>
    <TravelLine class="production-travel-line" :list="points" :measure-handler="measure">
        <template v-slot:default="scope">
            <div class="stop">
                <div :class="scope.$index%2 === 0 ? 'over' : 'under'">
                    <div class="title">
                        {{scope.data.name}}
                        <el-image :src="scope.data.poster" fit="contain" :lazy="true"></el-image>
                    </div>
                    <div class="text">第一次售出时间：{{scope.data.firstSaleDate}}</div>
                    <div class="text mt">第一次售出数量：{{scope.data.firstSaleAmount}}</div>
                    <div class="text">最后一次售出时间：{{scope.data.lastSaleDate}}</div>
                    <div class="text mt">最后一次售出数量：{{scope.data.lastSaleAmount}}</div>
                    <div class="text">累计售出数量：{{scope.data.totalSaleAmount}}</div>
                    <div class="text">累计退货数量：{{scope.data.totalReturnedAmount}}</div>
                    <div class="text">退货率：{{Math.floor(scope.data.totalReturnedRate * 100)}}%</div>
                </div>
            </div>
        </template>
    </TravelLine>
</template>
<script type="text/jsx" lang="ts">
    import { defineComponent, PropType } from 'vue'
    import ProductionStopData from '../../classes/ProductionStopData'
    import TravelLine from '@/components/TravelLine/index.vue'
    export default defineComponent({
        name: 'ProductionTravelLine',
        components: {
            TravelLine
        },
        props: {
            list: {
                required: true,
                type: Array as PropType<Array<ProductionStopData>>,
                default: ():Array<ProductionStopData> => new Array<ProductionStopData>(),
            }
        },
        computed: {
            points: {
                get():Array<ProductionStopData> {
                    const me = this
                    return me.list.sort((item1:ProductionStopData, item2:ProductionStopData) => {
                        if (item1.date > item2.date) return -1
                        if (item1.date === item2.date) return 0
                        if (item1.date < item2.date) return 1
                    })
                },
                set(val:Array<ProductionStopData>):void {
                    const me = this
                }
            }
        },
        methods: {
            measure():void {
                /** 为准确显示滚动条，需要重新计算宽度 **/
                const me = this
                if (me.list.length > 0) {
                    const { jQuery } :any = window
                    let w = jQuery(me.$el).find('li').get(0).offsetWidth * me.list.length
                    jQuery(me.$el).find('.travel-line').css('width', w + 'px')
                }
            }
        }
    })
</script>
<style lang="scss">
    .production-travel-line {
        .travel-line {
            padding: 20rem 0;
            /*height: 50rem;*/
        }
        li {
            position: relative;
            align-items: center;
            &::before, &::after {
                margin-top: 0;
                width: 10rem;
            }
            &::before {
                margin-right: -7.5rem;
            }
            &::after {
                margin-left: -7.5rem;
            }
        }
        .stop {
            .over, .under {
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 7rem;
                    border-left: 1px dashed #dddddd;
                    left: 50%;
                }
            }
            .over {
                transform: translate(0, -20rem);
                &::after {
                    bottom: -7rem;
                }
            }
            .under {
                transform: translate(0, 18rem);
                &::after {
                    top: -7rem;
                }
            }
            & * {
                box-sizing: border-box;
            }
        }
        .title, .el-image, .text {
            background-color: #eeeeee;
        }
        .title {
            font-size: 1.4rem;
            line-height: 2rem;
            padding: 0.5rem 1rem 0 1rem;
            color: #333333;
            text-align: center;
        }
        .el-image {
            width: 10rem; height: 6rem;
            padding: 0.5rem 1rem;
            display: block;
            margin: auto;
        }
        .text {
            color: #646464;
            padding: 0 1rem;
            line-height: 2rem;
            &:last-child {
                padding: 0rem 1rem 1rem 1rem;
            }
        }
        .mt {
            margin-bottom: 0.5rem;
        }
    }
</style>