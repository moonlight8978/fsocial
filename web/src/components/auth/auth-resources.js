import jwtDecode from 'jwt-decode'

const CurrentUser = {
  parse: data => ({
    id: data.id,
    fullname: data.fullname,
    role: data.role,
    language: data.language,
    username: data.username,
    email: data.email,
    gender: data.gender,
    birthday: new Date(data.birthday).getTime(),
    description: data.description || '',
  }),
}

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
  CurrentUser,
}
