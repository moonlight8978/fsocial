import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  protectRoute,
  withAuthContext,
  authSelectors,
} from '../components/auth'
import { withLoading, FullscreenLoading } from '../components/loading'
import { AsyncUtils } from '../utils'
import { paths } from '../config'

import { SignUp } from './sign-up'
import { Home } from './home'

const SignUpScreen = protectRoute(SignUp, true)
const HomeScreen = protectRoute(Home)

class Routes extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    finishLoading: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      fetchProfile: PropTypes.func.isRequired,
    }).isRequired,
  }

  async componentDidMount() {
    const { finishLoading, auth } = this.props
    const isAuthenticated = authSelectors.getIsVerified(auth)
    if (isAuthenticated) {
      await auth.fetchProfile()
    }
    await AsyncUtils.delay(3000)
    finishLoading()
  }

  render() {
    const { isLoading } = this.props

    if (isLoading) {
      return <FullscreenLoading />
    }

    return (
      <Switch>
        <Route path={paths.signUp.route} exact component={SignUpScreen} />
        <Route path={paths.home.route} exact component={HomeScreen} />
      </Switch>
    )
  }
}

export default withAuthContext(withLoading(Routes))
