<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>灾情可视化</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/' }">灾情可视化地图</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div ref="myChart" id="myChart"></div>
        </el-card>


    </div>
</template>

<script>
import * as echarts from "echarts"
import { mapData } from "../card/mapData"


export default {
    created() {
    },
    methods: {
        async loadData() {
            const { data: res } = await this.$http.get("admin/codeshow/list", {
                params: this.queryInfo
            });
        },

    },
    mounted() {
        let myChart = echarts.init(this.$refs.myChart)

        echarts.registerMap("chinaMap", mapData)


        let option = {
            geo: {
                //地图的初始配置
                type: "map",
                map: "chinaMap",
                roam: true, //平移
                zoom: 3,    //伸缩
                center: [116.405285, 39.904989],
                show: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#F2F2F2',//地图没有数据的时候的颜色
                        // areaColor: '#0A4579'
                        borderColor: '#097bba'
                    },
                    emphasis: {
                        // areaColor: '#2B91B7' 
                        //鼠标划上去的时候颜色
                        areaColor: '#8389E0'

                    }
                }
            },
        };

        let optino1 = {
            xAxis: {},
            yAxis: {},
            grid: {},
            series: [],
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    data() {
        return {
            //查询信息实体 
            queryInfo: {
                query: "",
                page: 1,
                limit: 5,
            },
            codeList: [],   //灾情码列表
            total: 0,       //最大数据记录   
            data: {

            }
        };
    },

}
</script>

<style lang="less" scoped>
/* 面包屑样式 */
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

#myChart {
    width: 100%;
    height: 800px;
    //border: 1px solid red;
}

</style>