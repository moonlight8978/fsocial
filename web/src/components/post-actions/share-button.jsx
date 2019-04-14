import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import { AsyncUtils } from '../../utils'
import { Text } from '../atomics'
import { Activity } from '../activity-list/activity-resource'

import PostApi from './post-api'
import styles from './post-actions.module.scss'

class ShareButton extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isSharing: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { post } = this.props
    this.setState({ isSharing: true })
    try {
      if (post.isShared) {
        await this.handleUnshare()
      } else {
        await this.handleShare()
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isSharing: false })
    }
  }

  async handleShare() {
    const { post } = this.props
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

  async handleUnshare() {
    const { post } = this.props
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
    const { isSharing } = this.state
    const { post } = this.props
    const { isShared, sharesCount } = post

    return (
      <Button
        className={classnames(styles.actionButton, styles.shareButton, {
          [styles.shared]: isShared,
        })}
        onClick={this.handleClick}
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
    )
  }
}

export default ShareButton
