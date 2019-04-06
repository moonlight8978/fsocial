/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'

import { withStatisticsContext } from '../statistics'

import { FollowingApi } from './following-api'

const initialState = {
  follow: () => {},
  unfollow: () => {},
}

export const FollowingContext = React.createContext(initialState)

export const FollowingConsumer = FollowingContext.Consumer

class FollowingProvider extends React.Component {
  static propTypes = {
    statistics: PropTypes.shape({
      increase: PropTypes.func.isRequired,
      decrease: PropTypes.func.isRequired,
    }).isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)

    this.state = {
      follow: this.follow,
      unfollow: this.unfollow,
    }
  }

  async follow(user) {
    const { authorized, statistics } = this.props
    try {
      await FollowingApi.follow(user)
      if (authorized) {
        statistics.increase('followee', 1)
      }
    } catch (error) {
      throw error
    }
  }

  async unfollow(user) {
    const { authorized, statistics } = this.props
    try {
      await FollowingApi.follow(user)
      if (authorized) {
        statistics.decrease('followee', 1)
      }
    } catch (error) {
      throw error
    }
  }

  render() {
    return <FollowingContext.Provider value={this.state} {...this.props} />
  }
}

export default withStatisticsContext(FollowingProvider)
