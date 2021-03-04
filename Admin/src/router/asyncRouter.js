/* Layout */
import Layout from '@/layout'
export const asyncRouter = [
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
    component: Layout,
    alwaysShow: true,
    redirect: '/system/logisticTemplate',
    meta: { title: ' 设置', icon: 'system' },
    children: [
      {
        path: '/machineManage',
        name: 'machineManage',
        component: () => import('@/views/systemSetup/machineManage/list'),
        meta: { title: '机器管理' }
      }, {
        path: 'adsense',
        name: 'Adsense',
        component: () => import('@/views/systemSetup/adsense/index'),
        meta: { title: '广告位' }
      }, {
        path: 'logisticTemplate',
        name: 'LogisticTemplate',
        component: () => import('@/views/systemSetup/logisticTemplate/list'),
        meta: { title: '物流模板' }
      },
      {
        path: 'logisticTempEdit:id(\\d+)?',
        name: 'LogisticTempEdit',
        hidden: true,
        component: () => import('@/views/systemSetup/logisticTemplate/edit'),
        meta: { title: '物流模板编辑', activeMenu: '/system/logisticTemplate' }
      },
      {
        path: 'embroidTemplate',
        name: 'EmbroidTemplate',
        component: () => import('@/views/systemSetup/embroidTemplate/index'),
        meta: { title: '刺绣模板' }
      }, {
        path: 'platformSettings',
        name: 'PlatformSettings',
        component: () => import('@/views/systemSetup/platformSettings/index'),
        meta: { title: '平台设置' }
      }]
  }
]
