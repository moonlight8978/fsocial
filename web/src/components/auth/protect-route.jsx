import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../config'
import { withLoading, EdgeLoading, LoadingPropTypes } from '../loading'

import { authSelectors } from './auth-selectors'
import { withAuthContext } from './with-auth-context'

export function protectRoute(
  Component,
  allowGuest = false,
  Loading = EdgeLoading
) {
  class ProtectedRoute extends React.Component {
    static propTypes = {
      auth: PropTypes.shape().isRequired,
      ...LoadingPropTypes,
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
      const {
        auth,
        isLoading,
        finishLoading, // eslint-disable-line no-unused-vars
        startLoading, // eslint-disable-line no-unused-vars
        ...rest
      } = this.props
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

      return <Component {...rest} />
    }
  }

  return withAuthContext(withLoading(ProtectedRoute))
}
