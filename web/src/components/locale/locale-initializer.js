import i18n from 'i18next'

import { defaultLocale } from './locale.constant'
import { translations } from './translations'

i18n.init({
  lng: defaultLocale,
  resources: translations,
})

export { i18n }
