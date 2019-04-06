import { localHttp } from '../../../services/http'

const UserApi = {
  all(username) {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}/activities`,
    })
  },
}

const UserActivitiesApi = {
  all: username => page => {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}/activities?page=${page}`,
    })
  },
}

export { UserApi, UserActivitiesApi }
