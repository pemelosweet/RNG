let curves = () => ({
    title: {
        text: '测试',
        subtext: 'test',
        left: 'center',
        textStyle: {
            fontSize: '18px',
            color: '#f20',
            fontWeight: 'bolder'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]
});
export default curves;
