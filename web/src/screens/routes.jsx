import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { protectRoute } from '../components/auth'
import { paths } from '../config'

import { SignUp } from './sign-up'
import { Home } from './home'
import { User } from './user'
import { Hashtag } from './hashtag'

const SignUpScreen = protectRoute(SignUp, true)
const HomeScreen = protectRoute(Home)
const UserScreen = protectRoute(User)
const HashtagScreen = protectRoute(Hashtag)

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={paths.signUp.route} exact component={SignUpScreen} />
        <Route path={paths.home.route} exact component={HomeScreen} />
        <Route path={paths.user.route} component={UserScreen} />
        <Route path={paths.hashtag.route} component={HashtagScreen} />
      </Switch>
    )
  }
}

export default Routes
