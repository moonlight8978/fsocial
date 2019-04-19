import React from 'react'
import { Button } from 'antd'

import { ActivityListConsumer } from './activity-list-context'

class ActivityStream extends React.PureComponent {
  render() {
    return (
      <div>
        asdasdasd
        <Button
          onClick={() =>
            this.props.prependPendingActivities([{ id: 1 }, { id: 2 }])
          }
        >
          Prepend
        </Button>
        <Button onClick={() => this.props.mergeActivities()}>Merge</Button>
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
      />
    )}
  </ActivityListConsumer>
)
