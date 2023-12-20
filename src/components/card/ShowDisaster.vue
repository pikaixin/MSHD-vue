<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>灾情查询</el-breadcrumb-item>
            <el-breadcrumb-item>灾情显示</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 卡片视图区 -->
            <el-card>
                <!--搜索区域-->
                <el-row :gutter="25"> <!--间隙-->
                    <el-col :span="10"> <!--列宽-->
                        <!-- 搜索添加 -->
                        <el-input placeholder="请输入灾情码" v-model="queryInfo.query" clearable @clear="getCodeList">
                            <el-button slot="append" icon="el-icon-search" @click="getCodeList"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <!-- 用户列表  border 边框 stripe 隔行变色 -->
                <el-table :data="codeList" border stripe>
                    <el-table-column type="index"></el-table-column><!--索引列-->
                    <el-table-column label="灾情码" prop="codeId"></el-table-column>
                    <el-table-column label="省/直辖市/自治区" prop="province"></el-table-column>
                    <el-table-column label="地级市" prop="PL_city"></el-table-column>
                    <el-table-column label="区、县" prop="district"></el-table-column>
                    <el-table-column label="乡镇、街道" prop="town"></el-table-column>
                    <el-table-column label="行政村、社区" prop="community"></el-table-column>
                    <!--自定义插槽-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 灾情详情 -->
                            <el-button type="primary"  size="mini" @click="showInfo(scope.row.id)">灾情详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页组件-->
                <div>
                    <!-- size-change 每页最大数变化 current-change 页数变化 layout 功能组件-->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="queryInfo.page" :page-sizes="[1, 5, 10, 100]" :page-size="queryInfo.limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </el-card>
    </div>
</template>

<script>
export default {
    created() {
        this.getCodeList();
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
        };
    },
    methods: {
        //获取所有灾情数据
        async getCodeList() {
            // 调用post请求     
            const { data: res } = await this.$http.get("admin/codeshow/list", {
                params: this.queryInfo
            });
            console.log(res);
            this.codeList = res.data.list;
            this.total = res.data.totalCount;
            console.log(JSON.parse(JSON.stringify(this.codeList)));
        },
        //搜索指定灾情码
        async search(){

        },
         //监听pageSize改变
         handleSizeChange(newSize) {
            this.queryInfo.limit = newSize;
            this.getCodeList();
        },
        //监听pageNum改变
        handleCurrentChange(newPage) {
            this.queryInfo.page = newPage;
            this.getCodeList();
        },
        showInfo(id){
            this.$router.push({ path: "/home/information" });// 页面路由跳转
        },
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