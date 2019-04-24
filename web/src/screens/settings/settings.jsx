import React from 'react'
import { Menu } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { Box } from '../../components/atomics'
import { paths } from '../../config'

import styles from './settings.module.scss'
import { Password } from './password'
import { Profile } from './profile'

class Settings extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
  }

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
    const { intl } = this.props
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
              <Menu.Item key="profile">
                <FormattedMessage id="settings.profile.title" />
              </Menu.Item>
              <Menu.Item key="password">
                <FormattedMessage id="settings.password.title" />
              </Menu.Item>
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
