import React from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import PropTypes from 'prop-types'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'

class ActivityStream extends React.PureComponent {
  static propTypes = {
    channel: PropTypes.shape({
      channel: PropTypes.string.isRequired,
    }).isRequired,
    prependPendingActivities: PropTypes.func.isRequired,
  }

  handleReceive = data => {
    const { prependPendingActivities } = this.props
    const activities = Activities.parse([data])
    prependPendingActivities(activities)
  }

  render() {
    const { channel } = this.props

    return (
      <ActionCableConsumer channel={channel} onReceived={this.handleReceive} />
    )
  }
}

export default props => (
  <ActivityListConsumer>
    {({ prependPendingActivities, mergeActivities }) => (
      <ActivityStream
        prependPendingActivities={prependPendingActivities}
        {...props}
      />
    )}
  </ActivityListConsumer>
)
