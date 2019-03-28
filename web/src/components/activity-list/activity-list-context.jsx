import React from 'react'

const initialState = {
  data: [],
  page: 1,
  prependActivity: () => {},
  removeActivity: () => {},
  setActivities: () => {},
  setPage: () => {},
}

const { Provider, Consumer } = React.createContext(initialState)

export const ActivityListConsumer = Consumer

/* eslint-disable react/no-unused-state */
export class ActivityListProvider extends React.Component {
  constructor(props) {
    super(props)

    this.prependActivity = this.prependActivity.bind(this)
    this.removeActivity = this.removeActivity.bind(this)
    this.setActivities = this.setActivities.bind(this)
    this.setPage = this.setPage.bind(this)

    this.state = {
      ...initialState,
      prependActivity: this.prependActivity,
      removeActivity: this.removeActivity,
      setActivities: this.setActivities,
      setPage: this.setPage,
    }
  }

  setActivities(activities) {
    this.setState({ data: activities })
  }

  setPage(page) {
    this.setState({ page })
  }

  prependActivity(posts) {
    this.setState(state => ({ data: [...posts, ...state.data] }))
  }

  removeActivity(id) {
    this.setState(state => ({
      data: state.data.filter(post => post.id !== id),
    }))
  }

  render() {
    return <Provider value={this.state} {...this.props} />
  }
}
