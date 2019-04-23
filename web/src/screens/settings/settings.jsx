import React from 'react'
import { Menu } from 'antd'
import { injectIntl } from 'react-intl'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import { Layout, Navbar } from '../layout'
import { Box } from '../../components/atomics'
import { paths } from '../../config'

import styles from './settings.module.scss'
import { Password } from './password'
import { Profile } from './profile'

class Settings extends React.PureComponent {
  handleClick = ({ key }) => {
    const { history } = this.props
    history.push(paths.settings.resolve({ subPath: key }))
  }

  currentScreen = () => {
    const { location } = this.props
    const key = _.last(location.pathname.split('/'))
    return key === 'settings' ? 'profile' : key
  }

  render() {
    const { intl, match } = this.props
    const { url } = match
    const selectedKey = this.currentScreen()

    return (
      <Layout
        className={styles.layout}
        hasNavbar
        navbar={<Navbar />}
        hasSideLeft
        windowTitle={intl.formatMessage({ id: 'settings.windowTitle' })}
        sideLeft={
          <Box className={styles.sidebar}>
            <Menu
              onClick={this.handleClick}
              defaultSelectedKeys={[selectedKey]}
              mode="inline"
              className={styles.menu}
            >
              <Menu.Item key="profile">Profile</Menu.Item>
              <Menu.Item key="password">Password</Menu.Item>
            </Menu>
          </Box>
        }
      >
        <Switch>
          <Route path={paths.settingsProfile.route} exact component={Profile} />
          <Route
            path={paths.settingsPassword.route}
            exact
            component={Password}
          />
        </Switch>
      </Layout>
    )
  }
}

export default injectIntl(Settings)
