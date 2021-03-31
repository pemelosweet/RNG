let columnPoly = () => ({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        selectedMode: true, //不可点击
        data: ['蒸发量', '降水量', '平均温度']
    },
    grid: {
        left: 100
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
            ],
            splitLine: {
                //显示分割线
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            splitLine: {
                //不显示分割线
                show: true
            },
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            axisLabel: {
                formatter: '{value} °C'
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            data: [
                2.0,
                4.9,
                7.0,
                23.2,
                25.6,
                76.7,
                135.6,
                162.2,
                32.6,
                20.0,
                6.4,
                3.3
            ]
        },
        {
            name: '降水量',
            type: 'bar',
            data: [
                2.6,
                5.9,
                9.0,
                26.4,
                28.7,
                70.7,
                175.6,
                182.2,
                48.7,
                18.8,
                6.0,
                2.3
            ]
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1, //索引从0开始
            data: [
                2.0,
                2.2,
                3.3,
                4.5,
                6.3,
                10.2,
                20.3,
                23.4,
                23.0,
                16.5,
                12.0,
                6.2
            ]
        }
    ]
});
export default columnPoly;
