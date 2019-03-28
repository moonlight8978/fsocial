import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import { ActivityList } from '../../components/activity-list'
import { Box, BoxList } from '../../components/atomics'

import Statistics from './statistics'
import ActivityApi from './activity-api'

class Home extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  render() {
    const { intl } = this.props

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
        hasSideRight
        sideRight={<FolloweeSuggestion />}
        hasSideLeft
        sideLeft={<Statistics />}
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
              onSubmit={ActivityApi.create}
            />
          </Box>
          <ActivityList
            renderPost={post => (
              <Box key={post.id}>{post.trackable.content}</Box>
            )}
            api={{ fetch: ActivityApi.all }}
          />
        </BoxList>
      </Layout>
    )
  }
}

export default injectIntl(Home)
