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
  register: () => {},
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
    this.register = this.register.bind(this)
    this.persistState = this.persistState.bind(this)

    this.state = {
      ...initialState,
      signIn: this.signIn,
      signOut: this.signOut,
      register: this.register,
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

  setStateAsync(newState) {
    return new Promise(resolve => {
      this.setState(newState, () => {
        this.persistState()
        resolve()
      })
    })
  }

  async signIn(user) {
    try {
      const response = await AuthApi.signIn(user)
      const session = AuthResources.Session.parse(response.data)
      await this.setStateAsync({
        token: session.token,
        expiredAt: session.expiredAt,
        isAuthenticated: true,
      })
    } catch (error) {
      throw error
    }
  }

  async signOut() {
    await this.setStateAsync(
      _.pick(defaultState, ['isAuthenticated', 'token', 'expiredAt'])
    )
  }

  async register(user) {
    try {
      const response = await AuthApi.register(user)
      const session = AuthResources.Session.parse(response.data)
      await this.setStateAsync({
        token: session.token,
        expiredAt: session.expiredAt,
        isAuthenticated: true,
      })
    } catch (error) {
      throw error
    }
  }

  render() {
    return <AuthContext.Provider value={this.state} {...this.props} />
  }
}
