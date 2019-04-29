import { localHttp } from '../../../services/http'

const ReportApi = {
  fetchPosts: page => {
    return localHttp.request({
      method: 'get',
      url: `/reports/posts?page=${page}`,
    })
  },
}

export default ReportApi
