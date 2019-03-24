import axios from 'axios'

import { settings } from '../../config'
import { UserPreferencesUtils } from '../../utils'
import { defaultLocale } from '../../components/locale'
import { PersistedStorage } from '../persisted-storage'

function getHeaders(auth) {
  if (auth) {
    return {
      [settings.server.authorizationHeader]: [
        'Bearer',
        PersistedStorage.get('auth').token,
      ].join(' '),
      'Accept-Language':
        PersistedStorage.get('locale').currentLocale ||
        UserPreferencesUtils.getBrowserLocale() ||
        defaultLocale,
    }
  }

  return {
    'Accept-Language':
      PersistedStorage.get('locale').currentLocale ||
      UserPreferencesUtils.getBrowserLocale() ||
      defaultLocale,
  }
}

class LocalHttp {
  constructor() {
    this.axios = axios.create({
      baseURL: [settings.server.host, settings.server.prefix].join(''),
    })
  }

  request(config, auth = true) {
    return this.axios.request({
      ...config,
      headers: {
        ...getHeaders(auth),
        ...config.headers,
      },
    })
  }
}

export default new LocalHttp()
