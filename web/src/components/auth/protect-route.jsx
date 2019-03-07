import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withLoading, EdgeLoading } from '../loading'

import { AuthContext } from './auth'
import { authSelectors } from './auth-selectors'

export function protectRoute(
  Component,
  allowGuest = false,
  loading = EdgeLoading
) {
  class ProtectedRoute extends React.Component {
    static contextType = AuthContext

    static propTypes = {
      isLoading: PropTypes.bool.isRequired,
      finishLoading: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.precheck()
    }

    async precheck() {
      this.props.finishLoading()
    }

    render() {
      const { isLoading } = this.props
      const authContext = this.context
      const isUnauthorized = authSelectors.getIsUnauthorized(authContext)

      if (isLoading) {
        return loading
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

  return withLoading(ProtectedRoute)
}
