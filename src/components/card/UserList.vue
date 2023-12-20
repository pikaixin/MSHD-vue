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
                <el-row :gutter="25"> 间隙
                    <el-col :span="10"> 列宽
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
                    <el-table-column label="状态" prop="status">
                        <!--作用域插槽 scope.row 存储当前行的信息 -->
                        <template slot-scope="scope"><!--数据模板-->
                            <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <!--自定义插槽-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                @click="showEditDialog(scope.row.id)"></el-button>
                            <!-- 删除 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                @click="deleteUser(scope.row.id)"></el-button>
                            <!-- 权限 -->
                            <el-tooltip effect="dark" content="分配权限" placement="top-start"
                                :enterable="false"><!--文字提示 enterable 隐藏-->
                                <el-button type="warning" icon="el-icon-setting" size="mini"
                                    @click="showEditRulesDialog(scope.row.id)"></el-button>
                            </el-tooltip>
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
                    <el-input v-model="addForm.password"></el-input>
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
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.userName" disabled></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="editRulesDialogVisible" width="50%" @close="editRulesDialogClosed">
            <!--内容底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRulesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRules">确 认</el-button>
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
            list: [],   //用户列表
            totalCount: 0,       //最大数据记录

            addDialogVisible: false,// 对话框显示
            // 添加用户表单项
            addForm: {
                userName: "",
                password: "",
            },
            // 控制修改用户对话框显示/隐藏
            editDialogVisible: false,
            // 修改用户信息
            editForm: {},
            // 验证规则
            addFormRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { min: 5, max: 15, message: "请输入正确邮箱地址", trigger: "blur" }
                ],
                
            },
            // 修改用户表单验证规则
            editFormRules: {
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { min: 5, max: 15, message: "请输入正确邮箱地址", trigger: "blur" }
                ],
            },
            editRulesForm: {
                id: -1
            },
            editRulesDialogVisible: false,
        };
    },
    methods: {
        //获取所有用户数据
        async getUserList() {
            // 调用post请求
            const { data: res } = await this.$http.get("user/list", {
                params: this.queryInfo
            });
            this.list = res.data.list;
            this.total = res.totalCount;
            console.log(JSON.parse(JSON.stringify(this.list)));
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
        // 修改用户状态
        async userStateChanged(userinfo) {
            
            const { data: res } = await this.$http.put(
                `userState?id=${userinfo.id}&state=${userinfo.state}`
            );
            if (res != "success") {
                userinfo.state = !userinfo.state;
                return this.$message.error("操作失败！！！");
            }
            this.$message.success("操作成功！！！");
            
        },
        // 监听添加用户
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();// 重置表单项
        },
        // 添加用户
        addUser(userinfo) {
            this.$refs.addFormRef.validate(async valid => {
                console.log(valid);
                if (!valid) return;
                // 发起请求
            
                const { data: res } = await this.$http.post("user/register", this.addForm);
                if (res != "success") {
                    userinfo.state = !userinfo.state;
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");

                //隐藏
                this.addDialogVisible = false;
                this.getUserList();
            })
        },
        // 展示修改框
        async showEditDialog(id) {
            const { data: res } = await this.$http.get("user/list");

                if (res != "success") {
                    userinfo.state = !userinfo.state;
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");
            
            this.editForm = res;
            this.editDialogVisible = true;
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
                const { data: res } = await this.$http.put("editUser", this.editForm);
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
            
            const { data: res } = await this.$http.delete("deleteUser?id=" + id);
            if (res != "success") {
                return this.$message.error("操作失败！！！");
            }
            
            this.$message.success("操作成功！！！");
            this.getUserList();
        },

        async showEditRulesDialog(id, role) {
            this.editRulesForm.role = role;
            this.editRulesForm.id = id;
            this.editRulesDialogVisible = true; // 开启对话框-修改信息
        },

        // 关闭窗口-修改权限
        editRulesDialogClosed() {
            this.$refs.editRulesFormRef.resetFields(); // 重置信息
        },
        // 确认修改-修改权限
        editRules() {
            this.$refs.editRulesFormRef.validate(async valid => {
                if (!valid) return;
                
                // 发起修改请求
                const { data: res } = await this.$http.put("editRules", this.editRulesForm);
                if (res != "success") {
                    return this.$message.error("修改失败");
                }
                this.$message.success("修改成功");
                
                //隐藏对话框-修改信息
                this.editRulesDialogVisible = false;
                this.getUserList();
            });
        }
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