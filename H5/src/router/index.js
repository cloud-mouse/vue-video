import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index'),
    meta: { title: '首页', keepAlive: true, showTabbar: true }
  }, {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index'),
    meta: { title: '个人中心', showTabbar: true, keepAlive: true }
  }, {
    path: '/classify',
    name: 'Classify',
    component: () => import('@/views/classification/index'),
    meta: { title: '分类', showTabbar: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index'),
    meta: { title: '影视搜索' }
  },
  {
    path: '/movieList',
    name: 'MovieList',
    component: () => import('@/views/movie/list'),
    meta: { title: '影视列表' }
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('@/views/movie/index'),
    meta: { title: '影视', showTabbar: true },
    children: [{
      path: 'list',
      name: 'MovieList',
      component: () => import('@/views/movie/list'),
      meta: { title: '影视列表' }
    }, {
      path: 'detail',
      name: 'MovieDetail',
      component: () => import('@/views/movie/detail'),
      meta: { title: '影视详情' }
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('@/views/authorization/login'),
    meta: { title: '用户登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('@/views/authorization/register'),
    meta: { title: '用户注册' }
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404页面
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
