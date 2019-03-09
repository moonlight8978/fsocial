/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from '../container'
import { AuthConsumer } from '../../../components/auth'
import { LocaleConsumer } from '../../../components/locale'
import { paths } from '../../../config'

import styles from './navbar.module.scss'
import menuStyles from './user-menu.module.scss'

const { Header } = Layout
const { SubMenu } = Menu

class Navbar extends React.Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
  }

  static UserMenu = () => (
    <AuthConsumer>
      {({ user, signOut }) => (
        <LocaleConsumer>
          {({ changeLocale }) => (
            <Dropdown
              overlay={
                <Menu className={menuStyles.menu}>
                  <Menu.Item className={menuStyles.item}>
                    <h2 className={menuStyles.fullname}>
                      {user.fullname || 'Park Ji Sung'}
                    </h2>
                    <span>@{user.username || 'park_ji_sung'}</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item className={menuStyles.item}>
                    <a href="/profile">
                      <FontAwesomeIcon
                        icon="user"
                        className={menuStyles.icon}
                      />
                      <FormattedMessage id="navbar.submenu.profile" />
                    </a>
                  </Menu.Item>
                  <Menu.Divider />
                  <SubMenu
                    title={
                      <FormattedMessage id="navbar.submenu.changeLocale" />
                    }
                  >
                    <Menu.Item onClick={changeLocale('vi')}>
                      <FormattedMessage id="locales.vietnamese" />
                    </Menu.Item>
                    <Menu.Item onClick={changeLocale('en')}>
                      <FormattedMessage id="locales.english" />
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item className={menuStyles.item} onClick={signOut}>
                    <FormattedMessage id="navbar.submenu.signOut" />
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              trigger={['click']}
            >
              <a className="ant-dropdown-link" href="#">
                <Avatar
                  size="large"
                  src="/avatar-placeholder.png"
                  className={styles.avatar}
                />
                <FontAwesomeIcon
                  icon="caret-down"
                  className={styles.dropdownIcon}
                />
              </a>
            </Dropdown>
          )}
        </LocaleConsumer>
      )}
    </AuthConsumer>
  )

  constructor(props) {
    super(props)

    this.handleChangeRoute = this.handleChangeRoute.bind(this)
  }

  handleChangeRoute({ key }) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push(key)
  }

  render() {
    const {
      match: { path },
    } = this.props

    return (
      <Header className={styles.header}>
        <div className={styles.innerHeader}>
          <Container>
            <Menu
              mode="horizontal"
              selectedKeys={[path]}
              className={styles.menu}
            >
              <Menu.Item
                key={paths.home.resolve()}
                className={styles.menuItem}
                onClick={this.handleChangeRoute}
              >
                <FontAwesomeIcon icon="home" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.home" />
              </Menu.Item>

              <Menu.Item
                key={paths.notifications.resolve()}
                className={styles.menuItem}
                onClick={this.handleChangeRoute}
              >
                <FontAwesomeIcon icon="bell" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.notifications" />
              </Menu.Item>

              <Menu.Item
                key={paths.messages.resolve()}
                className={styles.menuItem}
                onClick={this.handleChangeRoute}
              >
                <FontAwesomeIcon icon="envelope" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.messages" />
              </Menu.Item>

              <Menu.Item className={[styles.submenu, styles.dropdownTrigger]}>
                <Navbar.UserMenu />
              </Menu.Item>
            </Menu>
          </Container>
        </div>
      </Header>
    )
  }
}

export default withRouter(Navbar)
