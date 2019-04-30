import { localHttp } from '../../../services/http'

const ReportApi = {
  fetchPosts: page => {
    return localHttp.request({
      method: 'get',
      url: `/reports/posts?page=${page}`,
    })
  },
  deleteReport: postId => {
    return localHttp.request({
      method: 'delete',
      url: `/posts/${postId}/reports`,
    })
  },
  deletePost: id => {
    return localHttp.request({
      method: 'delete',
      url: `/posts/${id}`,
    })
  },
}

export default ReportApi
