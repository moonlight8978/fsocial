import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Text } from '../atomics'

import { Post } from './post'
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

    return (
      <article className={styles.container}>
        <ActivityItem.PostContext
          trackableType={trackableType}
          creator={trackable.creator}
        />

        {trackableType === 'Post' ? <Post post={trackable} /> : null}

        {trackableType === 'Sharing' ? <Post post={trackable.post} /> : null}

        {trackableType === 'Favorite' ? <Post post={trackable.post} /> : null}
      </article>
    )
  }
}

export default ActivityItem
