import { localHttp } from '../../services/http'

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const MemoryPictureSchema = {
  parse: async file => ({
    picture_base64: await toBase64(file),
  }),
}

const MemorySchema = {
  parse: memory => ({
    content: memory.content,
    memory_taggings: memory.memoryTaggings.map(tagging => ({
      id: tagging.id,
      description: tagging.description,
    })),
    signed_blob_id: memory.signedBlobId,
  }),
}

const MemoryApi = {
  uploadPicture: async file => {
    return localHttp.request({
      method: 'post',
      url: '/memories/upload',
      data: { memory: await MemoryPictureSchema.parse(file) },
    })
  },
  fetchMemories: page => {
    return localHttp.request({
      method: 'get',
      url: `/memories?page=${page}`,
    })
  },
  createMemory: memory => {
    return localHttp.request({
      method: 'post',
      url: '/memories',
      data: { memory: MemorySchema.parse(memory) },
    })
  },
}

export default MemoryApi
