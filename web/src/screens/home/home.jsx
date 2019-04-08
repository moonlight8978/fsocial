import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import {
  ActivityList,
  ActivityListProvider,
  ActivityItem,
  ActivityListConsumer,
} from '../../components/activity-list'
import { Box, BoxList } from '../../components/atomics'
import {
  StatisticsProvider,
  StatisticsConsumer,
} from '../../components/statistics'
import { FollowingProvider } from '../../components/following'
import { FluidLoading } from '../../components/loading'
import { withAuthContext } from '../../components/auth'
import { ReplyProvider, ReplyConsumer } from '../../components/reply-editor'

import Statistics from './statistics'
import ActivityApi from './activity-api'
import styles from './home.module.scss'

class Home extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape().isRequired,
    }).isRequired,
  }

  render() {
    const { intl, auth } = this.props

    return (
      <StatisticsProvider user={auth.user}>
        <FollowingProvider authorized>
          <Layout
            hasNavbar
            navbar={<Navbar />}
            windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
            hasSideRight
            sideRight={<FolloweeSuggestion />}
            hasSideLeft
            sideLeft={<Statistics />}
            className={styles.layout}
          >
            <StatisticsConsumer>
              {({ increase }) => (
                <ActivityListProvider increaseCounts={increase}>
                  <ReplyProvider>
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
                      <ReplyConsumer>
                        {({ showModal }) => (
                          <ActivityList
                            renderItem={activity => (
                              <Box key={activity.id}>
                                <ActivityItem
                                  activity={activity}
                                  showReplyModal={showModal}
                                />
                              </Box>
                            )}
                            loadingIndicator={
                              <Box>
                                <FluidLoading />
                              </Box>
                            }
                            fetchActivities={ActivityApi.fetch}
                          />
                        )}
                      </ReplyConsumer>
                    </BoxList>
                  </ReplyProvider>
                </ActivityListProvider>
              )}
            </StatisticsConsumer>
          </Layout>
        </FollowingProvider>
      </StatisticsProvider>
    )
  }
}

export default injectIntl(withAuthContext(Home))
