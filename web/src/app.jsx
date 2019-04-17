import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { withAuthContext, authSelectors } from './components/auth'
import { withLoading, FullscreenLoading } from './components/loading'
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
    const { isLoading } = this.props

    return (
      <div className="fsocial-app">
        {isLoading ? <FullscreenLoading /> : <Routes />}
      </div>
    )
  }
}

export default withAuthContext(withLoading(withRouter(App)))
