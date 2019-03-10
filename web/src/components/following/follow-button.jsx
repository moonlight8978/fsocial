import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import { AsyncUtils } from '../../utils'
import { Hover } from '../atomics'

import styles from './follow-button.module.scss'

class FollowButton extends React.Component {
  static propTypes = {
    onFollow: PropTypes.func,
    onUnfollow: PropTypes.func,
  }

  static defaultProps = {
    onFollow: () => {},
    onUnfollow: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false,
      isFollowing: false,
    }

    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  async handleFollow() {
    this.setState({ isSubmitting: true })
    await AsyncUtils.delay(2000)
    this.setState(state => ({
      isSubmitting: false,
      isFollowing: true,
    }))
    this.props.onFollow()
  }

  async handleUnfollow() {
    this.setState({ isSubmitting: true })
    await AsyncUtils.delay(2000)
    this.setState(state => ({
      isSubmitting: false,
      isFollowing: false,
    }))
    this.props.onUnfollow()
  }

  render() {
    const { isSubmitting, isFollowing } = this.state

    if (isFollowing) {
      return (
        <Hover
          content={
            <Button
              type="danger"
              shape="round"
              className={styles.unfollowButton}
              loading={isSubmitting}
              onClick={this.handleUnfollow}
            >
              <FormattedMessage id="following.unfollow" />
            </Button>
          }
        >
          <Button
            type="primary"
            shape="round"
            className={styles.followingButton}
            loading={isSubmitting}
          >
            <FormattedMessage id="following.following" />
          </Button>
        </Hover>
      )
    }

    return (
      <Button
        ghost
        type="primary"
        shape="round"
        className={styles.followButton}
        loading={isSubmitting}
        onClick={this.handleFollow}
      >
        <FormattedMessage id="following.follow" />
      </Button>
    )
  }
}

export default FollowButton
