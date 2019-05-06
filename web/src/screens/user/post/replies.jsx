import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Dropdown } from 'antd'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import {
  withLoading,
  FluidLoading,
  LoadingPropTypes,
} from '../../../components/loading'
import { InlineName, User } from '../../../components/user'
import { paths } from '../../../config'
import { PostMedias } from '../../../components/post-medias'
import { FavoriteButton, ReplyButton } from '../../../components/post-actions'
import { Text, Ellipsis } from '../../../components/atomics'
import { RelativeTime } from '../../../components/relative-time'

import PostApi from './post-api'
import styles from './reply.module.scss'
import PostResource from './post-resource'

export class Reply extends React.PureComponent {
  static propTypes = {
    reply: PropTypes.shape().isRequired,
    root: PropTypes.shape().isRequired,
    replyTo: PropTypes.shape().isRequired,
    showReplyModal: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    setPost: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  handleRemove = async () => {
    const { onRemove, reply, setPost, root } = this.props
    const { id } = reply
    try {
      await PostApi.delete(id)
      onRemove(id)
      setPost({ repliesCount: root.repliesCount - 1 })
    } catch (error) {
      console.log(error)
    }
  }

  handleReport = async () => {
    const { reply } = this.props
    try {
      await PostApi.report(reply.id)
    } catch (error) {
      console.log(error)
    }
  }

  showReplyModal = () => {
    const { showReplyModal, reply } = this.props
    showReplyModal(reply)
  }

  render() {
    const { reply, replyTo, onChange, children } = this.props
    const { creator, content, subRepliesCount, createdAt, canDestroy } = reply
    const { username, fullname } = creator

    return (
      <div className={styles.listItem}>
        <article className={styles.inner}>
          <div
            className={classnames(styles.avatar, {
              [styles.avatarConnect]: subRepliesCount > 0,
            })}
          >
            <User.Avatar user={creator} size={50} />
          </div>

          <div className={styles.reply}>
            <header className={styles.header}>
              <Ellipsis className={styles.names}>
                <Link to={paths.user.resolve({ username })}>
                  <InlineName fullname={fullname} username={username} />
                </Link>
              </Ellipsis>

              <Text color="secondary">
                <InlineName.Middot />
              </Text>

              <Text color="secondary">
                <RelativeTime fromTime={createdAt} />
              </Text>

              <div className={styles.dropdown}>
                <Dropdown
                  overlay={
                    <Menu>
                      {canDestroy && (
                        <Menu.Item key="remove" onClick={this.handleRemove}>
                          <Text>
                            <FormattedMessage id="user.post.replyList.delete" />
                          </Text>
                        </Menu.Item>
                      )}
                      <Menu.Item key="report" onClick={this.handleReport}>
                        <Text>
                          <FormattedMessage id="user.post.replyList.report" />
                        </Text>
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="ant-dropdown-link" href="#">
                    {' '}
                    <Text color="secondary" hover hoverColor="link">
                      <FontAwesomeIcon icon="angle-down" />
                    </Text>
                  </a>
                </Dropdown>
              </div>
            </header>

            <div>
              <Text color="secondary">
                <FormattedMessage id="user.post.reply.context" />{' '}
                <Link to={paths.user.resolve({ username: replyTo.username })}>
                  @{replyTo.username}
                </Link>
              </Text>
            </div>

            <p>
              <Text>{content}</Text>
            </p>

            <PostMedias post={reply} />

            <div className={styles.actions}>
              <ReplyButton post={reply} showReplyModal={this.showReplyModal}>
                {subRepliesCount}
              </ReplyButton>
              <FavoriteButton post={reply} onChange={onChange} />
            </div>
          </div>
        </article>

        <div className={styles.subReplies}>{children}</div>
      </div>
    )
  }
}

class Replies extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    post: PropTypes.shape().isRequired,
    setReplies: PropTypes.func.isRequired,
  }

  state = {
    page: 1,
    isLastPage: false,
  }

  componentDidMount() {
    this.fetchReplies()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.props.startLoading()
      this.fetchReplies()
    }
  }

  fetchReplies = async () => {
    const { finishLoading, setReplies, post } = this.props
    const { page } = this.state
    try {
      const { data: replies } = await PostApi.fetchReplies(post.id, page)
      setReplies(PostResource.Replies.parse(replies))
      this.setState({ isLastPage: replies.length < 25 })
      finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }))
  }

  render() {
    const { children, isLoading } = this.props
    const { isLastPage } = this.state

    return (
      <>
        {children}
        {isLoading && <FluidLoading />}
        {!isLoading && (
          <Button
            onClick={this.handleLoadMore}
            htmlType="button"
            type="primary"
            className={styles.buttonLoadMore}
            block
            disabled={isLastPage}
          >
            {isLastPage ? (
              <>
                <FontAwesomeIcon icon="angle-up" />
                <span>&nbsp;</span>
                <FormattedMessage id="user.post.replyList.lastPage" />
                <span>&nbsp;</span>
                <FontAwesomeIcon icon="angle-up" />
              </>
            ) : (
              <FontAwesomeIcon icon="ellipsis-h" />
            )}
          </Button>
        )}
      </>
    )
  }
}

export default withLoading(Replies)
