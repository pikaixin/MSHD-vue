<template>
    <div>用户列表
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 卡片视图区 -->
            <el-card>
                <!--搜索区域-->
                <el-row :gutter="25">
                    <el-col :span="10">
                        <!-- 搜索添加 -->
                        <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                        </el-input>
                    </el-col>
                    <!--搜索按钮-->
                    <el-col :span="4">
                        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                    </el-col>
                </el-row>
                <!-- 用户列表  border 边框 stripe 隔行变色 -->
                <el-table :data="userList" border stripe>
                    <el-table-column type="index"></el-table-column><!--索引列-->
                    <el-table-column label="姓名" prop="userName"></el-table-column>
                    <el-table-column label="密码" prop="password"></el-table-column>
                    <!--自定义插槽-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                @click="showEditDialog(scope.row.id)"></el-button>
                            <!-- 删除 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                @click="deleteUser(scope.row.id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页组件-->
                <div>
                    <!-- size-change 每页最大数变化 current-change 页数变化 layout 功能组件-->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="queryInfo.pageNum" :page-sizes="[1, 5, 10, 100]" :page-size="queryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </el-card>

        <!-- 创建新用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="passwd">
                    <el-input v-model="addForm.passwd"></el-input>
                </el-form-item>
            </el-form>
            <!-- 内容底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <!-- 用户名 -->
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="editForm.userName"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="passwd">
                    <el-input v-model="editForm.passwd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    created() {
        this.getUserList();
    },
    data() {
        return {
            //查询信息实体 
            queryInfo: {
                query: "",
                page: 1,
                limit: 5,
            },
            userList: [],   //用户列表
            total: 0,       //最大数据记录

            addDialogVisible: false,// 对话框显示
            // 添加用户表单项
            addForm: {
                userName: "",
                passwd: "",
            },
            // 控制修改用户对话框显示/隐藏
            editDialogVisible: false,
            // 修改用户信息
            editForm: {
                userName: "",
                oldpassword: "",
                newpassword: "",
            },
            // 添加用户表单验证规则
            addFormRules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
                passwd: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
            },
            // 修改用户表单验证规则
            editFormRules: {
                newpassword: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
            },
        };
    },
    methods: {
        //获取所有用户数据
        async getUserList() {
            // 调用get请求
            const { data: res } = await this.$http.get("user/list", {
                params: this.queryInfo
            });
            this.userList = res.data.list;
            this.total = res.totalCount;
            console.log(JSON.parse(JSON.stringify(this.userList)));
            console.log(res.total)
        },
        //监听pageSize改变
        handleSizeChange(newSize) {
            this.queryInfo.limit = newSize;
            this.getUserList();
        },
        //监听pageNum改变
        handleCurrentChange(newPage) {
            this.queryInfo.page = newPage;
            this.getUserList();
        },
        // 监听添加用户
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();// 重置表单项
        },
        // 添加用户
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                console.log(valid);
                if (!valid) return;
                console.log(this.addForm.userName)

                // 发起请求 
                const { data: res } = await this.$http.post("/user/register", this.addForm);

                if (res != "success") {
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");

                //隐藏
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        // 展示修改框
        async showEditDialog(id) {
            const { data: res } = await this.$http.get("/user/list", { params: this.id });
            //console.log(res);
            if (res != "success") {
                return this.$message.error("操作失败！！！");
            }
            this.$message.success("操作成功！！！");

            this.editForm = res;

            this.editDialogVisible = true;  //开启对话框-修改信息
        },
        // 关闭窗口
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 确认修改
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                console.log(valid);
                if (!valid) return;
                // 发起请求
                const { data: res } = await this.$http.put("user/changepwd", this.editForm.newpassword);
                console.log(res);
                if (res != "success") return this.$message.error("操作失败！！！");
                this.$message.success("操作成功！！！");
                //隐藏
                this.editDialogVisible = false;
                this.getUserList();
            });
        },
        // 删除按钮
        async deleteUser(id) {
            // 弹框
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            // 成功删除为confirm 取消为cancel
            if (confirmResult != 'confirm') {
                return this.$message.info("已取消删除");
            }
            /*
            const { data: res } = await this.$http.delete("deleteUser?id=" + id);
            if (res != "success") {
                return this.$message.error("操作失败！！！");
            }
            */
            this.$message.success("操作成功！！！");
            this.getUserList();
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