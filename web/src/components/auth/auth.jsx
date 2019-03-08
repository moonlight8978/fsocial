/* eslint-disable react/no-unused-state */
import React from 'react'
import _ from 'lodash'

import { PersistedStorage } from '../../services/persisted-storage'

import { AuthApi } from './auth-api'
import { AuthResources } from './auth-resources'

const defaultState = {
  isAuthenticated: false,
  token: '',
  expiredAt: 0,
  user: {},
  signIn: () => {},
  signOut: () => {},
}

const persistedState = PersistedStorage.get('auth')

const initialState = _.merge({}, defaultState, persistedState)

export const AuthContext = React.createContext(initialState)

export const AuthConsumer = AuthContext.Consumer

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props)

    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.persistState = this.persistState.bind(this)

    this.state = {
      ...initialState,
      signIn: this.signIn,
      signOut: this.signOut,
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.persistState, false)
  }

  persistState() {
    PersistedStorage.set(
      'auth',
      _.pick(this.state, ['isAuthenticated', 'token', 'expiredAt'])
    )
  }

  async signIn(user) {
    try {
      const response = await AuthApi.signIn(user)
      const session = AuthResources.Session.parse(response.data)
      this.setState(
        {
          token: session.token,
          expiredAt: session.expiredAt,
          isAuthenticated: true,
        },
        this.persistState
      )
    } catch (error) {
      throw error
    }
  }

  async signOut() {
    this.setState(
      _.pick(defaultState, ['isAuthenticated', 'token', 'expiredAt']),
      this.persistState
    )
  }

  render() {
    return <AuthContext.Provider value={this.state} {...this.props} />
  }
}
