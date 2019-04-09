/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { RelativeTime } from '../relative-time'
import { PostEditor } from '../post-editor'
import { InlineName } from '../user'
import { Text, Ellipsis } from '../atomics'
import { paths } from '../../config'

import ReplyApi from './reply-api'
import styles from './reply-modal.module.scss'
import postStyles from './post.module.scss'
import { Activity } from './reply-resource'

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
    onCreate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      showModal: this.showModal.bind(this),
    }

    this.createReply = this.createReply.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleHideModal() {
    this.setState({ visible: false })
  }

  showModal(post) {
    this.setState({ post, visible: true })
  }

  async createReply(reply) {
    const { data } = await ReplyApi.createReply(this.state.post.id, reply)
    const activity = Activity.parse(data)
    this.props.onCreate(this.state.post, activity)
    this.timeout = setTimeout(this.handleHideModal, 50)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, ...rest } = this.props
    const { visible, post } = this.state

    return (
      <ReplyContext.Provider value={this.state} {...rest}>
        <Modal
          title={visible ? `Reply to ${post.creator.fullname}` : ''}
          visible={visible}
          onCancel={this.handleHideModal}
          footer={null}
          className={styles.modal}
        >
          {visible && (
            <div className={styles.modalBody}>
              <article className={postStyles.container}>
                <div className={postStyles.colLeft}>
                  <Avatar src="/avatar-placeholder.png" size={40} />
                </div>

                <div className={postStyles.colRight}>
                  <header className={postStyles.header}>
                    <Ellipsis className={postStyles.names}>
                      <Link
                        to={paths.user.resolve({
                          username: post.creator.username,
                        })}
                      >
                        <InlineName
                          username={post.creator.username}
                          fullname={post.creator.fullname}
                        />
                        <Text color="secondary" className={styles.middot}>
                          &middot;
                        </Text>
                      </Link>
                    </Ellipsis>
                    <Text color="secondary">
                      <RelativeTime fromTime={post.createdAt} />
                    </Text>
                  </header>

                  <p>{post.content}</p>
                </div>
              </article>

              <PostEditor
                submitText="Reply"
                placeholder="Publish your reply"
                collapsible={false}
                onSubmit={this.createReply}
                context={
                  <div className={styles.replyContext}>
                    <Text color="secondary">
                      Replying to {post.creator.fullname}
                    </Text>
                  </div>
                }
              />
            </div>
          )}
        </Modal>
        {children}
      </ReplyContext.Provider>
    )
  }
}
