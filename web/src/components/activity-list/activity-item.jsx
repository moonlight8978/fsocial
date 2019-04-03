import React from 'react'
import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <div>
          <InlineName username={creator.username} fullname={creator.fullname} />
          <Text color="secondary">&middot;</Text>
          <Text color="secondary">{createdAt}</Text>
        </div>

        <p>
          <Text>{content}</Text>
        </p>

        <div>
          {medias.map(media => (
            <img
              key={media.path}
              className={styles.media}
              alt={media.filename}
              src={media.url}
            />
          ))}
        </div>

        <div>
          <Button>
            <FontAwesomeIcon icon={['far', 'comment']} />
            25
          </Button>
          <Button>
            <FontAwesomeIcon icon="retweet" />
            25
          </Button>
          <Button>
            <FontAwesomeIcon icon={['far', 'heart']} />
            25
          </Button>
        </div>
      </div>
    </>
  )

  render() {
    const { activity } = this.props
    const { trackable, trackableType } = activity

    return (
      <div className={styles.container}>
        <div className={styles.contextIcon}>
          <FontAwesomeIcon icon="heart" />
        </div>
        <div className={styles.context}>
          <Text>context</Text>
        </div>

        {trackableType === 'Post' ? (
          <ActivityItem.Post post={trackable} />
        ) : null}

        {trackableType === 'Sharing' ? (
          <ActivityItem.Post post={trackable.post} />
        ) : null}

        {trackableType === 'Favorite' ? (
          <ActivityItem.Post post={trackable.post} />
        ) : null}
      </div>
    )
  }
}

export default ActivityItem
