import React from 'react'
import { injectIntl } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../config'
import { Layout, Navbar } from '../layout'
import { BoxSpacer } from '../../components/atomics'
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
import { UserApi, UserActivitiesApi } from './user-api'
import { FollowingUserList } from './following'
import { ActivityList } from './activities'
import { Post } from './post'
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
    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
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

  handleFollow() {
    this.setState(state => ({
      user: { ...state.user, isFollowed: true },
    }))
  }

  handleUnfollow() {
    this.setState(state => ({
      user: { ...state.user, isFollowed: false },
    }))
  }

  render() {
    const { intl, isLoading, match } = this.props
    const { url } = match

    if (isLoading) {
      return <FluidLoading />
    }

    const { user } = this.state
    const { username, fullname, isCurrentUser } = user

    const header = (
      <Header
        user={user}
        onFollow={this.handleFollow}
        onUnfollow={this.handleUnfollow}
      />
    )

    return (
      <StatisticsProvider user={user}>
        <FollowingProvider authorized={isCurrentUser}>
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
                  header={header}
                  className={styles.layout}
                >
                  <ActivityList
                    user={user}
                    fetch={UserActivitiesApi.all(username)}
                    key="activities"
                  />
                </Layout>
              )}
            />
            <Route
              path={`${url}/posts/:id`}
              render={() => (
                <Layout
                  hasNavbar
                  navbar={<Navbar />}
                  windowTitle={intl.formatMessage({
                    id: 'user.post.windowTitle',
                  })}
                  hasSideRight
                  sideRight={<FolloweeSuggestion />}
                  hasSideLeft
                  sideLeft={<UserIntro user={user} />}
                  header={header}
                  className={styles.layout}
                >
                  <Post user={user} />
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
                  windowTitle={intl.formatMessage(
                    { id: 'user.followees.windowTitle' },
                    { username, fullname }
                  )}
                  hasSideLeft
                  sideLeft={
                    <aside>
                      <UserIntro user={user} />
                      <BoxSpacer />
                      <FolloweeSuggestion />
                    </aside>
                  }
                  className={styles.layout}
                  header={header}
                >
                  <FollowingUserList
                    fetch={UserApi.fetchFollowees}
                    user={user}
                    key="followees"
                  />
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
                  windowTitle={intl.formatMessage(
                    { id: 'user.followers.windowTitle' },
                    { username, fullname }
                  )}
                  hasSideLeft
                  sideLeft={
                    <aside>
                      <UserIntro user={user} />
                      <BoxSpacer />
                      <FolloweeSuggestion />
                    </aside>
                  }
                  className={styles.layout}
                  header={header}
                >
                  <FollowingUserList
                    fetch={UserApi.fetchFollowers}
                    user={user}
                    key="followers"
                  />
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
