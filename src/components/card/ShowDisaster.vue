<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>灾情查询</el-breadcrumb-item>
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
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                            <el-button type="primary" size="mini" @click="showInfo(scope.row)">灾情详情</el-button>
                            <!-- 灾情详细数据对话框 -->
                            <el-dialog title="灾情详细数据" :visible.sync="DialogVisible" width="50%" @close="DialogClosed">
                                <el-form :model="Form" ref="FormRef" label-width="80px">
                                    <el-form-item :label="'编码'">
                                        <span>{{ Form.codeId }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'省份'">
                                        <span>{{ Form.province }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'地级市: '">
                                        <span>{{ Form.PL_city }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'县城: '">
                                        <span>{{ Form.district }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'乡镇: '">
                                        <span>{{ Form.town }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'社区: '">
                                        <span>{{ Form.community }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'用户: '">
                                        <span>{{ Form.userName }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'来源: '">
                                        <span>{{ Form.source }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'载体: '">
                                        <span>{{ Form.supporter }}</span>
                                    </el-form-item>
                                    <el-form-item :label="'震情信息: '">
                                        <span>{{ Form.disasterInfo }}</span>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="DialogVisible = false">返 回</el-button>
                                </span>
                            </el-dialog>
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
            //详细信息实体
            DialogVisible: false,
            Form: {
                codeId: '',      //灾情编码
                province: '',   //省份
                PL_city: '',    //地级市
                district: '',   //县城
                town: '',       //乡镇
                community: '',  //社区
                userName: '',   //用户名
                source: '',      //来源
                supporter: '',   //载体
                disasterInfo: '',   //震情信息
            },
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
        showDialog() {
            this.DialogVisible = true;
        },
        DialogClosed() {
            // 关闭对话框时，可以重置表单
            this.$refs.FormRef.resetFields();
        },
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
        async search() {
            try {
                // 发起 GET 请求
                const response = await this.$http.get(`admin/codeshow/search/${this.queryInfo.query}/${this.queryInfo.page}`);

                // 判断响应状态
                if (response.status === 200 && response.data.message === "SUCCESS") {
                    // 获取灾情码列表数据
                    const responseData = response.data.data;

                    // 更新数据
                    this.codeList = responseData.list;
                    this.total = responseData.totalCount;

                    console.log("Search successful:", this.codeList);
                } else {
                    console.error("Search failed:", response);
                }
            } catch (error) {
                console.error("Error during search:", error);
            }
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
        async showInfo(row) {
            const rowIndex = this.codeList.indexOf(row);

            this.Form.codeId = this.codeList[rowIndex].codeId;
            this.Form.province = this.codeList[rowIndex].province;
            this.Form.PL_city = this.codeList[rowIndex].PL_city;
            this.Form.district = this.codeList[rowIndex].district;
            this.Form.town = this.codeList[rowIndex].town;
            this.Form.community = this.codeList[rowIndex].community;
            this.Form.userName = this.codeList[rowIndex].userName;
            this.Form.source = this.codeList[rowIndex].source;
            this.Form.supporter = this.codeList[rowIndex].supporter;
            this.Form.disasterInfo = this.codeList[rowIndex].disasterInfo;

            this.DialogVisible = true;
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