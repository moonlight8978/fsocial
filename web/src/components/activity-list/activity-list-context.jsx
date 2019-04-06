import React from 'react'

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
  constructor(props) {
    super(props)

    this.prependActivity = this.prependActivity.bind(this)
    this.removeActivity = this.removeActivity.bind(this)
    this.setActivities = this.setActivities.bind(this)
    this.setPage = this.setPage.bind(this)
    this.changePost = this.changePost.bind(this)

    this.state = {
      ...initialState,
      prependActivity: this.prependActivity,
      removeActivity: this.removeActivity,
      setActivities: this.setActivities,
      setPage: this.setPage,
      changePost: this.changePost,
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

  render() {
    return <Provider value={this.state} {...this.props} />
  }
}
