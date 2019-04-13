import React from 'react'

const initialState = {
  post: {},
  replies: [],
  subRepliesHash: {},
  setPost: () => {},
  setReplies: () => {},
  changeReply: () => {},
  setSubReplies: () => {},
  changeSubReplies: () => {},
}

const selectors = {
  getSubReplies: parentId => state =>
    state.subRepliesHash[parentId.toString()] || [],
}

const PostContext = React.createContext(initialState)

export const PostConsumer = PostContext.Consumer

export class PostProvider extends React.PureComponent {
  state = {
    ...initialState,
    setPost: this.setPost,
    setReplies: this.setReplies,
    changeReply: this.changeReply,
    setSubReplies: this.setSubReplies,
    changeSubReplies: this.changeSubReplies,
  }

  setPost = newPost => {
    this.setState(state => ({
      post: {
        ...state.post,
        ...newPost,
      },
    }))
  }

  setReplies = (newReplies, position = 'after') => {
    const { replies } = this.state
    let newState

    if (position === 'before') {
      newState = [...newReplies, ...replies]
    } else {
      newState = [...replies, ...newReplies]
    }

    this.setState({
      replies: newState,
    })
  }

  changeReply = (id, newReply) => {
    this.setState(state => ({
      replies: state.replies.map(reply =>
        reply.id === id ? { ...reply, ...newReply } : reply
      ),
    }))
  }

  setSubReplies = (parentId, newReplies, position = 'after') => {
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
        ...state.subReplies,
        [key]: newState,
      },
    }))
  }

  changeSubReply = (parentId, id, newReply) => {
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
