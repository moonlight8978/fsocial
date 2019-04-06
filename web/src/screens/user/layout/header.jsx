import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Avatar, Row, Col, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../../config'
import { Container } from '../../layout'
import { Text } from '../../../components/atomics'
import { StatisticsConsumer } from '../../../components/statistics'

import styles from './user.module.scss'

class Header extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.shape().isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }

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
      <StatisticsConsumer>
        {({
          postsCount,
          favoritesCount,
          sharesCount,
          followersCount,
          followeesCount,
        }) => (
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
                        <Header.MenuLink
                          title={
                            <FormattedMessage id="user.activities.navTitle" />
                          }
                          count={postsCount}
                        />
                      </Menu.Item>

                      <Menu.Item
                        key={paths.user.extend({ username }, '/following')}
                        className={styles.menuItem}
                        onClick={this.handleChangeRoute}
                      >
                        <Header.MenuLink
                          title="Following"
                          count={followeesCount}
                        />
                      </Menu.Item>

                      <Menu.Item
                        key={paths.user.extend({ username }, '/followers')}
                        className={styles.menuItem}
                        onClick={this.handleChangeRoute}
                      >
                        <Header.MenuLink
                          title="Followers"
                          count={followersCount}
                        />
                      </Menu.Item>

                      <Menu.Item
                        key={paths.user.extend({ username }, '/shares')}
                        className={styles.menuItem}
                        onClick={this.handleChangeRoute}
                      >
                        <Header.MenuLink title="Shares" count={sharesCount} />
                      </Menu.Item>

                      <Menu.Item
                        key={paths.user.extend({ username }, '/favorites')}
                        className={styles.menuItem}
                        onClick={this.handleChangeRoute}
                      >
                        <Header.MenuLink
                          title="Favorites"
                          count={favoritesCount}
                        />
                      </Menu.Item>
                    </Menu>
                  </Col>
                </Row>
              </Container>
            </nav>
          </div>
        )}
      </StatisticsConsumer>
    )
  }
}

export default withRouter(Header)