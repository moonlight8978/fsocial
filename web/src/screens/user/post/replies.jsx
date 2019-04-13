import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import classnames from 'classnames'

import { withLoading } from '../../../components/loading'
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
                Replying to{' '}
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
  state = {
    page: 1,
    error: null,
    replies: [],
  }

  async componentDidMount() {
    const { post, finishLoading } = this.props
    const { page } = this.state
    try {
      const { data } = await PostApi.fetchReplies(post.id, page)
      this.setState(
        { replies: PostResource.Replies.parse(data), error: null },
        finishLoading
      )
      finishLoading()
    } catch (error) {
      this.setState({ error: null }, finishLoading)
    }
  }

  changeReply = (id, newReply) => {
    this.setState(state => ({
      replies: state.replies.map(reply =>
        reply.id === id ? { ...reply, ...newReply } : reply
      ),
    }))
  }

  render() {
    const { children, isLoading, post } = this.props
    const { error, replies } = this.state

    if (post.repliesCount === 0) {
      return null
    }

    return children({
      isLoading,
      error,
      replies,
      handleChange: this.changeReply,
    })
  }
}

export default withLoading(Replies)
