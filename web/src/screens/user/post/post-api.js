import { localHttp } from '../../../services/http'

export default {
  fetch: id => {
    return localHttp.request({
      method: 'get',
      url: `/posts/${id}`,
    })
  },
  fetchReplies: (id, page) => {
    return localHttp.request({
      method: 'get',
      url: `/posts/${id}/replies?page=${page}`,
    })
  },
  delete: id => {
    return localHttp.request({
      method: 'delete',
      url: `/posts/${id}`,
    })
  },
}
