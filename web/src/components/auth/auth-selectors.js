const getIsAuthenticated = state => state.isAuthenticated

const getToken = state => state.token

const getExpiredAt = state => parseInt(state.expiredAt, 10)

const getUser = state => state.user

const isTokenExpired = expiredAt => expiredAt <= new Date().getTime()

const getIsVerified = state => {
  const isAuthenticated = getIsAuthenticated(state)
  const token = getToken(state)
  const expiredAt = getExpiredAt(state)
  return isAuthenticated && token && expiredAt && !isTokenExpired(expiredAt)
}

const getIsUnauthorized = state =>
  !state.isAuthenticated && !state.token && !state.expiredAt

export const authSelectors = {
  getIsAuthenticated,
  getToken,
  getExpiredAt,
  getIsVerified,
  getIsUnauthorized,
  getUser,
}
