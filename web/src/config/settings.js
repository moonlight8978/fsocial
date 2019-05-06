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
    websocket: 'ws://localhost:60001/api/cable',
    prefix: '/api/v1',
    authorizationHeader: 'Authorization',
  },
}

const development = {
  server: {
    host: 'http://localhost:60001',
    websocket: 'ws://localhost:60001/api/cable',
    prefix: '/api/v1',
    authorizationHeader: 'Authorization',
  },
}

const staging = {
  server: {
    host: 'http://fsocial.moonlight8978.asia/backend',
    websocket: 'ws://fsocial.moonlight8978.asia/backend/api/cable',
    prefix: '/api/v1',
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
