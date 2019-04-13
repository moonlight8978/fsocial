import React from 'react'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { withLoading } from '../../../components/loading'
import { InlineName } from '../../../components/user'
import { paths } from '../../../config'
import { PostMedias } from '../../../components/post-medias'
import { FavoriteButton, ReplyButton } from '../../../components/post-actions'
import { Text } from '../../../components/atomics'

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

  render() {
    const { parent, children, isLoading } = this.props
    const { hasMore, subReplies, error } = this.state

    if (parent.subRepliesCount === 0) {
      return null
    }

    return (
      <div>
        {children({ subReplies, error, isLoading })}
        {hasMore && (
          <Button onClick={this.loadSubReplies}>Show more reply</Button>
        )}
      </div>
    )
  }
}

export default withLoading(SubReplies)

export class SubReply extends React.PureComponent {
  render() {
    const { subReply, replyTo, onChange, children } = this.props
    const { creator, content } = subReply
    const { username, fullname } = creator

    return (
      <article>
        <div className={styles.avatar}>
          <Avatar src="/avatar-placeholder.png" size={50} />
        </div>

        <div className={styles.reply}>
          <header>
            <Link to={paths.user.resolve({ username })}>
              <InlineName fullname={fullname} username={username} />
            </Link>
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
