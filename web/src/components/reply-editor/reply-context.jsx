/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar } from 'antd'

import { RelativeTime } from '../relative-time'
import { PostEditor } from '../post-editor'
import { InlineName } from '../user'

import styles from './reply-modal.module.scss'

const initialState = {
  post: {},
  setPost: () => {},
  createReply: () => {},
  visible: false,
}

export const ReplyContext = React.createContext(initialState)

export const ReplyConsumer = ReplyContext.Consumer

export class ReplyProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      showModal: this.showModal.bind(this),
    }
  }

  handleOk = () => {
    this.setState({ confirmLoading: true })
    setTimeout(() => {
      this.setState({ visible: false, confirmLoading: false })
    }, 2000)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal(post) {
    this.setState({ post, visible: true })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, ...rest } = this.props
    const { visible, confirmLoading, post } = this.state

    return (
      <ReplyContext.Provider value={this.state} {...rest}>
        <Modal
          title={visible ? `Reply to ${post.creator.fullname}` : ''}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
          className={styles.modal}
        >
          {visible && (
            <div>
              <article>
                <Avatar src="/avatar-placeholder.png" size={40} />
                <InlineName
                  username={post.creator.username}
                  fullname={post.creator.fullname}
                />
                <span>&middot;</span>
                <br />
                <RelativeTime fromTime={post.createdAt} />
                <br />
                {post.content}
              </article>

              <PostEditor submitText="Reply" placeholder="Publish your reply" />
            </div>
          )}
        </Modal>
        {children}
      </ReplyContext.Provider>
    )
  }
}
