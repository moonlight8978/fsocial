/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'

import { withStatisticsContext } from '../statistics'

import { FollowingApi } from './following-api'

const initialState = {
  follow: () => {},
  unfollow: () => {},
  fetchCount: () => {},
}

export const FollowingContext = React.createContext(initialState)

export const FollowingConsumer = FollowingContext.Consumer

class FollowingProvider extends React.Component {
  static propTypes = {
    statistics: PropTypes.shape({
      increase: PropTypes.func.isRequired,
      decrease: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.fetchCount = this.fetchCount.bind(this)
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)

    this.state = {
      follow: this.follow,
      unfollow: this.unfollow,
      fetchCount: this.fetchCount,
    }
  }

  fetchCount() {
    console.log(this.state)
  }

  async follow(user) {
    try {
      await FollowingApi.follow(user)
      this.props.statistics.increase('followee', 1)
    } catch (error) {
      throw error
    }
  }

  async unfollow(user) {
    try {
      await FollowingApi.follow(user)
      this.props.statistics.decrease('followee', 1)
    } catch (error) {
      throw error
    }
  }

  render() {
    return <FollowingContext.Provider value={this.state} {...this.props} />
  }
}

export default withStatisticsContext(FollowingProvider)
