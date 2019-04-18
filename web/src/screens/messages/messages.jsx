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
import { Box, BoxList, BoxSpacer } from '../../components/atomics'
import {
  StatisticsProvider,
  StatisticsConsumer,
} from '../../components/statistics'
import { FollowingProvider } from '../../components/following'
import { FluidLoading } from '../../components/loading'
import { withAuthContext } from '../../components/auth'
import { ReplyProvider, ReplyConsumer } from '../../components/reply-editor'
import PopularHashtags from '../../components/hashtag/popular-hashtags/popular-hashtags'

import styles from './messages.module.scss'

class Messages extends React.PureComponent {
  render() {
    const { intl } = this.props

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
        hasSideLeft
        sideLeft={<Box />}
        className={styles.layout}
      >
        <Box>content</Box>
      </Layout>
    )
  }
}

export default injectIntl(Messages)
