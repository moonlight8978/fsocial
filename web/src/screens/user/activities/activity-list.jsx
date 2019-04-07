import React from 'react'
import PropTypes from 'prop-types'

import { Box, BoxList } from '../../../components/atomics'
import { FluidLoading } from '../../../components/loading'
import {
  ActivityListProvider,
  ActivityList,
  ActivityItem,
} from '../../../components/activity-list'

class ActivityListWrapper extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    fetch: PropTypes.func.isRequired,
  }

  render() {
    const { fetch } = this.props

    return (
      <ActivityListProvider>
        <BoxList>
          <ActivityList
            renderItem={activity => (
              <Box key={activity.id}>
                <ActivityItem activity={activity} />
              </Box>
            )}
            loadingIndicator={
              <Box>
                <FluidLoading />
              </Box>
            }
            fetchActivities={fetch}
          />
        </BoxList>
      </ActivityListProvider>
    )
  }
}

export default ActivityListWrapper
