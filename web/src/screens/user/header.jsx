import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Avatar, Row, Col, Menu } from 'antd'
import { Route, Switch, withRouter } from 'react-router-dom'

import { paths } from '../../config'
import { Layout, Navbar, Container } from '../layout'
import { Text, Box, Ellipsis } from '../../components/atomics'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { withLoading, FluidLoading } from '../../components/loading'
import { AsyncUtils } from '../../utils'

import styles from './user.module.scss'

class Header extends React.PureComponent {
  static MenuLink = ({ title, count }) => (
    <Text hover hoverColor="link">
      <div>
        <Text bold color="secondary" size="small">
          {title}
        </Text>
      </div>
      <div>
        <Text bold color="secondary" size="xlarge">
          {count}
        </Text>
      </div>
    </Text>
  )

  constructor(props) {
    super(props)

    this.handleChangeRoute = this.handleChangeRoute.bind(this)
  }

  handleChangeRoute({ key }) {
    this.props.history.push(key)
  }

  render() {
    const { user, match } = this.props
    const { path } = match
    const { username } = user

    return (
      <div className={styles.header}>
        <div className={styles.profilePictures}>
          <div className={styles.cover}>
            <img src="/cover-placeholder.png" alt="Cover" />
          </div>

          <Container>
            <div className={styles.avatar}>
              <Avatar
                className={styles.avatarThumb}
                size={200}
                src="/avatar-placeholder.png"
                alt="Avatar"
              />
            </div>
          </Container>
        </div>

        <nav className={styles.nav}>
          <Container>
            <Row gutter={16}>
              <Col offset={6} span={12}>
                <Menu
                  mode="horizontal"
                  selectedKeys={[path]}
                  className={styles.menu}
                >
                  <Menu.Item
                    key={paths.user.resolve({ username })}
                    className={styles.menuItem}
                    onClick={this.handleChangeRoute}
                  >
                    <Header.MenuLink title="Posts" count="123" />
                  </Menu.Item>

                  <Menu.Item
                    key={paths.user.extend({ username }, '/following')}
                    className={styles.menuItem}
                    onClick={this.handleChangeRoute}
                  >
                    <Header.MenuLink title="Following" count="123" />
                  </Menu.Item>

                  <Menu.Item
                    key={paths.user.extend({ username }, '/followers')}
                    className={styles.menuItem}
                    onClick={this.handleChangeRoute}
                  >
                    <Header.MenuLink title="Followers" count="123" />
                  </Menu.Item>

                  <Menu.Item
                    key={paths.user.extend({ username }, '/shares')}
                    className={styles.menuItem}
                    onClick={this.handleChangeRoute}
                  >
                    <Header.MenuLink title="Shares" count="123" />
                  </Menu.Item>

                  <Menu.Item
                    key={paths.user.extend({ username }, '/favorites')}
                    className={styles.menuItem}
                    onClick={this.handleChangeRoute}
                  >
                    <Header.MenuLink title="Favorites" count="123" />
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Container>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
