<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--用户列表主体-->
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 卡片视图区 -->
      <!--
      <el-card>
        <form @submit.prevent="submitForm">
          <input type="file" ref="fileInput" @change="handleFileChange">
          <button type="submit">提交</button>
        </form>
      </el-card>
      -->

      <el-card class="upload">
        <el-form :model="formData" label-width="80px" class="upload-form">
          <!-- 文件上传区域 -->
          <el-form-item label="文件上传">
            <el-upload class="upload-demo" action="/your-upload-api-endpoint" :show-file-list="false"
              :on-success="handleUploadSuccess" :before-upload="beforeUpload">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
      /*
      fileList: [],
      uploadData: [],
      dialogImport: false,
      */
    }
  },
  methods: {
    beforeUpload(file) {
      console.log('Before upload:', file);
      return true;
    },

    handleUploadSuccess(response, file) {
      // Handle successful file upload
      console.log('Upload success:', response, file);
    },
    
    importData() {
      this.dialogImport = true;
    },

    // 上传文件超出文件数量限制/文件格式不符合要求时
    handleExceed_json(files, fileList) {
      this.$message.warning(`每次只能导入一个json文件！`);
    },
    handleExceed_xml(files, fileList) {
      this.$message.warning(`每次只能导入一个xml文件！`);
    },

    uploadFile(file) {
      this.jsonUrl = file.raw // 拿到文件的信息
    },

    handleFileChange(event) {
      this.file = event.target.files[0];
    },

    submitForm() {
      const formData = new FormData();
      formData.append('jsonFile', this.file);

      this.$http.post('upload/uploadjsonfile', formData)
        .then(response => {
          if (response.resultCode == 200)
            this.$message.success(response.data);
          else
            this.$message.error(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
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

.footer {
  clear: both;
  display: block;
  text-align: center;
  margin: 0px auto;
  position: absolute;
  bottom: 100px;
}

/* 设置上传按钮样式 */
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>