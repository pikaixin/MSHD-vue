<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>灾情可视化</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/' }">灾情可视化图表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 卡片视图区 -->
            <el-card>
                <div ref="myChart1" id="myChart1"></div>
            </el-card>
            <el-card>
                <div ref="myChart2" id="myChart2"></div>
            </el-card>
        </el-card>
    </div>
</template>

<script>
import * as echarts from "echarts"
export default {
    mounted() {
        let myChart1 = echarts.init(this.$refs.myChart1)
        let myChart2 = echarts.init(this.$refs.myChart2)

        //设置数据1
        let data1 = [
            { value: 62, name: "一般灾害" },
            { value: 33, name: "重大灾害" },
            { value: 5, name: "特大灾害" },
        ]
        //设置配置1
        let option1 = {
            title: {
                text: "灾害统计",
                left: "center",
            },
            legend: {
                left: "left",
                orient: "verical",
            },
            series: [
                {
                    name: "灾害统计",
                    type: "pie",
                    data: data1,
                }
            ]
        }

        //设置数据2
        let data2_x = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        let data2_y = [13, 4, 5, 1, 4563, 6, 1, 3, 25, 133, 5, 2]
        //设置配置2
        let option2 = {
            xAxis: {
                type: "category",
                data: data2_x
            },
            yAxis: {
                type: "value",
                data2: data2_y
            },
            title: {
                text: "灾害统计",
                left: "center",
            },
            legend: {
                left: "left",
                orient: "verical",
            },
            series: [
                {
                    name: "灾害数量",
                    type: "line",
                    data: data2_y,
                }
            ]
        }

        myChart1.setOption(option1)
        myChart2.setOption(option2)

         //监听页面大小改变
         window.addEventListener("resize",()=>{
            myChart1.resize();
            myChart2.resize();
        })
    },
    data() {
        return {}
    },
    mehods: {

    }
}

</script>

<style lang="less" scoped>
/* 面包屑样式 */
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

#myChart1 {
    width: 1200px;
    height: 500px;
    //border: 1px solid red;
}

#myChart2 {
    width: 1200px;
    height: 500px;
    //border: 1px solid red;
}
</style>