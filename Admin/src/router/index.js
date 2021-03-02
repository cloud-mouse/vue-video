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
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
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
            name: 'RolesEdit',
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
