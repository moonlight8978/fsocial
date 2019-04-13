import React from 'react'
import _ from 'lodash'

import selectors from './post-selectors'

const initialState = {
  post: {},
  replies: [],
  subRepliesHash: {},
  setPost: () => {},
  setReplies: () => {},
  changeReply: () => {},
  setSubReplies: () => {},
  changeSubReply: () => {},
}

const PostContext = React.createContext(initialState)

export const PostConsumer = PostContext.Consumer

export class PostProvider extends React.PureComponent {
  state = {
    ...initialState,
    setPost: this.setPost.bind(this),
    setReplies: this.setReplies.bind(this),
    changeReply: this.changeReply.bind(this),
    setSubReplies: this.setSubReplies.bind(this),
    changeSubReply: this.changeSubReply.bind(this),
  }

  setPost(newPost) {
    this.setState(state => ({
      post: {
        ...state.post,
        ...newPost,
      },
    }))
  }

  setReplies(newReplies, position = 'after') {
    const { replies } = this.state
    let newState

    if (position === 'before') {
      newState = [...newReplies, ...replies]
    } else {
      newState = [...replies, ...newReplies]
    }

    this.setState({
      replies: _.uniqBy(newState, 'id'),
    })
  }

  changeReply(id, newReply) {
    this.setState(state => ({
      replies: state.replies.map(reply =>
        reply.id === id ? { ...reply, ...newReply } : reply
      ),
    }))
  }

  setSubReplies(parentId, newReplies, position = 'after') {
    const key = parentId.toString()
    const oldSubReplies = selectors.getSubReplies(parentId)(this.state)
    let newState

    if (position === 'before') {
      newState = [...newReplies, ...oldSubReplies]
    } else {
      newState = [...oldSubReplies, ...newReplies]
    }

    this.setState(state => ({
      subRepliesHash: {
        ...state.subRepliesHash,
        [key]: _.uniqBy(newState, 'id'),
      },
    }))
  }

  changeSubReply(parentId, id, newReply) {
    const key = parentId.toString()
    const oldSubReplies = selectors.getSubReplies(parentId)(this.state)

    this.setState(state => ({
      subRepliesHash: {
        ...state.subRepliesHash,
        [key]: oldSubReplies.map(reply =>
          reply.id === id ? { ...reply, ...newReply } : reply
        ),
      },
    }))
  }

  render() {
    return <PostContext.Provider value={this.state} {...this.props} />
  }
}
