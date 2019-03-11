// @flow

type Config = {
  server: {
    host: string,
    prefix: string,
    authorizationHeader: string,
  },
}

const test = {
  server: {
    host: 'http://localhost:60001',
    prefix: '/api/v1',
    authorizationHeader: 'Authorization',
  },
}

const development = {
  server: {
    host: 'http://localhost:60001',
    prefix: '/api',
    authorizationHeader: 'Authorization',
  },
}

const staging = {
  server: {
    host: 'http://fsocial.moonlight8978.asia',
    prefix: '/api',
    authorizationHeader: 'Fsocial-Authorization',
  },
}

const env = process.env.REACT_APP_REACT_ENV || 'test'

const allSettings = {
  test,
  development,
  staging,
}

export const settings: Config = allSettings[env]
