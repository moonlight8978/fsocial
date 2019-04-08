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
import { ActivityListConsumer } from '../activity-list-context'

import Medias from './medias'
import PostApi from './post-api'
import styles from './post.module.scss'

class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isSharing: false,
      isFavoriting: false,
    }

    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  async handleFavorite(post) {
    try {
      this.setState({ isFavoriting: true })
      const response = await (post.isFavorited
        ? PostApi.unfavorite(post.id)
        : PostApi.favorite(post.id))
      await AsyncUtils.delay(500)
      const { onChange } = this.props
      onChange(post.id, {
        ...post,
        isFavorited:
          response.status === 201 || response.status === 200
            ? !post.isFavorited
            : true,
        favoritesCount:
          response.status === 201 || response.status === 200
            ? post.favoritesCount + (post.isFavorited ? -1 : 1)
            : post.favoritesCount,
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isFavoriting: false })
    }
  }

  async handleShare(post) {
    try {
      this.setState({ isSharing: true })
      const response = await (post.isShared
        ? PostApi.unshare(post.id)
        : PostApi.share(post.id))
      await AsyncUtils.delay(500)
      const { onChange } = this.props
      onChange(post.id, {
        ...post,
        isShared:
          response.status === 201 || response.status === 200
            ? !post.isShared
            : true,
        sharesCount:
          response.status === 201 || response.status === 200
            ? post.sharesCount + (post.isShared ? -1 : 1)
            : post.sharesCount,
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isSharing: false })
    }
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
              onClick={() => this.handleShare(post)}
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
              onClick={() => this.handleFavorite(post)}
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

export default props => (
  <ActivityListConsumer>
    {({ changePost }) => <Post {...props} onChange={changePost} />}
  </ActivityListConsumer>
)
