import { localHttp } from '../../../services/http'

const PostApi = {
  favorite: id => {
    return localHttp.request({
      method: 'post',
      url: `/posts/${id}/favorite`,
    })
  },
  share: id => {
    return localHttp.request({
      method: 'post',
      url: `/posts/${id}/sharing`,
    })
  },
  unfavorite: id => {
    return localHttp.request({
      method: 'delete',
      url: `/posts/${id}/favorite`,
    })
  },
  unshare: id => {
    return localHttp.request({
      method: 'delete',
      url: `/posts/${id}/sharing`,
    })
  },
}

export default PostApi
