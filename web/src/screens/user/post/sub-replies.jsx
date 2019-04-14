import React from 'react'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import {
  withLoading,
  LoadingPropTypes,
  FluidLoading,
} from '../../../components/loading'
import { InlineName } from '../../../components/user'
import { paths } from '../../../config'
import { PostMedias } from '../../../components/post-medias'
import { FavoriteButton } from '../../../components/post-actions'
import { Text, Ellipsis } from '../../../components/atomics'
import { RelativeTime } from '../../../components/relative-time'

import styles from './sub-replies.module.scss'
import PostApi from './post-api'
import PostResource from './post-resource'

class SubReplies extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    parent: PropTypes.shape().isRequired,
  }

  state = {
    page: 0,
    isLastPage: false,
    isEmpty: this.props.parent.subRepliesCount === 0,
  }

  componentDidMount() {
    this.props.finishLoading()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.fetchReplies()
    }
  }

  fetchReplies = async () => {
    this.props.startLoading()
    const { parent, finishLoading, setSubReplies } = this.props
    const { page } = this.state
    try {
      const { data } = await PostApi.fetchReplies(parent.id, page)
      setSubReplies(parent.id, PostResource.Replies.parse(data))
      this.setState({ isLastPage: data.length < 25 })
      finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  loadMore = () => this.setState(state => ({ page: state.page + 1 }))

  render() {
    const { parent, children, isLoading } = this.props
    const { isLastPage, isEmpty } = this.state

    if (parent.subRepliesCount === 0) {
      return null
    }

    return (
      <div>
        {children}
        {isLoading && <FluidLoading />}
        {!isEmpty && !isLastPage && (
          <div className={styles.hasMoreContainer}>
            <FontAwesomeIcon
              icon="ellipsis-h"
              className={styles.avatarConnectMore}
            />
            <Button
              block
              onClick={this.loadMore}
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
  static propTypes = {
    subReply: PropTypes.shape().isRequired,
    replyTo: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { subReply, replyTo, onChange } = this.props
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
              <FormattedMessage id="user.post.reply.context" />{' '}
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