import axios from 'axios'

import { settings } from '../../config'
import { PersistedStorage } from '../persisted-storage'

function getHeaders(auth) {
  if (auth) {
    return {
      [settings.server.authorizationHeader]: [
        'Bearer',
        PersistedStorage.get('auth').token,
      ].join(' '),
      'Accept-Language': PersistedStorage.get('locale').currentLocale,
    }
  }

  return {
    'Accept-Language': PersistedStorage.get('locale').currentLocale,
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
