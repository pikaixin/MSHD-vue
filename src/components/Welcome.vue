<template>
  <div class="welcome-home">

    <!-- 头部区域 -->
    <header class="welcome-header">
      <div class="logo">
        <img src="../assets/img/白院徽.png" alt="多源异构灾害管理平台" class="img_logo" />
        <h1>多源异构灾害管理平台</h1>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="welcome-main">
      <section class="hero">
        <h2>灾害管理平台运行中</h2>
        <p>记录、追踪、管理全国的灾害数据</p>
      </section>

      <section class="features">
        <div class="feature">
          <h3>灾情查询</h3>
          <p>提供多种查询方式，可显示灾情的详细信息</p>
        </div>
        <div class="feature">
          <h3>可视化统计</h3>
          <p>可查看详细的统计数据和图表，了解全国的受灾状况</p>
        </div>
        <div class="feature">
          <h3>记录灾情</h3>
          <p>可手动上传灾情数据，提供不同格式文件接口</p>
        </div>
      </section>

      <section class="feedback">
        <p></p><router-link to="/feedback" class="cta-button">意见反馈</router-link>
      </section>

    </main>
  </div>
</template>
  
<script>
export default {
  name: "WelcomePage",
};
</script>
  
<style scoped>
.welcome-home {
  font-family: Arial, sans-serif;
}

.logo{
  text-align: center;
  line-height: 0;
}

.welcome-header {
  background-color: #2b4b6b;
  color: white;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.welcome-header .logo img {
  max-width: 200px;
  max-height: 200px;
  margin-top: auto;
  margin-left: 40%;
  margin-right: 60%;
}

.welcome-header h1 {
  font-size: 30px;
  position: center;
}

.welcome-header nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.welcome-header nav ul li {
  font-size: 18px;
}

.welcome-main {
  padding: 20px;
  text-align: center;
}

.hero h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cta-button {
  display: inline-block;
  background-color: #2b4b6b;
  color: white;
  padding: 10px 30px;
  font-size: 18px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: #0056b3;
}

.features {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 40px;
}

.feature {
  flex: 1;
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
}

.feature h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.feature p {
  font-size: 16px;
}
</style>
  