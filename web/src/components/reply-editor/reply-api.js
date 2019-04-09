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

const ReplyApi = {
  createReply: async (postId, reply) => {
    try {
      return localHttp.request({
        method: 'post',
        data: { reply: await PostSchema.parse(reply) },
        url: `/posts/${postId}/replies`,
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default ReplyApi
