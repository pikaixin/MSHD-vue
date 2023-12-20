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

      <!--
        <div style="text-align:top">
           此处action需为有效的任意接口
          <el-upload drag :limit="1" action="#" ref="upload" accept=".json" :http-request="uploadAction"
            :file-list="fileList" :on-success="onSuccess_json" :on-remove="onRemove" :on-exceed="handleExceed_json">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              注：仅可上传json格式文件
            </div>
          </el-upload>
          <span slot="footer">
            <el-button @click="dialogImport = false">取 消</el-button>
            <el-button @click="importConfirm" type="primary">确 定</el-button>
          </span>
        </div>
      </el-card>

      <el-card>
        <div style="text-align:justify">
           此处action需为有效的任意接口-->
      <!-- <el-upload drag :limit="1" action="#" ref="upload" accept=".xml" :file-list="fileList"
            :http-request="uploadAction" :on-success="onSuccess_xml" :on-remove="onRemove" :on-exceed="handleExceed_xml">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              注：仅可上传xml格式文件
            </div>
          </el-upload>
          <span slot="footer">
            <el-button @click="dialogImport = false">取 消</el-button>
            <el-button @click="importConfirm" type="primary">确 定</el-button>
          </span>
        </div>
      </el-card>
    -->

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
/*
// 文件上传成功
onSuccess_json(res, file, fileList) {
  let reader = new FileReader();
  reader.readAsText(file.raw);
  reader.onload = (e) => {
    this.uploadData = [];
    this.uploadData = JSON.parse(e.target.result);
  };
},
onSuccess_xml(res, file, fileList) {
  let reader = new FileReader();
  reader.readAsText(file.raw);
  reader.onload = (e) => {
    this.uploadData = [];
    this.uploadData = XMLDocument.parse(e.target.result);
  };
},

// 移除文件
onRemove(file) {
  this.fileList = [];
},

// 导入确认
importConfirm() {
  this.$confirm("导入后原数据会被覆盖，确定导入吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    // 使用目标数据变量接收上传后的文件数据
    this.stockData = this.uploadData;

    this.dialogImport = false;

    this.$message({
      type: "success",
      message: "导入成功!",
    });
  });
},
 

uploadAction() {
  this.$http({
    url: 'http://localhost:9000/upload/uploadjsonfile',
    method: 'post',
    //发送格式为json
    data:
      this.fileList,
    headers:
    {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
    },
  }).then(function (return_data) {
    alert(return_data)
  }, function (return_data) {
    alert(return_data)
  })
}
}
}*/
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