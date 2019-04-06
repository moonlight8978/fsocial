import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Text } from '../atomics'

import { Post, PostApi } from './post'
import { ActivityListConsumer } from './activity-list-context'
import styles from './activity-item.module.scss'

class ActivityItem extends React.Component {
  static propTypes = {
    activity: PropTypes.shape({
      trackable: PropTypes.shape().isRequired,
    }).isRequired,
  }

  static PostContext = ({ trackableType, creator }) => {
    if (trackableType === 'Post') {
      return null
    }

    if (trackableType === 'Sharing') {
      return (
        <>
          <div className={styles.contextIcon}>
            <FontAwesomeIcon icon="retweet" className={styles.retweetIcon} />
          </div>
          <div className={styles.context}>
            <Text color="secondary">{creator.fullname} shared a post.</Text>
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
    let post

    switch (trackableType) {
      case 'Post': {
        post = trackable
        break
      }
      case 'Sharing':
      case 'Favorite': {
        // eslint-disable-next-line prefer-destructuring
        post = trackable.post
        break
      }
      default: {
        break
      }
    }

    return (
      <article className={styles.container}>
        <ActivityItem.PostContext
          trackableType={trackableType}
          creator={trackable.creator}
        />
        <Post post={post} />
      </article>
    )
  }
}
export default ActivityItem
