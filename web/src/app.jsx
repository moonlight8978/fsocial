import React from 'react'
import PropTypes from 'prop-types'

import { withAuthContext, authSelectors } from './components/auth'
import { withLoading, FullscreenLoading } from './components/loading'
import { StatisticsProvider } from './components/statistics'
import { FollowingProvider } from './components/following'
import { Routes } from './screens'
import { AsyncUtils } from './utils'

class App extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    finishLoading: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      fetchProfile: PropTypes.func.isRequired,
    }).isRequired,
  }

  async componentDidMount() {
    const { finishLoading, auth } = this.props
    const isAuthenticated = !authSelectors.getIsUnauthorized(auth)
    const isValidSession = authSelectors.getIsVerified(auth)

    if (!isValidSession && isAuthenticated) {
      await auth.signOut()
    }
    if (isValidSession && isAuthenticated) {
      await auth.fetchProfile()
    }

    await AsyncUtils.delay(0)
    finishLoading()
  }

  render() {
    const { isLoading, auth } = this.props

    if (isLoading) {
      return <FullscreenLoading />
    }

    const isValidSession = authSelectors.getIsVerified(auth)

    if (isValidSession) {
      return (
        <div className="App">
          <StatisticsProvider>
            <FollowingProvider>
              <Routes />
            </FollowingProvider>
          </StatisticsProvider>
        </div>
      )
    }

    return (
      <div className="App">
        <Routes />
      </div>
    )
  }
}

export default withAuthContext(withLoading(App))
