import React from 'react'

import { ObjectUtils } from '../../utils/object-utils'

import { AuthConsumer } from './auth'

export function withAuthContext(Component, pickedProps = null) {
  function WithAuthContext(props) {
    return (
      <AuthConsumer>
        {authContext => (
          <Component
            {...props}
            auth={ObjectUtils.pick(authContext, pickedProps)}
          />
        )}
      </AuthConsumer>
    )
  }

  return WithAuthContext
}
