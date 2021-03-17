import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Index',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/member',
    component: Layout,
    alwaysShow: true,
    redirect: '/member/memberList',
    meta: { title: '会员管理', icon: 'member' },
    children: [{
      path: 'memberList',
      name: 'MemberList',
      component: () => import('@/views/memberCenter/member/list'),
      alwaysShow: false,
      meta: { title: '会员列表', noCache: false }
    }]
  },
  {
    path: '/video',
    name: 'Video',
    component: Layout,
    meta: { title: '影视中心', icon: 'video' },
    children: [
      {
        path: 'class',
        name: 'VideoClass',
        component: () => import('@/views/video/class/index'),
        meta: { title: '影视分类' }
      },
      {
        path: 'list',
        name: 'VideoList',
        component: () => import('@/views/video/list/index'),
        meta: { title: '影视列表' }
      },
      {
        path: 'episodes',
        name: 'VideoEpisodes',
        hidden: true,
        component: () => import('@/views/video/episodes/index'),
        meta: { title: '影视剧集' }
      }
    ]
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Layout,
    redirect: '/manage/admin',
    meta: { title: '权限管理', icon: 'manage' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/manage/admin/list'),
        meta: { title: '管理员' }
      },
      {
        path: 'roles',
        name: 'Roles',
        redirect: '/manage/roles/list',
        component: () => import('@/views/manage/roles/index'),
        meta: { title: '角色管理' },
        children: [
          {
            path: 'list',
            name: 'RolesList',
            hidden: true,
            component: () => import('@/views/manage/roles/list'),
            meta: { title: '角色列表', activeMenu: '/manage/roles' }
          },
          {
            path: 'edit:id(\\d+)?',
            name: 'RolesEdit',
            hidden: true,
            component: () => import('@/views/manage/roles/edit'),
            meta: { title: '角色编辑', activeMenu: '/manage/roles' }
          },
          {
            path: 'detail:id(\\d+)?',
            name: 'RolesDetail',
            hidden: true,
            component: () => import('@/views/manage/roles/detail'),
            meta: { title: '角色详情', activeMenu: '/manage/roles' }
          }
        ]
      }, {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/manage/rules/list'),
        meta: { title: '权限配置' }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    alwaysShow: true,
    redirect: '/system/logisticTemplate',
    meta: { title: ' 系统设置', icon: 'system' },
    children: [
      {
        path: 'adsense',
        name: 'Adsense',
        component: () => import('@/views/systemSetup/adsense/index'),
        meta: { title: '广告位' }
      }, {
        path: 'resources',
        name: 'Resources',
        component: () => import('@/views/systemSetup/resources/index'),
        meta: { title: '资源管理' }
      }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置router
}

export default router
