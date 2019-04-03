import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../config'
import { withLoading, EdgeLoading } from '../loading'
import { StatisticsProvider } from '../statistics'
import { FollowingProvider } from '../following'

import { authSelectors } from './auth-selectors'
import { withAuthContext } from './with-auth-context'

export function protectRoute(
  Component,
  allowGuest = false,
  Loading = EdgeLoading
) {
  class ProtectedRoute extends React.Component {
    static propTypes = {
      isLoading: PropTypes.bool.isRequired,
      finishLoading: PropTypes.func.isRequired,
      auth: PropTypes.shape().isRequired,
    }

    componentDidMount() {
      this.precheck()
    }

    async precheck() {
      const { auth } = this.props
      const isVerified = authSelectors.getIsVerified(auth)
      try {
        if (!allowGuest && !isVerified) {
          await auth.signOut()
        }
      } finally {
        this.props.finishLoading()
      }
    }

    render() {
      const { isLoading, auth } = this.props
      const isVerified = authSelectors.getIsVerified(auth)

      if (isLoading) {
        return <Loading />
      }

      if (!allowGuest && !isVerified) {
        return <Redirect to={paths.signUp.resolve()} />
      }

      if (allowGuest && isVerified) {
        return <Redirect to={paths.home.resolve()} />
      }

      if (isVerified) {
        return (
          <StatisticsProvider>
            <FollowingProvider>
              <Component {...this.props} />
            </FollowingProvider>
          </StatisticsProvider>
        )
      }

      return <Component {...this.props} />
    }
  }

  return withAuthContext(withLoading(ProtectedRoute))
}
