import defaultSettings from '@/settings'

const title = defaultSettings.title || '越看越想看'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
