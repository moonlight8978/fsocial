import React from 'react'
import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { paths } from '../../../config'
import { AsyncUtils } from '../../../utils'
import { InlineName } from '../../user'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'
import { Activity } from '../activity-resource'

import Medias from './medias'
import PostApi from './post-api'
import styles from './post.module.scss'

class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
    showReplyModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isSharing: false,
      isFavoriting: false,
    }

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
    this.handleShareClick = this.handleShareClick.bind(this)
  }

  async handleFavoriteClick(post) {
    try {
      this.setState({ isFavoriting: true })
      if (post.isFavorited) {
        await this.handleUnfavorite(post)
      } else {
        await this.handleFavorite(post)
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isFavoriting: false })
    }
  }

  async handleFavorite(post) {
    const { data } = await PostApi.favorite(post.id)
    const { trackable } = Activity.parse(data)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isFavorited: trackable.post.isFavorited,
      favoritesCount: trackable.post.favoritesCount,
    })
  }

  async handleUnfavorite(post) {
    await PostApi.unfavorite(post.id)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isFavorited: false,
      favoritesCount: post.favoritesCount - 1,
    })
  }

  async handleShareClick(post) {
    try {
      this.setState({ isSharing: true })
      if (post.isShared) {
        await this.handleUnshare(post)
      } else {
        await this.handleShare(post)
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isSharing: false })
    }
  }

  async handleShare(post) {
    const { data } = await PostApi.share(post.id)
    const { trackable } = Activity.parse(data)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isShared: trackable.post.isShared,
      sharesCount: trackable.post.sharesCount,
    })
  }

  async handleUnshare(post) {
    await PostApi.unshare(post.id)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isShared: false,
      sharesCount: post.sharesCount - 1,
    })
  }

  render() {
    const { isSharing, isFavoriting } = this.state
    const { post, showReplyModal } = this.props
    const {
      id,
      medias,
      creator,
      content,
      createdAt,
      isFavorited,
      isShared,
      repliesCount,
      sharesCount,
      favoritesCount,
    } = post

    return (
      <>
        <div className={styles.avatar}>
          <Avatar size="large" src="/avatar-placeholder.png" />
        </div>

        <div className={styles.post}>
          <header>
            <Ellipsis className={styles.username}>
              <Link to={paths.user.resolve(creator)}>
                <InlineName
                  username={creator.username}
                  fullname={creator.fullname}
                />
              </Link>
            </Ellipsis>
            <Text color="secondary" className={styles.nameSplitter}>
              &middot;
            </Text>
            <Link to={paths.post.resolve({ username: creator.username, id })}>
              <Text color="secondary" hover hoverColor="link">
                <RelativeTime fromTime={createdAt} />
              </Text>
            </Link>
          </header>

          <p>
            <Text>{content}</Text>
          </p>

          <Medias medias={medias} />

          <div className={styles.actions}>
            <Button
              className={classnames(styles.actionButton, styles.replyButton)}
              onClick={() => showReplyModal(post)}
            >
              <Text color="secondary">
                <FontAwesomeIcon size="lg" icon={['far', 'comment']} />
                <span className={styles.actionCount}>{repliesCount}</span>
              </Text>
            </Button>
            <Button
              className={classnames(styles.actionButton, styles.shareButton, {
                [styles.shared]: isShared,
              })}
              onClick={() => this.handleShareClick(post)}
              disabled={isSharing}
            >
              <Text color="secondary">
                <FontAwesomeIcon
                  size="lg"
                  icon="retweet"
                  className={styles.retweetIcon}
                />
                <span className={styles.actionCount}>{sharesCount}</span>
              </Text>
            </Button>
            <Button
              className={classnames(
                styles.actionButton,
                styles.favoriteButton,
                { [styles.favorited]: isFavorited }
              )}
              onClick={() => this.handleFavoriteClick(post)}
              disabled={isFavoriting}
            >
              <Text color="secondary">
                <FontAwesomeIcon size="lg" icon={['far', 'heart']} />
                <span className={styles.actionCount}>{favoritesCount}</span>
              </Text>
            </Button>
          </div>
        </div>
      </>
    )
  }
}

export default Post
