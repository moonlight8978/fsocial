import { localHttp } from '../../services/http'

const ActivityApi = {
  fetch: page => {
    return localHttp.request({
      method: 'get',
      url: `/profile/activities?page=${page}`,
    })
  },
}

export default ActivityApi
