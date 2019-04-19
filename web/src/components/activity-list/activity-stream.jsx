import React from 'react'
import { Button } from 'antd'
import { ActionCableConsumer } from 'react-actioncable-provider'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'

class ActivityStream extends React.PureComponent {
  handleReceive = data => {
    console.log(data)
    const { prependPendingActivities } = this.props
    const activities = Activities.parse([data])
    console.log(activities)
    prependPendingActivities(activities)
  }

  render() {
    const { channel, mergeActivities } = this.props

    return (
      <div>
        <ActionCableConsumer
          channel={channel}
          onReceived={this.handleReceive}
        />
        asdasdasd
        <Button onClick={mergeActivities}>Merge</Button>
      </div>
    )
  }
}

export default props => (
  <ActivityListConsumer>
    {({ prependPendingActivities, mergeActivities }) => (
      <ActivityStream
        prependPendingActivities={prependPendingActivities}
        mergeActivities={mergeActivities}
        {...props}
      />
    )}
  </ActivityListConsumer>
)
