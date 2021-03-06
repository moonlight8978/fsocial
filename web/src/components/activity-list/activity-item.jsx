import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'

import { Text } from '../atomics'

import { Post } from './post'
import styles from './activity-item.module.scss'

class ActivityItem extends React.Component {
  static propTypes = {
    activity: PropTypes.shape({
      trackable: PropTypes.shape().isRequired,
    }).isRequired,
    showReplyModal: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  static PostContext = ({ trackableType, creator }) => {
    if (trackableType === 'Post') {
      return null
    }

    if (trackableType === 'Sharing') {
      return (
        <React.Fragment>
          <div className={styles.contextIcon}>
            <FontAwesomeIcon icon="retweet" className={styles.retweetIcon} />
          </div>
          <div className={styles.context}>
            <Text color="secondary">
              <FormattedMessage
                id="activityList.item.context.sharing"
                values={{ fullname: creator.fullname }}
              />
            </Text>
          </div>
        </React.Fragment>
      )
    }

    if (trackableType === 'Favorite') {
      return (
        <React.Fragment>
          <div className={styles.contextIcon}>
            <FontAwesomeIcon icon="heart" />
          </div>
          <div className={styles.context}>
            <Text color="secondary">
              <FormattedMessage
                id="activityList.item.context.favorite"
                values={{ fullname: creator.fullname }}
              />
            </Text>
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    const { activity, showReplyModal, onChange, onRemove } = this.props
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
        <Post
          post={post}
          showReplyModal={showReplyModal}
          onChange={onChange}
          onRemove={onRemove}
        />
      </article>
    )
  }
}
export default ActivityItem
