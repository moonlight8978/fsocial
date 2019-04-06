import React from 'react'
import PropTypes from 'prop-types'

import { Box, BoxList } from '../../../components/atomics'
import { FluidLoading } from '../../../components/loading'
import {
  ActivityListProvider,
  ActivityStream,
  ActivityList,
  ActivityItem,
} from '../../../components/activity-list'

import { UserActivitiesApi } from './user-api'

class Activities extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.api = {
      fetch: UserActivitiesApi.all(props.user.username),
    }
  }

  render() {
    return (
      <ActivityListProvider>
        <ActivityStream api={this.api}>
          {({ submitPost, fetchActivities }) => (
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
                fetchActivities={fetchActivities}
              />
            </BoxList>
          )}
        </ActivityStream>
      </ActivityListProvider>
    )
  }
}

export default Activities
