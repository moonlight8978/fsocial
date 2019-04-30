import React from 'react'
import PropTypes from 'prop-types'

import { AuthConsumer } from './auth'

const roleEnums = {
  admin: 999,
  user: 1,
}

const checkRole = (currentRole, requiredRole) =>
  roleEnums[currentRole] >= roleEnums[requiredRole]

export const Authorized = ({ requiredRole, children }) => (
  <AuthConsumer>
    {({ isAuthenticated, user }) =>
      isAuthenticated && checkRole(user.role, requiredRole) ? children : null
    }
  </AuthConsumer>
)

Authorized.propTypes = {
  requiredRole: PropTypes.oneOf(['admin', 'user']).isRequired,
  children: PropTypes.node.isRequired,
}

export const Unauthorized = ({ children }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (!isAuthenticated ? children : null)}
  </AuthConsumer>
)

Unauthorized.propTypes = {
  children: PropTypes.node.isRequired,
}
