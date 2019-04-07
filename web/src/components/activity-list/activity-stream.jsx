import React from 'react'
import PropTypes from 'prop-types'

import { StatisticsConsumer } from '../statistics'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'
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
  }

  async handleSubmitPost(post) {
    const { prependActivity, increasePostsCount } = this.props
    const { data } = await ActivityApi.createPost(post)
    prependActivity(Activities.parse([data]))
    increasePostsCount('post', 1)
  }

  render() {
    return this.props.children({
      submitPost: this.handleSubmitPost,
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
