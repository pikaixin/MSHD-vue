<template>
    <!--引入container布局-->
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/img/miku01.jpg" alt class="logo_img" />
                <span>多源异构灾害管理平台</span>
            </div>
            <el-button type="info" @click="logout">安全退出</el-button>
        </el-header>
        <!--主体-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!--伸缩按钮-->
                <div class="toggle-button" @click="toggleCollapase">|||</div>
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" 
                    :unique-opened="true"
                    :collapse="isCollapse" 
                    :collapse-transition="false" 
                    :router="true" 
                    :default-active="activePath">
                    <!--
                    <--一级菜单->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObject[item.id]"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <--二级菜单->
                        <el-menu-item :index="it.path + ''" v-for="it in item.sList" :key="it.id"
                            @click="saveNavState(it.path + '')">
                            <template slot="title">
                                <i :class="iconsObject[it.id]"></i>
                                <span>{{ it.title }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    -->
                    <el-menu-item index='/home/welcome'>
                        <template slot='title'>
                            <i class="iconfont icon-a-001_shouye" slot="prefix"></i>
                            <span >系统首页</span>
                        </template>
                    </el-menu-item>

                    <el-submenu index='/home'>
                        <template slot="title">
                            <i class="iconfont icon-chaxun" slot="prefix"></i>
                            <span>灾情查询</span>
                        </template>
                        <el-menu-item index='/home/showDisaster'>灾情显示</el-menu-item>
                    </el-submenu>

                    <el-submenu index="/home">
                        <template slot='title'>
                            <i class="iconfont icon-keshihuakanban" slot="prefix"></i>
                            <span>灾情可视化</span>
                        </template>
                        <el-menu-item index='/home/visualChart'>灾情可视化图表</el-menu-item>
                        <el-menu-item index='/home/visualMap'>灾情可视化地图</el-menu-item>
                    </el-submenu>

                    <el-submenu index="/home">
                        <template slot='title'>
                            <i class="iconfont icon-guanliyuan" slot="prefix"></i>
                            <span>管理</span>
                        </template>
                        <el-menu-item index='/home/fileManage'>文件管理</el-menu-item>
                        <el-menu-item index='/home/userManage'>用户管理</el-menu-item>
                        <el-menu-item index='/home/codeManage'>灾情管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--主体内容-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>

export default {
    data() {
        return {
            // 左侧菜单
            menuList: [],
            isCollapse: false,//伸缩判断
            activePath: '/welcome',//默认路径
        }
    },

    created() {
        //查询menuList
        setTimeout(() => {
           // this.getMenuList();
        }, 1000);

        //取出session里的访问路径
        this.activePath = window.sessionStorage.getItem('activePath');
    },

    methods: {
        //退出
        logout() {
            window.sessionStorage.clear();//清除session
            this.$router.push("/login");//回到首页
        },
        /*
        //获取导航菜单方法
        async getMenuList() {
            const { data: res } = await this.$http.get("menus");
            var parsedres = res.data;

            console.log(JSON.parse(JSON.stringify(parsedres)));//打印真实数据部分 

            if (res.status != 100) return this.$message.error("获取列表失败!");
            this.menuList = parsedres;  //数据
            console.log(JSON.parse(JSON.stringify(this.menuList)));
        },
        */
        // 切换菜单折叠与展开
        toggleCollapase() {
            this.isCollapse = !this.isCollapse;
        },

        //保存路径
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath); //存放在session中
            this.activePath = activePath;
        },


    }
}
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between; // 左右贴边
    padding-left: 0%;
    align-items: center; // 水平
    color: #fff;
    font-size: 20px;

    div {
        //左侧div加布局
        display: flex;
        align-items: center;

        span {
            margin-left: 20px;
        }
    }
}

.el-aside {
    background-color: #333744;

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.logo_img {
    width: 60px;
    height: 60px;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>


<!--       --伸缩按钮--
<div class="toggle-button" @click="toggleCollapase">|||</div>
<--侧边栏菜单区 unique-opened="true" 只保持一个菜单展开 router开启路由--
<el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened
    :collapse="isCollapse" :collapse-transition="false" :router="true">
    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
            <i :class="iconsObject[item.id]"></i>
            <span>{{ item.title }}</span>
        </template>
        <el-menu-item :index="it.id + ''" v-for="it in item.slist" :key="it.id">
            <template slot="title">
                <i :class="iconsObject[it.id]"></i>
                <span>{{ it.title }}</span>
            </template>
        </el-menu-item>
    </el-submenu>
</el-menu>
-->