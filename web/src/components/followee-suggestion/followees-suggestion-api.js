import { localHttp } from '../../services/http'

export const FolloweesSuggestionApi = {
  fetchFollowees: () => {
    return localHttp.request({
      method: 'get',
      url: '/profile/followees_suggestion',
    })
  },
}
