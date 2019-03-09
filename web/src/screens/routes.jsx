import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { protectRoute } from '../components/auth'
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
  }

  async componentDidMount() {
    await AsyncUtils.delay(1000)
    this.props.finishLoading()
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

const RoutesWithLoading = withLoading(Routes)

export { RoutesWithLoading as Routes }
