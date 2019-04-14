import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button } from 'antd'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import {
  withLoading,
  FluidLoading,
  LoadingPropTypes,
} from '../../../components/loading'
import { InlineName } from '../../../components/user'
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
    ...LoadingPropTypes,
    reply: PropTypes.shape().isRequired,
    showReplyModal: PropTypes.func.isRequired,
  }

  showReplyModal = () => {
    const { showReplyModal, reply } = this.props
    showReplyModal(reply)
  }

  render() {
    const { reply, replyTo, onChange, children } = this.props
    const { creator, content, subRepliesCount, createdAt } = reply
    const { username, fullname } = creator

    return (
      <div className={styles.listItem}>
        <article className={styles.inner}>
          <div
            className={classnames(styles.avatar, {
              [styles.avatarConnect]: subRepliesCount > 0,
            })}
          >
            <Avatar src="/avatar-placeholder.png" size={50} />
          </div>

          <div className={styles.reply}>
            <header>
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
