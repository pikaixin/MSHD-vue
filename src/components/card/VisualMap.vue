<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>灾情可视化</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/' }">灾情可视化地图</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 卡片视图区 -->
            <el-card>
                <div ref="myChart" id="myChart">
                </div>
            </el-card>
        </el-card>
    </div>
</template>

<script>
import * as echarts from "echarts"
import { mapData } from "../card/mapData"
import {ref} from 'vue'

export default {
    mounted() {
        const data = ref()
        const loadData =async()=>{
            data.value = await this.$http.get("admin/codeshow/list" )
            console.log(data.value);
        }
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

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        window.addEventListener("resize", function () {
            myChart.resize();
        })
    },
    data() {
        return {}
    },
    methods: {

    }

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