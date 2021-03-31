const { LinearGradient } = require('echarts/lib/util/graphic');
let areaOption = () => ({
    title: {
        left: 'center',
        text: '测试',
        subtext: 'test'
    },
    grid: {
        left: 24,
        right: '6%',
        bottom: '30',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: true, // 设置为false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
        data: ['2015考研', '2016考研', '2017考研', '2018考研', '2019考研'],
        axisLabel: {
            //配置X轴字体大小
            textStyle: {
                fontSize: '20'
            }
        }
    },
    yAxis: {
        type: 'value',
        min: 50000,
        max: 150000,
        splitLine: {
            show: false
        },
        axisLabel: {
            //配置Y轴字体大小
            textStyle: {
                fontSize: '20'
            }
        }
    },
    series: [
        {
            data: [59573, 63523, 81871, 119523, 141786],
            type: 'line',
            areaStyle: {
                //配置渐变色
                normal: {
                    color: new LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#14c2d6' }, //顶端颜色
                        { offset: 0.5, color: '#91e4e8' }, //中间颜色
                        { offset: 1, color: '#e8f7f4' } //底部颜色
                    ])
                }
            },
            label: {
                //配置数据标签
                normal: {
                    show: true,
                    color: 'black',
                    textStyle: {
                        fontSize: '20'
                    }
                }
            }
        }
    ]
});
export default areaOption;
