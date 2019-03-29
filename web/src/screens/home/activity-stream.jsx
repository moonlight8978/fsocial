import React from 'react'
import PropTypes from 'prop-types'

import {
  ActivityListConsumer,
  Activities,
} from '../../components/activity-list'
import { StatisticsConsumer } from '../../components/statistics'

import ActivityApi from './activity-api'

class ActivityStream extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    prependActivity: PropTypes.func.isRequired,
    increasePostsCount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleFetchActivities = ActivityApi.all
  }

  async handleSubmitPost(post) {
    const { data } = await ActivityApi.create(post)
    const { prependActivity, increasePostsCount } = this.props
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
