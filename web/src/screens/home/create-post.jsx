import React from 'react'

import { PostEditor } from '../../components/post-editor'
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

export const PostApi = {
  create: async post => {
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
  all: page => {
    return localHttp.request({
      method: 'get',
      url: '/posts',
      data: { page },
    })
  },
}

class CreatePost extends React.Component {
  constructor(props) {
    super(props)

    this.handleCreatePost = this.handleCreatePost.bind(this)
  }

  async handleCreatePost(post) {
    await PostApi.create(post)
  }

  render() {
    return this.props.children({ onSubmit: this.handleCreatePost })
  }
}

export default CreatePost
