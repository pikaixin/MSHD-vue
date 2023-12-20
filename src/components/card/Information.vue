<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/home/ShowDisaster'}">灾情显示</el-breadcrumb-item>
            <el-breadcrumb-item >详细信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 卡片视图区 -->
            <el-card>
            </el-card>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    
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
</style>