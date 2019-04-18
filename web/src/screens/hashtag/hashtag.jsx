import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import {
  ActivityList,
  ActivityListProvider,
  ActivityItem,
  ActivityListConsumer,
} from '../../components/activity-list'
import { Box, BoxList, BoxSpacer } from '../../components/atomics'
import {
  FluidLoading,
  withLoading,
  LoadingPropTypes,
} from '../../components/loading'
import { ReplyProvider, ReplyConsumer } from '../../components/reply-editor'
import PopularHashtags from '../../components/hashtag/popular-hashtags/popular-hashtags'
import { AsyncUtils } from '../../utils'
import { paths } from '../../config'

import styles from './hashtag.module.scss'
import HashtagApi from './hashtag-api'
import HashtagResource from './hashtag-resource'
import HashtagInfo from './hashtag-info'

class Hashtag extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    match: PropTypes.shape().isRequired,
  }

  state = {
    hashtag: {},
  }

  fetchHashtag = async page => {
    try {
      if (page === 1) {
        this.props.startLoading()
      }
      const { match } = this.props
      const { data } = await HashtagApi.fetch(match.params.slug, page)
      this.setState({ hashtag: HashtagResource.parse(data) })
      await AsyncUtils.delay(1000)
      if (page === 1) {
        this.props.finishLoading()
      }
      return { data: data.activities }
    } catch (error) {
      this.props.history.push(paths.home.resolve())
      throw error
    }
  }

  render() {
    const { intl, match, isLoading } = this.props
    const { slug } = match.params
    const { hashtag } = this.state

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage(
          { id: 'hashtag.windowTitle' },
          { name: slug }
        )}
        hasSideRight
        sideRight={<FolloweeSuggestion />}
        hasSideLeft
        sideLeft={
          <>
            {isLoading ? (
              <Box>
                <FluidLoading />
              </Box>
            ) : (
              <HashtagInfo hashtag={hashtag} />
            )}
            <BoxSpacer />
            <PopularHashtags />
          </>
        }
        className={styles.layout}
      >
        <ActivityListProvider key={slug}>
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
                        fetchActivities={this.fetchHashtag}
                      />
                    )}
                  </ReplyConsumer>
                </BoxList>
              </ReplyProvider>
            )}
          </ActivityListConsumer>
        </ActivityListProvider>
      </Layout>
    )
  }
}

export default withLoading(injectIntl(Hashtag))
