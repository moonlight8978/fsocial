import React from 'react'
import { injectIntl } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../config'
import { Layout, Navbar } from '../layout'
import { Text, Box, Ellipsis } from '../../components/atomics'
import {
  withLoading,
  FluidLoading,
  LoadingPropTypes,
} from '../../components/loading'
import { AsyncUtils } from '../../utils'
import { StatisticsProvider } from '../../components/statistics'
import { FollowingProvider } from '../../components/following'

import styles from './user.module.scss'
import UserResource from './user-resource'
import UserApi from './user-api'
import { Activities, Followers, Followees, Shares, Favorites } from './screens'
import { Header, UserIntro, FolloweeSuggestion } from './layout'

class User extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape().isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    ...LoadingPropTypes,
  }

  constructor(props) {
    super(props)

    this.state = {
      user: {},
    }

    this.handleChangeRoute = this.handleChangeRoute.bind(this)
  }

  async componentDidMount() {
    this.fetchUser()
  }

  async componentDidUpdate({ match: prevMatch }) {
    const { match, startLoading } = this.props
    if (match.params.username !== prevMatch.params.username) {
      startLoading()
      this.fetchUser()
    }
  }

  async fetchUser() {
    const { history, finishLoading, match } = this.props
    try {
      const { data } = await UserApi.fetch(match.params.username)
      await AsyncUtils.delay(1000)
      this.setState({ user: UserResource.parse(data) }, finishLoading)
    } catch (error) {
      console.log(error)
      history.push(paths.home.resolve())
    }
  }

  handleChangeRoute({ key }) {
    this.props.history.push(key)
  }

  render() {
    const { intl, isLoading, match } = this.props
    const { url } = match

    if (isLoading) {
      return <FluidLoading />
    }

    const { user } = this.state
    const { username, fullname } = user

    return (
      <StatisticsProvider user={user}>
        <FollowingProvider authorized={false}>
          <Switch>
            <Route
              path={`${url}`}
              exact
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage(
                    { id: 'user.activities.windowTitle' },
                    { username, fullname }
                  )}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={<UserIntro user={user} />}
                  header={<Header user={user} />}
                  className={styles.layout}
                >
                  <Activities user={user} />
                </Layout>
              )}
            />
            <Route
              path={`${url}/following`}
              exact
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={
                    <Box title={<Text bold>Profile Intro</Text>} bordered>
                      <Ellipsis>
                        <Text bold size="xxlarge">
                          {fullname}
                        </Text>
                        <br />
                        <Text color="secondary">@{username}</Text>
                      </Ellipsis>
                    </Box>
                  }
                  className={styles.layout}
                  header={<Header user={user} />}
                >
                  <Followees user={user} />
                </Layout>
              )}
            />
            <Route
              path={`${url}/followers`}
              exact
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={
                    <Box title={<Text bold>Profile Intro</Text>} bordered>
                      <Ellipsis>
                        <Text bold size="xxlarge">
                          {fullname}
                        </Text>
                        <br />
                        <Text color="secondary">@{username}</Text>
                      </Ellipsis>
                    </Box>
                  }
                  className={styles.layout}
                  header={<Header user={user} />}
                >
                  <Followers user={user} />
                </Layout>
              )}
            />
            <Route
              path={`${url}/shares`}
              exact
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={
                    <Box title={<Text bold>Profile Intro</Text>} bordered>
                      <Ellipsis>
                        <Text bold size="xxlarge">
                          {fullname}
                        </Text>
                        <br />
                        <Text color="secondary">@{username}</Text>
                      </Ellipsis>
                    </Box>
                  }
                  className={styles.layout}
                  header={<Header user={user} />}
                >
                  <Shares user={user} />
                </Layout>
              )}
            />
            <Route
              path={`${url}/favorites`}
              exact
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={
                    <Box title={<Text bold>Profile Intro</Text>} bordered>
                      <Ellipsis>
                        <Text bold size="xxlarge">
                          {fullname}
                        </Text>
                        <br />
                        <Text color="secondary">@{username}</Text>
                      </Ellipsis>
                    </Box>
                  }
                  className={styles.layout}
                  header={<Header user={user} />}
                >
                  <Favorites user={user} />
                </Layout>
              )}
            />
          </Switch>
        </FollowingProvider>
      </StatisticsProvider>
    )
  }
}

export default injectIntl(withLoading(User))
