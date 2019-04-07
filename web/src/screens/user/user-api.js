import { localHttp } from '../../services/http'

const UserApi = {
  fetch(username) {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}`,
    })
  },
  fetchFollowees: (username, page) => {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}/followees?page=${page}`,
    })
  },
  fetchFollowers: (username, page) => {
    return localHttp.request({
      method: 'get',
      url: `/users/${username}/followers?page=${page}`,
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
