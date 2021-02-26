import defaultSettings from '@/settings'

const title = defaultSettings.title || '看书吧'

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
