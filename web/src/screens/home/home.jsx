import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { List } from 'antd'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { Box } from '../../components/atomics'

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
        <Box>
          <List dataSource={[]} />
        </Box>
      </Layout>
    )
  }
}

export default injectIntl(Home)
