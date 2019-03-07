/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Layout, Menu, Dropdown, Divider, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Container } from '../container'

import styles from './navbar.module.scss'
import { SignInMenu } from './sign-in-menu'
import { SignInForm } from './sign-in-menu/sign-in-form'
import { Text } from '../../atomics'

const { Header } = Layout

class UnauthorizedNavbar extends React.Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    hasSubmenu: PropTypes.bool,
    Submenu: PropTypes.func,
    intl: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    hasSubmenu: false,
    Submenu: SignInMenu,
  }

  constructor(props) {
    super(props)

    this.state = {
      isMenuVisible: false,
    }

    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
  }

  handleVisibleChange(visibility) {
    this.setState({ isMenuVisible: visibility })
  }

  handleRouteChange({ key }) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push(key)
  }

  render() {
    const {
      match: { path },
      Submenu,
      hasSubmenu,
      intl,
    } = this.props

    const { isMenuVisible } = this.state

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
                key="/"
                className={styles.menuItem}
                onClick={this.handleRouteChange}
              >
                <FontAwesomeIcon icon="home" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.home" />
              </Menu.Item>
              <Menu.Item
                key="/about"
                className={styles.menuItem}
                onClick={this.handleRouteChange}
              >
                <FontAwesomeIcon icon="bell" className={styles.menuIcon} />
                <FormattedMessage id="navbar.menu.about" />
              </Menu.Item>

              {hasSubmenu && (
                <Menu.Item className={[styles.menuItem, styles.submenu]}>
                  <Dropdown
                    onVisibleChange={this.handleVisibleChange}
                    visible={isMenuVisible}
                    overlay={
                      <div className={styles.menu}>
                        <SignInForm intl={intl} />

                        <Divider className={styles.divider} />

                        <div>
                          <div className={styles.groupTitle}>
                            <Text color="secondary" size="large">
                              <FormattedMessage id="signIn.guestTitle" />
                            </Text>
                          </div>

                          <Button
                            block
                            type="primary"
                            shape="round"
                            htmlType="button"
                            className={styles.button}
                          >
                            <FormattedMessage id="signIn.signUp" />
                          </Button>
                        </div>
                      </div>
                    }
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <a className="ant-dropdown-link" href="#">
                      <FormattedMessage id="navbar.submenu.signIn" />
                      <FontAwesomeIcon
                        icon="caret-down"
                        className={styles.dropdownIcon}
                      />
                    </a>
                  </Dropdown>
                </Menu.Item>
              )}
            </Menu>
          </Container>
        </div>
      </Header>
    )
  }
}

const NavbarWithRouter = withRouter(injectIntl(UnauthorizedNavbar))

export { NavbarWithRouter as UnauthorizedNavbar }
