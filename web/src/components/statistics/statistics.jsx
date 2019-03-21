/* eslint-disable react/no-unused-state */
import React from 'react'

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

export default StatisticsProvider
