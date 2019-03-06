import axios from 'axios'

import { settings } from '../../config'
import { PersistedStorage } from '../persisted-storage'

class LocalHttp {
  constructor() {
    this.axios = axios.create({
      baseURL: [settings.server.host, settings.server.prefix].join(''),
      headers: {
        [settings.server.authorizationHeader]: [
          'Bearer',
          PersistedStorage.get('auth').token,
        ].join(' '),
        'Accept-Language': PersistedStorage.get('locale').currentLocale,
      },
    })
  }
}

export default new LocalHttp()
