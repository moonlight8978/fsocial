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
} from '../../components/activity-list'
import { Box, BoxList } from '../../components/atomics'
import { StatisticsProvider } from '../../components/statistics'
import { FollowingProvider } from '../../components/following'
import { FluidLoading } from '../../components/loading'

import Statistics from './statistics'
import ActivityStream from './activity-stream'
import styles from './home.module.scss'

class Home extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  render() {
    const { intl } = this.props

    return (
      <StatisticsProvider>
        <FollowingProvider>
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
            <ActivityListProvider>
              <ActivityStream>
                {({ submitPost, fetchActivities }) => (
                  <BoxList>
                    <Box>
                      <PostEditor
                        submitText={intl.formatMessage({
                          id: 'home.postEditor.submit',
                        })}
                        placeholder={intl.formatMessage({
                          id: 'home.postEditor.placeholder',
                        })}
                        onSubmit={submitPost}
                      />
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
                      api={{ fetch: fetchActivities }}
                    />
                  </BoxList>
                )}
              </ActivityStream>
            </ActivityListProvider>
          </Layout>
        </FollowingProvider>
      </StatisticsProvider>
    )
  }
}

export default injectIntl(Home)
