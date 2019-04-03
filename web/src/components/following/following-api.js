import { localHttp } from '../../services/http'

export const FollowingApi = {
  follow: user => {
    return localHttp.request({
      method: 'post',
      url: `/users/${user.username}/follow`,
    })
  },
  unfollow: user => {
    return localHttp.request({
      method: 'delete',
      url: `/users/${user.username}/unfollow`,
    })
  },
}
