/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

import { PostEditor } from '../post-editor'
import { Text } from '../atomics'

import ReplyApi from './reply-api'
import Post from './post'
import { Activity } from './reply-resource'
import styles from './reply-modal.module.scss'

const initialState = {
  post: {},
  setPost: () => {},
  createReply: () => {},
  visible: false,
}

export const ReplyContext = React.createContext(initialState)

export const ReplyConsumer = ReplyContext.Consumer

class ReplyProviderPure extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onCreate: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
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
    const { children, intl, ...rest } = this.props
    const { visible, post } = this.state

    return (
      <ReplyContext.Provider value={this.state} {...rest}>
        <Modal
          title={
            visible
              ? intl.formatMessage(
                  { id: 'reply.modalTitle' },
                  { fullname: post.creator.fullname }
                )
              : ''
          }
          visible={visible}
          onCancel={this.handleHideModal}
          footer={null}
          className={styles.modal}
        >
          {visible && (
            <div className={styles.modalBody}>
              <Post post={post} />

              <PostEditor
                submitText={intl.formatMessage({ id: 'reply.submit' })}
                placeholder={intl.formatMessage({ id: 'reply.placeholder' })}
                collapsible={false}
                onSubmit={this.createReply}
                context={
                  <div className={styles.replyContext}>
                    <Text color="secondary">
                      <FormattedMessage
                        id="reply.context"
                        values={{ fullname: post.creator.fullname }}
                      />
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

export const ReplyProvider = injectIntl(ReplyProviderPure)
