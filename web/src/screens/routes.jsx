import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { protectRoute } from '../components/auth'
import { withLoading, FluidLoading } from '../components/loading'
import { AsyncUtils } from '../utils'

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
    await AsyncUtils.delay(3000)
    this.props.finishLoading()
  }

  render() {
    const { isLoading } = this.props

    if (isLoading) {
      return <FluidLoading />
    }

    return (
      <Switch>
        <Route path="/sign_up" exact component={SignUpScreen} />
        <Route path="/" exact component={HomeScreen} />
      </Switch>
    )
  }
}

const RoutesWithLoading = withLoading(Routes)

export { RoutesWithLoading as Routes }
