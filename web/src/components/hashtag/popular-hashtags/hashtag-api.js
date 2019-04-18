import { localHttp } from '../../../services/http'

const HashtagApi = {
  fetchPopularHashtags() {
    return localHttp.request(
      {
        method: 'get',
        url: '/hashtags/popular',
      },
      false
    )
  },
}

export default HashtagApi
