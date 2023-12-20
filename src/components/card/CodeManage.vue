<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/ShowDisaster' }">灾情显示</el-breadcrumb-item>

        </el-breadcrumb>
        <!--用户列表主体-->
        <!-- 卡片视图区 -->
        <el-card>
            <!-- 触发显示对话框的按钮 -->
            <el-button type="primary" @click="showEditDialog1">上传灾情数据</el-button>

            <!-- 上传灾情数据对话框 -->
            <el-dialog title="输入灾情数据" :visible.sync="editDialogVisible1" width="50%" @close="editDialogClosed1">
                <el-form :model="editForm1" ref="editFormRef1" label-width="70px">
                    <!-- 手动输入编码 -->
                    <el-form-item label="省份">
                        <el-input v-model="editForm1.province"></el-input>
                    </el-form-item>
                    <!-- 手动输入编码 -->
                    <el-form-item label="地级市">
                        <el-input v-model="editForm1.PL_city"></el-input>
                    </el-form-item>
                    <!-- 手动输入编码 -->
                    <el-form-item label="县城">
                        <el-input v-model="editForm1.district"></el-input>
                    </el-form-item>
                    <!-- 手动输入编码 -->
                    <el-form-item label="乡镇">
                        <el-input v-model="editForm1.town"></el-input>
                    </el-form-item>
                    <!-- 手动输入编码 -->
                    <el-form-item label="社区">
                        <el-input v-model="editForm1.community"></el-input>
                    </el-form-item>
                    <!-- 手动输入编码 -->
                    <el-form-item label="震情信息">
                        <el-input v-model="editForm1.disasterInfo"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="editInfo">确 定 上 传</el-button>
                </span>
            </el-dialog>
        </el-card>
        <el-card>
            <!-- 触发显示对话框的按钮 -->
            <el-button type="primary" @click="showEditDialog2">上传灾情编码</el-button>
            <el-dialog title="输入灾情编码" :visible.sync="editDialogVisible2" width="50%" @close="editDialogClosed2">
                <el-form :model="editForm1" :rules="editFormRules" ref="editFormRef2" label-width="70px">
                    <!-- 手动输入编码 -->
                    <el-form-item label="灾情编码">
                        <el-input v-model="editForm2.codeId"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="editCode">确 定 上 传</el-button>
                </span>
            </el-dialog>
        </el-card>
        <el-card>
            <!-- 触发显示对话框的按钮 -->
            <el-button type="primary" @click="showEditDialog3">删除灾情编码</el-button>
            <el-dialog title="删除灾情编码" :visible.sync="editDialogVisible3" width="50%" @close="editDialogClosed3">
                <el-form :model="editForm1" :rules="editFormRules" ref="editFormRef3" label-width="70px">
                    <!-- 手动输入编码 -->
                    <el-form-item label="灾情编码">
                        <el-input v-model="editForm3.codeId"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteCode">确 定 删 除</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
  


<script>
export default {
    data() {
        return {
            editDialogVisible1: false,
            editDialogVisible2: false,
            editDialogVisible3: false,
            editForm1: {
                province: '',   //省份
                PL_city: '',    //地级市
                district: '',   //县城
                town: '',       //乡镇
                community: '',  //社区
                disasterInfo: '',   //震情信息
            },
            editForm2: {
                codeId: '',//灾情编码
            },
            editForm3: {
                codeId: '',//灾情编码
            },
            editFormRules: {
                // 添加对编码的验证规则
                code: [
                    { required: true, message: '请输入编码', trigger: 'blur' },

                ],
            },
        };
    },
    methods: {
        showEditDialog1() {
            this.editDialogVisible1 = true;
        },
        editDialogClosed1() {
            // 关闭对话框时，可以重置表单
            this.$refs.editFormRef1.resetFields();
        },
        showEditDialog2() {
            this.editDialogVisible2 = true;
        },
        editDialogClosed2() {
            // 关闭对话框时，可以重置表单
            this.$refs.editFormRef2.resetFields();
        },
        showEditDialog3() {
            this.editDialogVisible3 = true;
        },
        editDialogClosed3() {
            // 关闭对话框时，可以重置表单
            this.$refs.editFormRef3.resetFields();
        },
        editInfo() {
            // 提交表单数据
            this.$refs.editFormRef1.validate(async valid => {
                console.log(valid);
                if (!valid) return;

                // 发起请求 
                console.log('上传灾情信息：', this.editForm1);
                const { data: res } = await this.$http.post("/admin/codeshow/add", this.editForm1,{
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (res.resultCode != "200") {
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");
                // 在这里处理编辑用户信息的逻辑
                
                // 隐藏对话框
                this.editDialogVisible1 = false;
            })
        },
        editCode() {
            // 提交表单数据
            this.$refs.editFormRef2.validate(async valid => {
                console.log(valid);
                if (!valid) return;

                // 发起请求 
                const { data: res } = await this.$http.post("/admin/codeshow/add", this.editForm2.codeId);

                if (res.resultCode != "200") {
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");

                console.log('上传灾情编码：', this.editForm2);

                this.editDialogVisible2 = false;
            })
        },
        deleteCode() {
            // 提交表单数据
            this.$refs.editFormRef3.validate(async valid => {
                console.log(valid);
                if (!valid) return;

                // 发起请求 
                console.log(this.editForm3.codeId)
                const { data: res } = await this.$http.post("/admin/codeshow/delete", this.editForm3.codeId, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
               
                if (res.resultCode != "200") {
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！");
                // 在这里处理编辑用户信息的逻辑
                console.log('删除灾情编码：', this.editForm3);
                // 隐藏对话框
                this.editDialogVisible3 = false;
            })
        },


    },
}

</script>

<style lang="less" scoped>
/* 面包屑样式 */
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

/* 设置上传按钮样式 */
.upload-demo {
    display: inline-block;
    margin-left: 10px;
}
</style>