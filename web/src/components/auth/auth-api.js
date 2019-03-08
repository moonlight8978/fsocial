import { localHttp } from '../../services/http'
import { settings } from '../../config'

const User = {
  parse: ({ identity, password }) => ({ identity, password }),
}

export const AuthApi = {
  signIn: user => {
    return localHttp.request({
      method: 'post',
      url: '/sessions',
      headers: {
        [settings.server.authorizationHeader]: '',
      },
      data: { user: User.parse(user) },
    })
  },
}
