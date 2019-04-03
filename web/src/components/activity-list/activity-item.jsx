import React from 'react'
import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import { InlineName } from '../user'
import { Text } from '../atomics'

import styles from './activity-item.module.scss'

class ActivityItem extends React.Component {
  static propTypes = {
    activity: PropTypes.shape({
      trackable: PropTypes.shape().isRequired,
    }).isRequired,
  }

  static Post = ({ post: { medias, creator, content, createdAt } }) => (
    <>
      <div className={styles.avatar}>
        <Avatar size="large" src="/avatar-placeholder.png" />
      </div>

      <div className={styles.post}>
        <header>
          <InlineName username={creator.username} fullname={creator.fullname} />
          <Text color="secondary">&middot;</Text>
          <Text color="secondary">{createdAt}</Text>
        </header>

        <p>
          <Text>{content}</Text>
        </p>

        {medias.length > 0 && (
          <figure>
            {medias.map(media => (
              <img
                key={media.path}
                className={styles.media}
                alt={media.filename}
                src={media.url}
              />
            ))}
          </figure>
        )}

        <div className={styles.actions}>
          <Button
            className={classnames(styles.actionButton, styles.replyButton)}
          >
            <Text color="secondary">
              <FontAwesomeIcon size="lg" icon={['far', 'comment']} />
              <span className={styles.actionCount}>25</span>
            </Text>
          </Button>
          <Button
            className={classnames(styles.actionButton, styles.retweetButton)}
          >
            <Text color="secondary">
              <FontAwesomeIcon size="lg" icon="retweet" />
              <span className={styles.actionCount}>25</span>
            </Text>
          </Button>
          <Button
            className={classnames(styles.actionButton, styles.favoriteButton)}
          >
            <Text color="secondary">
              <FontAwesomeIcon size="lg" icon={['far', 'heart']} />
              <span className={styles.actionCount}>25</span>
            </Text>
          </Button>
        </div>
      </div>
    </>
  )

  static PostContext = ({ trackableType, creator }) => {
    if (trackableType === 'Post') {
      return null
    }

    if (trackableType === 'Sharing') {
      return (
        <>
          <div className={styles.contextIcon}>
            <FontAwesomeIcon icon="retweet" />
          </div>
          <div className={styles.context}>
            <Text>{creator.fullname} shared a post.</Text>
          </div>
        </>
      )
    }

    if (trackableType === 'Favorite') {
      return (
        <>
          <div className={styles.contextIcon}>
            <FontAwesomeIcon icon="heart" />
          </div>
          <div className={styles.context}>
            <Text>{creator.fullname} favorited a post.</Text>
          </div>
        </>
      )
    }
  }

  render() {
    const { activity } = this.props
    const { trackable, trackableType } = activity

    return (
      <article className={styles.container}>
        <ActivityItem.PostContext
          trackableType={trackableType}
          creator={trackable.creator}
        />

        {trackableType === 'Post' ? (
          <ActivityItem.Post post={trackable} />
        ) : null}

        {trackableType === 'Sharing' ? (
          <ActivityItem.Post post={trackable.post} />
        ) : null}

        {trackableType === 'Favorite' ? (
          <ActivityItem.Post post={trackable.post} />
        ) : null}
      </article>
    )
  }
}

export default ActivityItem
