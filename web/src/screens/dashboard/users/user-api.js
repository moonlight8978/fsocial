import { localHttp } from '../../../services/http'

const UserSchema = {
  parse: user => ({
    role: user.role,
  }),
}

const UserApi = {
  fetchUsers: ({ q }) => page => {
    return localHttp.request({
      method: 'get',
      url: `/admin/users?page=${page}&q=${q}`,
    })
  },
  update: (slug, user) => {
    return localHttp.request({
      method: 'put',
      url: `/admin/users/${slug}`,
      data: { user: UserSchema.parse(user) },
    })
  },
}

export default UserApi
