import React from 'react'
import PropTypes from 'prop-types'

import { StatisticsConsumer } from '../statistics'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'

class ActivityStream extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    prependActivity: PropTypes.func.isRequired,
    increasePostsCount: PropTypes.func.isRequired,
    api: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
      createPost: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleFetchActivities = props.api.fetch
  }

  async handleSubmitPost(post) {
    const { prependActivity, increasePostsCount, api } = this.props
    if (!api.createPost) {
      return false
    }
    const { data } = await api.createPost(post)
    prependActivity(Activities.parse([data]))
    increasePostsCount('post', 1)
  }

  render() {
    return this.props.children({
      submitPost: this.handleSubmitPost,
      fetchActivities: this.handleFetchActivities,
    })
  }
}

export default props => (
  <StatisticsConsumer>
    {({ increase }) => (
      <ActivityListConsumer>
        {({ prependActivity }) => (
          <ActivityStream
            prependActivity={prependActivity}
            increasePostsCount={increase}
            {...props}
          />
        )}
      </ActivityListConsumer>
    )}
  </StatisticsConsumer>
)
