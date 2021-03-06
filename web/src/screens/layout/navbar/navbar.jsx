/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from '../container'
import { AuthConsumer } from '../../../components/auth'
import { LocaleConsumer } from '../../../components/locale'
import { paths } from '../../../config'
import { User } from '../../../components/user'

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
                    <h2 className={menuStyles.fullname}>{user.fullname}</h2>
                    <span>@{user.username}</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item className={menuStyles.item}>
                    <Link to={paths.user.resolve({ username: user.username })}>
                      <FontAwesomeIcon
                        icon="user"
                        className={menuStyles.icon}
                      />
                      <FormattedMessage id="navbar.submenu.profile" />
                    </Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item className={menuStyles.item}>
                    <Link to={paths.settings.resolve()}>
                      <FontAwesomeIcon icon="cog" className={menuStyles.icon} />
                      <FormattedMessage id="navbar.submenu.settings" />
                    </Link>
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
                <User.Avatar
                  size="large"
                  user={user}
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
                key={paths.memories.resolve()}
                className={styles.menuItem}
                onClick={this.handleChangeRoute}
              >
                <FontAwesomeIcon icon="book-open" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.memories" />
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

export default withRouter(injectIntl(Navbar))
