import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { protectRoute } from '../components/auth'
import { paths } from '../config'

import { SignUp } from './sign-up'
import { Home } from './home'
import { User } from './user'
import { Hashtag } from './hashtag'
import { Settings } from './settings'
import { Dashboard } from './dashboard'

const SignUpScreen = protectRoute(SignUp, true)
const HomeScreen = protectRoute(Home)
const UserScreen = protectRoute(User)
const HashtagScreen = protectRoute(Hashtag)
const SettingsScreen = protectRoute(Settings)
const DashboardScreen = protectRoute(Dashboard)

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={paths.signUp.route} exact component={SignUpScreen} />
        <Route path={paths.home.route} exact component={HomeScreen} />
        <Route path={paths.user.route} component={UserScreen} />
        <Route path={paths.hashtag.route} component={HashtagScreen} />
        <Route path={paths.settings.route} component={SettingsScreen} />
        <Route path={paths.dashboard.route} component={DashboardScreen} />
      </Switch>
    )
  }
}

export default Routes
