import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import { Box, BoxList } from '../../../components/atomics'
import { FluidLoading } from '../../../components/loading'
import {
  ActivityListProvider,
  ActivityList,
  ActivityItem,
  ActivityListConsumer,
} from '../../../components/activity-list'
import { PostEditor } from '../../../components/post-editor'

class ActivityListWrapper extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    fetch: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
  }

  render() {
    const { fetch, user, intl } = this.props
    const { isCurrentUser } = user

    if (isCurrentUser) {
      return (
        <ActivityListProvider>
          <BoxList>
            <Box>
              <ActivityListConsumer>
                {({ createPost }) => (
                  <PostEditor
                    submitText={intl.formatMessage({
                      id: 'home.postEditor.submit',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'home.postEditor.placeholder',
                    })}
                    onSubmit={createPost}
                  />
                )}
              </ActivityListConsumer>
            </Box>
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

export default injectIntl(ActivityListWrapper)
