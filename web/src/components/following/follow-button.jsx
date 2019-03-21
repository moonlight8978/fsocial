import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import { AsyncUtils } from '../../utils'
import { Hover } from '../atomics'

import styles from './follow-button.module.scss'
import { withFollowingContext } from './with-following-context'

class FollowButton extends React.Component {
  static propTypes = {
    onFollow: PropTypes.func,
    onUnfollow: PropTypes.func,
    following: PropTypes.shape({
      follow: PropTypes.func.isRequired,
      unfollow: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.shape().isRequired,
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
    const { user, following, onFollow } = this.props
    try {
      this.setState({ isSubmitting: true })
      await following.follow(user)
      this.setState({ isFollowing: true })
      onFollow()
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ isSubmitting: false })
    }
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

export default withFollowingContext(FollowButton)
