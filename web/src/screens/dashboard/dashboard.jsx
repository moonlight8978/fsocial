import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import { Menu } from 'antd'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { Box } from '../../components/atomics'
import { paths } from '../../config'

import { Reports } from './reports'
import { Users } from './users'
import styles from './dashboard.module.scss'

class Dashboard extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
  }

  handleClick = ({ key }) => {
    const { history } = this.props
    history.push(paths.dashboard.resolve({ managedTarget: key }))
  }

  render() {
    const { intl, location } = this.props
    const currentScreen = _.last(location.pathname.split('/'))

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        hasSideLeft
        windowTitle={intl.formatMessage({
          id: 'dashboard.windowTitle',
        })}
        sideLeft={
          <Box className={styles.sidebar}>
            <Menu
              onClick={this.handleClick}
              defaultSelectedKeys={[currentScreen]}
              mode="inline"
              className={styles.menu}
            >
              <Menu.Item key="reports">
                <FormattedMessage id="dashboard.sidebar.reports" />
              </Menu.Item>
              <Menu.Item key="users">
                <FormattedMessage id="dashboard.sidebar.users" />
              </Menu.Item>
            </Menu>
          </Box>
        }
        className={styles.layout}
      >
        <Switch>
          <Route
            path={paths.dashboard.resolve({ managedTarget: 'reports' })}
            exact
            component={Reports}
          />
          <Route
            path={paths.dashboard.resolve({ managedTarget: 'users' })}
            exact
            component={Users}
          />
        </Switch>
      </Layout>
    )
  }
}

export default injectIntl(Dashboard)
