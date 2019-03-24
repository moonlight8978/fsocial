import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { List } from 'antd'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import { Box, BoxList } from '../../components/atomics'

import Statistics from './statistics'

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
        {/* <div style={{ marginBottom: '1rem' }} /> */}
        <BoxList>
          <Box>
            <PostEditor />
          </Box>
          <Box>This is a tweet</Box>
          <Box>This is another tweet</Box>
        </BoxList>
      </Layout>
    )
  }
}

export default injectIntl(Home)
