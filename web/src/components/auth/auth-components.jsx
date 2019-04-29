import React from 'react'

import { AuthConsumer } from './auth'
import { roles } from './roles'

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

export const Unauthorized = ({ children }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (!isAuthenticated ? children : null)}
  </AuthConsumer>
)
