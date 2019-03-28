import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import {
  ActivityList,
  ActivityListProvider,
  ActivityListConsumer,
  ActivityItem,
  Activity,
} from '../../components/activity-list'
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
          <ActivityListProvider>
            <Box>
              <ActivityListConsumer>
                {({ prependActivity }) => (
                  <PostEditor
                    submitText={intl.formatMessage({
                      id: 'home.postEditor.submit',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'home.postEditor.placeholder',
                    })}
                    onSubmit={() => {}}
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
              api={{ fetch: ActivityApi.all }}
            />
          </ActivityListProvider>
        </BoxList>
      </Layout>
    )
  }
}

export default injectIntl(Home)
