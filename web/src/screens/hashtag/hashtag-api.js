import { localHttp } from '../../services/http'

const HashtagApi = {
  fetch: (slug, page) => {
    return localHttp.request({
      method: 'get',
      url: `/hashtags/${slug}`,
    })
  },
}

export default HashtagApi
