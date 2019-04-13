import React from 'react'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { withLoading } from '../../../components/loading'
import { InlineName } from '../../../components/user'
import { paths } from '../../../config'
import { PostMedias } from '../../../components/post-medias'
import { FavoriteButton, ReplyButton } from '../../../components/post-actions'
import { Text, Ellipsis } from '../../../components/atomics'
import { RelativeTime } from '../../../components/relative-time'

import styles from './sub-replies.module.scss'
import PostApi from './post-api'
import PostResource from './post-resource'

class SubReplies extends React.PureComponent {
  state = {
    subReplies: [],
    page: 1,
    error: null,
    hasMore: true,
  }

  componentDidMount() {
    this.props.finishLoading()
  }

  loadSubReplies = async () => {
    const { parent, finishLoading, startLoading } = this.props
    const { page } = this.state
    startLoading()
    try {
      const { data } = await PostApi.fetchReplies(parent.id, page)
      this.setState(
        {
          subReplies: PostResource.Replies.parse(data),
          error: null,
          hasMore: data.length === 25,
        },
        finishLoading
      )
    } catch (error) {
      this.setState({ error: error }, finishLoading)
    }
  }

  handleChange = (id, newReply) => {
    this.setState(state => ({
      subReplies: state.subReplies.map(reply =>
        reply.id === id ? { ...reply, ...newReply } : reply
      ),
    }))
  }

  render() {
    const { parent, children, isLoading } = this.props
    const { hasMore, subReplies, error } = this.state

    if (parent.subRepliesCount === 0) {
      return null
    }

    return (
      <div>
        {children({
          subReplies,
          error,
          isLoading,
          handleChange: this.handleChange,
        })}
        {hasMore && (
          <div className={styles.hasMoreContainer}>
            <FontAwesomeIcon
              icon="ellipsis-h"
              className={styles.avatarConnectMore}
            />
            <Button
              block
              onClick={this.loadSubReplies}
              className={styles.hasMoreButton}
            >
              <FontAwesomeIcon icon="ellipsis-h" />
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default withLoading(SubReplies)

export class SubReply extends React.PureComponent {
  render() {
    const { subReply, replyTo, onChange, children } = this.props
    const { creator, content, createdAt } = subReply
    const { username, fullname } = creator

    return (
      <article className={styles.container}>
        <div className={styles.avatar}>
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

          <p>{content}</p>

          <PostMedias post={subReply} />

          <div className={styles.actions}>
            <FavoriteButton post={subReply} onChange={onChange} />
          </div>
        </div>
      </article>
    )
  }
}
