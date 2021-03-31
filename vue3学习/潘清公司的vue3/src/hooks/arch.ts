let pass_rate = 70,
    average = 60,
    total = 100;
let arch = () => ({
    title: {
        text: '环形图',
        subtext: 'test',
        top: 'auto',
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
        show: false,
        trigger: 'item',
        formatter: '{a} : {c} ({d}%)'
    },
    //  color: ['#85b6b2', '#6d4f8d'],
    color: ['rgb(255,159,127)', 'rgb(50,197,233)'],
    legend: {
        orient: 'vertical',
        x: '15%',
        top: '17%',
        itemHeight: 10, //图例的高度
        itemGap: 8, //图例之间的间距
        data: ['通过率' + pass_rate + '%', '平均值' + average + '%']
        //图例的名字需要和饼图的name一致，才会显示图例
    },
    series: [
        {
            name: pass_rate + '%',
            type: 'pie',
            radius: ['40%', '45%'],
            //环的位置
            label: {
                show: true,
                color: '#000',
                position: 'inside',
                normal: {
                    // 显示的位置
                    // position: 'inner',
                    padding: [0, -70] //调整数据位置
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            data: [
                {
                    value: pass_rate, //需要显示的数据
                    name: '通过率' + pass_rate + '%',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255,159,127)'
                        }
                    }
                },
                {
                    value: total - pass_rate,
                    //不需要显示的数据，颜色设置成和背景一样
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }
            ]
        },
        {
            name: average + '%',
            type: 'pie',
            radius: ['30%', '35%'],
            label: {
                show: true,
                color: '#000',
                position: ['5%', '60%'],
                normal: {
                    // position: 'inner',
                    padding: [25, -105] //调整数据位置
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            data: [
                {
                    name: '平均值' + average + '%',
                    value: average,
                    itemStyle: {
                        normal: {
                            color: 'rgb(50,197,233)'
                        }
                    }
                },
                {
                    value: total - average,
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }
            ]
        }
    ]
});
export default arch;
