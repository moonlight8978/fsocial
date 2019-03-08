import axios from 'axios'

import { settings } from '../../config'
import { PersistedStorage } from '../persisted-storage'

function getHeaders() {
  return {
    [settings.server.authorizationHeader]: [
      'Bearer',
      PersistedStorage.get('auth').token,
    ].join(' '),
    'Accept-Language': PersistedStorage.get('locale').currentLocale,
  }
}

class LocalHttp {
  constructor() {
    this.axios = axios.create({
      baseURL: [settings.server.host, settings.server.prefix].join(''),
    })
  }

  request(config) {
    return this.axios.request({
      ...config,
      headers: {
        ...getHeaders(),
        ...config.headers,
      },
    })
  }
}

export default new LocalHttp()
