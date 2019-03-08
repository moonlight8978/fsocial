import { localHttp } from '../../services/http'
import { settings } from '../../config'

const SessionSchema = {
  parse: ({ identity, password }) => ({ identity, password }),
}

const RegistrationSchema = {
  parse: ({ email, password, username }) => ({ email, password, username }),
}

export const AuthApi = {
  signIn: user => {
    return localHttp.request({
      method: 'post',
      url: '/sessions',
      headers: {
        [settings.server.authorizationHeader]: '',
      },
      data: { user: SessionSchema.parse(user) },
    })
  },
  register: user => {
    return localHttp.request({
      method: 'post',
      url: '/users',
      data: { user: RegistrationSchema.parse(user) },
    })
  },
}
