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
    path: '/shopManage',
    name: 'ShopManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/shopManage/shopList',
    meta: { title: '店铺管理', icon: 'shop' },
    children: [{
      path: 'shopList',
      name: 'ShopList',
      component: () => import('@/views/shopManage/shop/list'),
      alwaysShow: false,
      meta: { title: '店铺列表', noCache: false }
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
    path: '/finance',
    name: 'Finance',
    component: Layout,
    alwaysShow: true,
    redirect: '/finance/list',
    meta: { title: '财务管理', icon: 'finance' },
    children: [
      {
        path: 'list',
        name: 'FinanceList',
        component: () => import('@/views/finance/list'),
        meta: { title: '财务列表' }
      }
    ]
  },
  {
    path: '/figure',
    name: 'Figure',
    component: Layout,
    alwaysShow: true,
    redirect: '/figure/list',
    meta: { title: '花样管理', icon: 'figure' },
    children: [
      {
        path: 'list',
        name: 'FigureList',
        component: () => import('@/views/figure/index'),
        meta: { title: '花样列表' }
      }
    ]
  },
  {
    path: '/orderManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/orderManage/orderList',
    meta: { title: '订单管理', icon: 'order' },
    children: [{
      path: 'orderList',
      name: 'OrderList',
      component: () => import('@/views/orderManage/order/list'),
      meta: { title: '订单列表' }
    },
    {
      path: 'orderDetail:order_no(\\d+)?',
      name: 'OrderDetail',
      hidden: true,
      component: () => import('@/views/orderManage/order/detail'),
      meta: { title: '订单详情', activeMenu: '/orderManage/orderList' }
    }]
  },
  {
    path: '/designerManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/designerManage/designerTeam',
    meta: { title: '设计师管理', icon: 'designer' },
    children: [{
      path: 'designerTeam',
      name: 'DesignerTeam',
      component: () => import('@/views/designer/designerTeam/list'),
      meta: { title: '设计师团队' }
    }]
  },
  {
    path: '/fontLibrary',
    component: Layout,
    alwaysShow: true,
    redirect: '/fontLibrary/list',
    meta: { title: '字体库', icon: 'fontLib' },
    children: [{
      path: 'list',
      name: 'FontList',
      component: () => import('@/views/fontLibrary/list/index'),
      meta: { title: '字体列表' }
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
