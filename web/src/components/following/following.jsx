/* eslint-disable react/no-unused-state */
import React from 'react'

import { FollowingApi } from './following-api'

const initialState = {
  followersCount: 0,
  followeesCount: 0,
  follow: () => {},
  unfollow: () => {},
  fetchCount: () => {},
}

export const FollowingContext = React.createContext(initialState)

export const FollowingConsumer = FollowingContext.Consumer

class FollowingProvider extends React.Component {
  constructor(props) {
    super(props)

    this.fetchCount = this.fetchCount.bind(this)
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)

    this.state = {
      ...initialState,
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
      this.setState(state => ({
        followeesCount: state.followeesCount + 1,
      }))
    } catch (error) {
      throw error
    }
  }

  async unfollow(user) {
    try {
      await FollowingApi.follow(user)
      this.setState(state => ({
        followeesCount: state.followeesCount - 1,
      }))
    } catch (error) {
      throw error
    }
  }

  render() {
    return <FollowingContext.Provider value={this.state} {...this.props} />
  }
}

export default FollowingProvider
