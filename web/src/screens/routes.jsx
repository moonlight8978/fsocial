import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { protectRoute } from '../components/auth'
import { paths } from '../config'

import { SignUp } from './sign-up'
import { Home } from './home'
import { User } from './user'

const SignUpScreen = protectRoute(SignUp, true)
const HomeScreen = protectRoute(Home)
const UserScreen = protectRoute(User)

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={paths.signUp.route} exact component={SignUpScreen} />
        <Route path={paths.home.route} exact component={HomeScreen} />
        <Route path={paths.user.route} component={UserScreen} />
      </Switch>
    )
  }
}

export default Routes
