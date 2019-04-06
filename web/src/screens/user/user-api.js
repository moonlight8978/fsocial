import { localHttp } from '../../services/http'

const UserApi = {
  fetch(username) {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}`,
    })
  },
}

export default UserApi
