//左2图表1
var l2lChart = echarts.init(document.getElementById("l2lChart"));
var l2lChartOption = {
    title:{
        text:'出行方式数据分析',
        textStyle:{
            fontSize:12,
            color:'#E0E2E5',
            fontWeight:"lighter"
        }
    },
    color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
    tooltip: {
        // confine:false,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',     //图例排列方式
        bottom:0,
        itemWidth:10,
        itemHeight:10,
        itemGap:6,
        data:['自行车出行方式','小汽车出行方式','','公共汽车出行方式'],
        textStyle:{
            color:"#00DEE3",
            fontSize:10
        }
    },
    series: [
        {
            name:" ",
            type:'pie',
            radius: ['35%', '50%'],
            center:['50%','45%'],
            label: {
                normal: {
                    formatter: '{b|{b}}{c}\n{per|{d}%}',
                    textStyle:{
                        lineHeight:12
                    },
                    rich: {
                        b: {
                            fontSize: 12,
                        },
                        per: {
                            color:"#00DEE3",
                            fontSize:10,
                            align:'center',
                        }
                    }
                }
            },
            data:[
                {value:30, name:'公共汽车'},
                {value:60, name:'小汽车'},
                {value:10, name:'自行车'},

            ]
        }
    ]
};
l2lChart.setOption(l2lChartOption);

//左2图表2


// 左3图表
var ltChart = echarts.init(document.getElementById("ltChart"));
ltChartOption = {
    grid:{
        x:'8%',
        y: '5%',
        width: '90%',
        height:'75%'
    },
    legend: {
        data:['森林面积覆盖率'],
        orient: 'vertical',
        right: 0,
        top: 100,
        bottom: 20,
        show:false
    },
    dataset: {
        source: [
            ['product', '森林面积覆盖率'],
            ['日本', 67],
            ['韩国', 64],
            ['挪威', 60],
            ['瑞典', 54],
            ['中国', 16.5],
        ]
    },
    xAxis: {
        type: 'category',
        axisLabel:{
            interval:0,
            textStyle:{
                color:"#00DEE3",
                fontSize:12
            }
        }
    },
    yAxis: {
        axisLabel:{
            textStyle:{
                color:"#00DEE3",
                fontSize:12
            }
        },
        splitLine: {//分割线配置
            show:true,
            lineStyle: {
                color: "#0C1639",
            }
        }
    },
    tooltip:{
        show:true
    },
    series: [
        {
            type: 'bar',
            barMaxWidth: '8%',
            itemStyle: {
                normal: {
                    color:"#249CF9",
                }
            }
        },
        {
            type: 'bar',
            barMaxWidth: '8%',
            itemStyle: {
                normal: {
                    color:"#FDB628",
                }
            }
        },
        {
            type: 'bar',
            barMaxWidth: '8%',
            itemStyle: {
                normal: {
                    color:"#67E0E3",
                }
            }
        },
    ]
};
ltChart.setOption(ltChartOption);

var selectArr = ltChart.getOption().legend[0].data;
var checkboxs = document.getElementsByName('checkboxchart');
$(function(){
    $("#ltContents3").find(":checkbox").each(function(){
        $(this).click(function(){
            $(this).prop('checked',true).siblings().prop('checked',false);
            var obj = {};
            for(var i=0; i<checkboxs.length; i++){
                if(checkboxs[i].checked){
                    obj[selectArr[i]] = true;
                }else{
                    obj[selectArr[i]] = false;
                }
            }
            ltChartOption.legend.selected = obj;
            ltChart.setOption(ltChartOption);
        });
    });
});

//左4图表

// 中间地图
var data = [
    {
        name:"南昌县",
        value:"400",
    },
    {name:"安义县",value:"300"},
    {name:"进贤县",value:"150"},
    {name:'新建区',value:'300'}
];
var geoCoordMap = {
    //坐标位置
    '南昌县': [115.942465,28.543781],
    '安义县': [115.553109,28.841334],
    '进贤县': [116.267671,28.365681],
    "新建区": [115.820806,28.690788],

};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
// 基于准备好的dom，初始化echarts实例
var ctmChart = echarts.init(document.getElementById('ctMap'));

// 绘制图表
ctmChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter(params){
            return params.data.name + "："+ params.data.value[2]
        }
    },
    geo: {		//地理坐标系组件，设置地图样式
        map: 'nanchang',
        zoom:1.1,
        itemStyle: {
            normal:{	//正常显示
                areaColor: '#090C1D',
                borderWidth: 0.5,
                borderColor: '#19407F',
                //阴影效果
                shadowColor: '#2E4FB6', 
                shadowBlur: 5,
            },
            emphasis: {	//鼠标hover时的样式
                areaColor: '#0F184E',
                borderWidth: 1,
                borderColor: '#fff',
            }
        },
        label: {
            emphasis: {
                show:false
            }
        }
    },
    series: [

        {
            // 普通散点图
            name: "ordinary",
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                },
                emphasis: {
                    show: true,
                    color: "#9E9BA9"
                }
            },
            itemStyle: {
                normal: {
                    color: '#9A4F3E',
                }
            },
        },
        {
            // 数值前三
            name:'top3',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 3)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b|{b}}',
                    rich:{
                        b:{
                            color: "#fff"
                        }
                    },
                    position: 'top',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#0959B8',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 2
        },
    ]
});
    
// 中下区域图表
