import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'

import { paths } from '../../config'
import { Layout, Navbar } from '../layout'
import { Text, Box, Ellipsis } from '../../components/atomics'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { withLoading, FluidLoading } from '../../components/loading'
import { AsyncUtils } from '../../utils'

import styles from './user.module.scss'
import UserResource from './user-resource'
import UserApi from './user-api'
import { Posts, Followers, Following, Shares, Favorites } from './screens'
import Header from './header'

class User extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
    }

    this.handleChangeRoute = this.handleChangeRoute.bind(this)
  }

  async componentDidMount() {
    const {
      match: { params },
      history,
      finishLoading,
    } = this.props
    try {
      const { data } = await UserApi.fetch(params.username)
      await AsyncUtils.delay(1000)
      this.setState({ user: UserResource.parse(data) }, finishLoading)
    } catch (error) {
      console.log(error)
      history.push(paths.home.resolve())
    }
  }

  async componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props
    if (match.params.username !== prevMatch.params.username) {
      const { history, finishLoading, startLoading } = this.props
      startLoading()
      try {
        const { data } = await UserApi.fetch(match.params.username)
        await AsyncUtils.delay(1000)
        this.setState({ user: UserResource.parse(data) }, finishLoading)
      } catch (error) {
        console.log(error)
        history.push(paths.home.resolve())
      }
    }
  }

  handleChangeRoute({ key }) {
    this.props.history.push(key)
  }

  render() {
    const { intl, isLoading, match } = this.props
    const { path, url } = match

    if (isLoading) {
      return <FluidLoading />
    }

    const { user } = this.state
    const { username, fullname } = user

    return (
      <Switch>
        <Route
          path={`${url}`}
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
              <Posts user={user} />
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
              <Following user={user} />
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
    )
  }
}

export default injectIntl(withLoading(User))
