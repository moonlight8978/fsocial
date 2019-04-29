import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { ActionCableProvider } from 'react-actioncable-provider'
import { Link } from 'react-router-dom'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import {
  ActivityList,
  ActivityListProvider,
  ActivityItem,
  ActivityListConsumer,
  ActivityStream,
} from '../../components/activity-list'
import { Box, BoxList, BoxSpacer } from '../../components/atomics'
import {
  StatisticsProvider,
  StatisticsConsumer,
} from '../../components/statistics'
import { FollowingProvider } from '../../components/following'
import { FluidLoading } from '../../components/loading'
import {
  withAuthContext,
  authSelectors,
  Authorized,
} from '../../components/auth'
import { ReplyProvider, ReplyConsumer } from '../../components/reply-editor'
import PopularHashtags from '../../components/hashtag/popular-hashtags/popular-hashtags'
import { settings, paths } from '../../config'

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

  streamingChannel = {
    channel: 'ActivitiesChannel',
  }

  render() {
    const { intl, auth } = this.props
    const token = authSelectors.getToken(auth)

    return (
      <ActionCableProvider url={`${settings.server.websocket}?token=${token}`}>
        <StatisticsProvider user={auth.user}>
          <FollowingProvider authorized>
            <Layout
              hasNavbar
              navbar={<Navbar />}
              windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
              hasSideRight
              sideRight={
                <>
                  <Authorized requiredRole="admin">
                    <Box title={<FormattedMessage id="dashboard.title" />}>
                      <Link to={paths.dashboard.resolve()}>
                        <FormattedMessage id="dashboard.invitation" />
                      </Link>
                    </Box>
                    <BoxSpacer />
                  </Authorized>
                  <FolloweeSuggestion />
                </>
              }
              hasSideLeft
              sideLeft={
                <>
                  <Statistics />
                  <BoxSpacer />
                  <PopularHashtags />
                </>
              }
              className={styles.layout}
            >
              <StatisticsConsumer>
                {({ increase, decrease }) => (
                  <ActivityListProvider
                    increaseCounts={increase}
                    decreaseCounts={decrease}
                  >
                    <ActivityListConsumer>
                      {({ createPost, changePost, removePost }) => (
                        <>
                          <ActivityStream channel={this.streamingChannel} />

                          <ReplyProvider
                            onCreate={(post, { trackable: { rootId, root } }) =>
                              changePost(rootId, {
                                ...post,
                                repliesCount: root.repliesCount,
                              })
                            }
                          >
                            <BoxList>
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
                              <ReplyConsumer>
                                {({ showModal }) => (
                                  <ActivityList
                                    renderItem={activity => (
                                      <Box key={activity.id}>
                                        <ActivityItem
                                          activity={activity}
                                          showReplyModal={showModal}
                                          onChange={changePost}
                                          onRemove={removePost}
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
                        </>
                      )}
                    </ActivityListConsumer>
                  </ActivityListProvider>
                )}
              </StatisticsConsumer>
            </Layout>
          </FollowingProvider>
        </StatisticsProvider>
      </ActionCableProvider>
    )
  }
}

export default injectIntl(withAuthContext(Home))
