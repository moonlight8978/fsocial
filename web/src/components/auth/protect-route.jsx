import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withLoading, EdgeLoading } from '../loading'

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
      this.props.finishLoading()
    }

    render() {
      const { isLoading, auth } = this.props
      const isUnauthorized = authSelectors.getIsUnauthorized(auth)

      if (isLoading) {
        return <Loading />
      }

      if (!allowGuest && isUnauthorized) {
        return <Redirect to="/sign_up" />
      }

      if (allowGuest && !isUnauthorized) {
        return <Redirect to="/" />
      }

      return <Component {...this.props} />
    }
  }

  return withAuthContext(withLoading(ProtectedRoute))
}
