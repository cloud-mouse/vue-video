import defaultSettings from '@/settings'

const title = defaultSettings.title || '影视大全'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
