/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'

import { withAuthContext, authSelectors } from '../auth'

import { StatisticsApi } from './statistics-api'
import { StatisticsResource } from './statistics-resource'

const initialState = {
  followersCount: 0,
  followeesCount: 0,
  postsCount: 0,
  increase: () => {},
  decrease: () => {},
}

export const StatisticsContext = React.createContext(initialState)

export const StatisticsConsumer = StatisticsContext.Consumer

class StatisticsProvider extends React.Component {
  static propTypes = {
    auth: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props)

    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)

    this.state = {
      ...initialState,
      increase: this.increase,
      decrease: this.decrease,
    }
  }

  async componentDidMount() {
    try {
      const { data } = await StatisticsApi.fetchStatistics(
        authSelectors.getUser(this.props.auth).id
      )
      this.setState({ ...StatisticsResource.parse(data) })
    } catch (error) {
      console.log(error)
    }
  }

  increase(category, increasement) {
    this.setState(state => ({
      [`${category}sCount`]: state[`${category}sCount`] + increasement,
    }))
  }

  decrease(category, decreasement) {
    this.setState(state => ({
      [`${category}sCount`]: state[`${category}sCount`] - decreasement,
    }))
  }

  render() {
    return <StatisticsContext.Provider value={this.state} {...this.props} />
  }
}

export default withAuthContext(StatisticsProvider)
