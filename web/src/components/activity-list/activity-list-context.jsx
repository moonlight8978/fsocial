import React from 'react'
import PropTypes from 'prop-types'

import ActivityApi from './activity-api'
import { Activities } from './activity-resource'

const initialState = {
  data: [],
  page: 1,
  prependActivity: () => {},
  removeActivity: () => {},
  setActivities: () => {},
  setPage: () => {},
  changePost: () => {},
}

const { Provider, Consumer } = React.createContext(initialState)

export const ActivityListConsumer = Consumer

const getTrackablePost = ({ trackable, trackableType }) =>
  trackableType === 'Post' ? trackable : trackable.post

const changeTrackable = ({ trackable, trackableType }, newPost) =>
  trackableType === 'Post' ? newPost : { ...trackable, post: newPost }

/* eslint-disable react/no-unused-state */
export class ActivityListProvider extends React.Component {
  static propTypes = {
    increaseCounts: PropTypes.func,
  }

  static defaultProps = {
    increaseCounts: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      prependActivity: this.prependActivity.bind(this),
      removeActivity: this.removeActivity.bind(this),
      setActivities: this.setActivities.bind(this),
      setPage: this.setPage.bind(this),
      changePost: this.changePost.bind(this),
      createPost: this.createPost.bind(this),
    }
  }

  setActivities(activities) {
    this.setState({ data: activities })
  }

  setPage(page) {
    this.setState({ page })
  }

  prependActivity(activities) {
    this.setState(state => ({ data: [...activities, ...state.data] }))
  }

  removeActivity(id) {
    this.setState(state => ({
      data: state.data.filter(activity => activity.id !== id),
    }))
  }

  changePost(id, newPost) {
    this.setState(state => ({
      data: state.data.map(activity =>
        getTrackablePost(activity).id === id
          ? {
              ...activity,
              trackable: changeTrackable(activity, newPost),
            }
          : activity
      ),
    }))
  }

  async createPost(post) {
    const { increaseCounts } = this.props
    const { data } = await ActivityApi.createPost(post)
    this.prependActivity(Activities.parse([data]))
    increaseCounts('post', 1)
  }

  render() {
    return <Provider value={this.state} {...this.props} />
  }
}
