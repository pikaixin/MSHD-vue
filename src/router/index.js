import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import ShowDisaster from '../components/card/ShowDisaster.vue'
import FileManage from '../components/card/FileManage.vue'
import UserManage from '../components/card/UserManage.vue'
import VisualChart from '../components/card/VisualChart.vue'
import VisualMap from '../components/card/VisualMap.vue'
import Feedback from '../components/Feedback.vue'
import CodeManage from '@/components/card/CodeManage.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/", component: Welcome },
      { path: "/home/welcome", component: Welcome },
      { path: "/home/showDisaster", component: ShowDisaster },
      { path: "/home/information", component: Information },
      { path: '/home/visualChart', component: VisualChart },
      { path: '/home/visualMap', component: VisualMap },
      { path: "/home/fileManage", component: FileManage },
      { path: "/home/userManage", component: UserManage },
      { path: "/home/codeManage", component: CodeManage },
    ],
  },
  {
    path: "/feedback",
    component: Feedback,
  }

]

const router = new VueRouter({
  routes
})

export default router
