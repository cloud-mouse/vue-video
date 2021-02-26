import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import getPageTitle from '@/utils/get-page-title'

// const whiteList = ['/login']

NProgress.configure({
  showSpinner: false
}) // NProgress配置

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  next()
  NProgress.done()
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
