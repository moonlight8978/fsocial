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
import { ReplyProvider, ReplyConsumer } from '../../../components/reply-editor'

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

    return (
      <ActivityListProvider>
        <ActivityListConsumer>
          {({ createPost, changePost }) => (
            <BoxList>
              {isCurrentUser && (
                <Box>
                  <PostEditor
                    submitText={intl.formatMessage({
                      id: 'home.postEditor.submit',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'home.postEditor.placeholder',
                    })}
                    onSubmit={createPost}
                  />
                </Box>
              )}
              <ReplyProvider
                onCreate={(post, { trackable: { rootId, root } }) =>
                  changePost(rootId, {
                    ...post,
                    repliesCount: root.repliesCount,
                  })
                }
              >
                <ReplyConsumer>
                  {({ showModal }) => (
                    <ActivityList
                      renderItem={activity => (
                        <Box key={activity.id}>
                          <ActivityItem
                            activity={activity}
                            showReplyModal={showModal}
                            onChange={changePost}
                          />
                        </Box>
                      )}
                      loadingIndicator={
                        <Box>
                          <FluidLoading />
                        </Box>
                      }
                      fetchActivities={fetch}
                    />
                  )}
                </ReplyConsumer>
              </ReplyProvider>
            </BoxList>
          )}
        </ActivityListConsumer>
      </ActivityListProvider>
    )
  }
}

export default injectIntl(ActivityListWrapper)
