import { localHttp } from '../../../services/http'

const ReportSchema = {
  parse: () => ({
    message: null,
  }),
}

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
  report: async id => {
    return localHttp.request({
      method: 'post',
      url: `/posts/${id}/report`,
      data: { report: ReportSchema.parse() },
    })
  },
}
