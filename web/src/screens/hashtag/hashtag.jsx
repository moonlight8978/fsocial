import React from 'react'

import { Layout, Navbar } from '../layout'
import { Statistics } from '../../components/statistics'
import { BoxSpacer } from '../../components/atomics'
import { PopularHashtags } from '../../components/hashtag/popular-hashtags'

import styles from './hashtag.module.scss'

class Hashtag extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
        hasSideRight
        sideRight={<FolloweeSuggestion />}
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
                                  decreasePost={decrease}
                                  currentUser={auth.user}
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
                )}
              </ActivityListConsumer>
            </ActivityListProvider>
          )}
        </StatisticsConsumer>
      </Layout>
    )
  }
}

export default Hashtag
