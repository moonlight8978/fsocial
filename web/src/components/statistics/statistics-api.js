import { localHttp } from '../../services/http'

export const StatisticsApi = {
  fetchStatistics(id) {
    return localHttp.request({
      url: `/users/${id}/statistics`,
      method: 'get',
    })
  },
}
