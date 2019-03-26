import React from 'react'

import { PostEditor } from '../../components/post-editor'
import { localHttp } from '../../services/http';

const PostSchema = {
  parse: async ({ content, medias }) => ({
    content,
    medias
  })
}

const PostApi = {
  create: post => {
    return localHttp.request({
      method: 'post',
      data:
    })
  }
}

class CreatePost extends React.Component {
  handleCreatePost(post) {

  }

  render() {

  }
}
