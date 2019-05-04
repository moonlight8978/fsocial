import jwtDecode from 'jwt-decode'

const Session = {
  parse: data => {
    const { exp, id } = jwtDecode(data.token)
    return {
      id,
      role: data.role,
      token: data.token,
      expiredAt: exp * 1000,
    }
  },
}

export const AuthResources = {
  Session,
}
