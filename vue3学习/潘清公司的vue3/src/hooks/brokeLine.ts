let brokeLines = () => ({
    title: {
        text: '折线图',
        subtext: 'test',
        left: 'center',
        textStyle: {
            fontSize: '18px',
            color: '#222'
        },
        subtextStyle: {
            fontSize: '14px',
            color: '#666'
        }
    },
    tooltip: {
        show: true,
        trigger: 'item'
    },
    xAxis: {
        type: 'category',
        data: [
            '2020-05',
            '2020-06',
            '2020-07',
            '2020-08',
            '2020-09',
            '2020-10',
            '2020-11'
        ]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            showSymbol: true, //是否默认展示圆点
            symbol: 'circle', //设定为实心点
            symbolSize: 16, //设定实心点的大小
            itemStyle: {
                normal: {
                    color: '#1F824E', //改变折线点的颜色
                    label: { show: true }, //圆点旁显示数据
                    lineStyle: {
                        color: '#1F824E' //改变折线颜色
                    }
                }
            }
        }
    ]
});
export default brokeLines;
