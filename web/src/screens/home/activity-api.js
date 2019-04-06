import { localHttp } from '../../services/http'

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const PostSchema = {
  parse: async ({ content, medias }) => ({
    content,
    medias_base64: await Promise.all(medias.map(media => toBase64(media))),
  }),
}

const ActivityApi = {
  createPost: async post => {
    try {
      return localHttp.request({
        method: 'post',
        data: { post: await PostSchema.parse(post) },
        url: '/posts',
      })
    } catch (error) {
      console.log(error)
    }
  },
  fetch: page => {
    return localHttp.request({
      method: 'get',
      url: `/profile/activities?page=${page}`,
    })
  },
}

export default ActivityApi
