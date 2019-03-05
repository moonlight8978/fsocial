// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react'
import { Layout, Menu, Dropdown } from 'antd'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'

import { Container } from '../container'

import styles from './navbar.module.scss'
import { SignInMenu } from './sign-in-menu'

const { Header } = Layout

type Props = {
  match: {
    path: string,
  },
  history: {
    push: (path: string) => void,
  },
  hasSubmenu?: boolean,
  submenu?: React.Node,
}

type State = {
  isMenuVisible: boolean,
}

class UnauthorizedNavbar extends React.Component<Props, State> {
  static propTypes = {}

  static defaultProps = {
    hasSubmenu: false,
    submenu: <SignInMenu />,
  }

  constructor(props) {
    super(props)

    this.state = {
      isMenuVisible: false,
    }

    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
  }

  handleVisibleChange: (visibility: boolean) => void

  handleVisibleChange(visibility: boolean) {
    this.setState({ isMenuVisible: visibility })
  }

  handleRouteChange: ({ key: string }) => void

  handleRouteChange({ key }: { key: string }) {
    this.props.history.push(key)
  }

  render() {
    const { path } = this.props.match
    const { submenu, hasSubmenu } = this.props

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
                    overlay={submenu}
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

const NavbarWithRouter = withRouter(UnauthorizedNavbar)

export { NavbarWithRouter as UnauthorizedNavbar }
