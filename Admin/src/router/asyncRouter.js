/* Layout */
import Layout from '@/layout'
export const asyncRouter = [

  {
    pid: 0,
    id: 2,
    path: '/shopManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/shopManage/shopList',
    meta: { title: '店铺管理', icon: 'shop' },
    children: [{
      pid: 2,
      id: 11,
      path: 'shopList',
      name: 'ShopList',
      component: () => import('@/views/shopManage/shop/list'),
      alwaysShow: false,
      meta: { title: '店铺列表', noCache: false }
    }]
  },
  {
    pid: 0,
    id: 3,
    path: '/member',
    component: Layout,
    alwaysShow: true,
    redirect: '/member/memberList',
    meta: { title: '会员管理', icon: 'member' },
    children: [{
      pid: 3,
      id: 12,
      path: 'memberList',
      name: 'MemberList',
      component: () => import('@/views/memberCenter/member/list'),
      alwaysShow: false,
      meta: { title: '会员列表', noCache: false }
    }]
  },
  {
    pid: 0,
    id: 10,
    path: '/finance',
    name: 'Finance',
    component: Layout,
    alwaysShow: true,
    redirect: '/finance/list',
    meta: { title: '财务管理', icon: 'finance' },
    children: [
      {
        pid: 10,
        id: 10,
        path: 'list',
        name: 'FinanceList',
        component: () => import('@/views/finance/list'),
        meta: { title: '财务列表' }
      }
    ]
  },
  {
    pid: 0,
    id: 10,
    path: '/figure',
    name: 'Figure',
    component: Layout,
    alwaysShow: true,
    redirect: '/figure/list',
    meta: { title: '花样管理', icon: 'figure' },
    children: [
      {
        pid: 10,
        id: 10,
        path: 'list',
        name: 'FigureList',
        component: () => import('@/views/figure/index'),
        meta: { title: '花样列表' }
      }
    ]
  },
  {
    pid: 0,
    id: 5,
    path: '/orderManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/orderManage/orderList',
    meta: { title: '订单管理', icon: 'order' },
    children: [{
      pid: 5,
      id: 18,
      path: 'orderList',
      name: 'OrderList',
      component: () => import('@/views/orderManage/order/list'),
      meta: { title: '订单列表' }
    },
    {
      pid: 5,
      id: 19,
      path: 'orderDetail:order_no(\\d+)?',
      name: 'OrderDetail',
      hidden: true,
      component: () => import('@/views/orderManage/order/detail'),
      meta: { title: '订单详情', activeMenu: '/orderManage/orderList' }
    }]
  },
  {
    pid: 0,
    id: 6,
    path: '/designerManage',
    component: Layout,
    alwaysShow: true,
    redirect: '/designerManage/designerTeam',
    meta: { title: '设计师管理', icon: 'designer' },
    children: [{
      pid: 6,
      id: 20,
      path: 'designerTeam',
      name: 'DesignerTeam',
      component: () => import('@/views/designer/designerTeam/list'),
      meta: { title: '设计师团队' }
    }]
  },
  {
    pid: 0,
    id: 7,
    path: '/fontLibrary',
    component: Layout,
    alwaysShow: true,
    redirect: '/fontLibrary/list',
    meta: { title: '字体库', icon: 'fontLib' },
    children: [{
      pid: 7,
      id: 21,
      path: 'list',
      name: 'FontList',
      component: () => import('@/views/fontLibrary/list/index'),
      meta: { title: '字体列表' }
    }]
  },
  {
    pid: 0,
    id: 8,
    path: '/system',
    component: Layout,
    alwaysShow: true,
    redirect: '/system/logisticTemplate',
    meta: { title: ' 设置', icon: 'system' },
    children: [
      {
        pid: 8,
        id: 22,
        path: '/machineManage',
        name: 'machineManage',
        component: () => import('@/views/systemSetup/machineManage/list'),
        meta: { title: '机器管理' }
      }, {
        pid: 8,
        id: 23,
        path: 'adsense',
        name: 'Adsense',
        component: () => import('@/views/systemSetup/adsense/index'),
        meta: { title: '广告位' }
      }, {
        pid: 8,
        id: 25,
        path: 'logisticTemplate',
        name: 'LogisticTemplate',
        component: () => import('@/views/systemSetup/logisticTemplate/list'),
        meta: { title: '物流模板' }
      },
      {
        pid: 8,
        id: 26,
        path: 'logisticTempEdit:id(\\d+)?',
        name: 'LogisticTempEdit',
        hidden: true,
        component: () => import('@/views/systemSetup/logisticTemplate/edit'),
        meta: { title: '物流模板编辑', activeMenu: '/system/logisticTemplate' }
      },
      {
        pid: 8,
        id: 27,
        path: 'embroidTemplate',
        name: 'EmbroidTemplate',
        component: () => import('@/views/systemSetup/embroidTemplate/index'),
        meta: { title: '刺绣模板' }
      }, {
        pid: 8,
        id: 28,
        path: 'platformSettings',
        name: 'PlatformSettings',
        component: () => import('@/views/systemSetup/platformSettings/index'),
        meta: { title: '平台设置' }
      }]
  }
]
