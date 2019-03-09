import { localHttp } from '../../services/http'

const SessionSchema = {
  parse: ({ identity, password }) => ({ identity, password }),
}

const RegistrationSchema = {
  parse: ({ email, password, username }) => ({ email, password, username }),
}

export const AuthApi = {
  signIn: user => {
    return localHttp.request(
      {
        method: 'post',
        url: '/sessions',
        data: { user: SessionSchema.parse(user) },
      },
      false
    )
  },
  register: user => {
    return localHttp.request(
      {
        method: 'post',
        url: '/users',
        data: { user: RegistrationSchema.parse(user) },
      },
      false
    )
  },
}
