import React from 'react'
import { Menu } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../../layout'
import { Box, List } from '../../../components/atomics'
import { paths } from '../../../config'
import { FolloweeSuggestion } from '../../../components/followee-suggestion'
import { withLoading, FluidLoading } from '../../../components/loading'

import ReportApi from './report-api'

class Reports extends React.PureComponent {
  state = {
    reports: [],
    page: 1,
  }

  async componentDidMount() {
    try {
      const { data } = await ReportApi.fetchPosts(this.state.page)
      this.setState({ reports: data })
      this.props.finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { intl, isLoading } = this.props
    const { reports } = this.state

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        hasSideLeft
        windowTitle={intl.formatMessage({ id: 'dashboard.windowTitle' })}
        sideLeft={<FolloweeSuggestion />}
      >
        <Box>
          {isLoading ? (
            <FluidLoading />
          ) : (
            <List
              items={reports}
              renderItem={item => <div>{item.content}</div>}
            />
          )}
        </Box>
      </Layout>
    )
  }
}

export default withLoading(injectIntl(Reports))
