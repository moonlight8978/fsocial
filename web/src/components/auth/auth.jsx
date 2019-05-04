/* eslint-disable react/no-unused-state */
import React from 'react'
import _ from 'lodash'

import { PersistedStorage } from '../../services/persisted-storage'
import { UserResource } from '../../resources/user'

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
  fetchProfile: () => {},
  setUser: () => {},
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
    this.fetchProfile = this.fetchProfile.bind(this)
    this.persistState = this.persistState.bind(this)
    this.setUser = this.setUser.bind(this)

    this.state = {
      ...initialState,
      signIn: this.signIn,
      signOut: this.signOut,
      register: this.register,
      fetchProfile: this.fetchProfile,
      setUser: this.setUser,
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.persistState, false)
  }

  async fetchProfile() {
    try {
      const { data: profile } = await AuthApi.fetchProfile()
      await this.setStateAsync({
        user: UserResource.Profile.parse(profile),
        isAuthenticated: true,
      })
    } catch (error) {
      await this.signOut()
    }
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

  async setUser(user) {
    await this.setStateAsync({ user: { ...this.state.user, ...user } })
  }

  async signIn(user) {
    try {
      const response = await AuthApi.signIn(user)
      const session = AuthResources.Session.parse(response.data)
      await this.setStateAsync({
        token: session.token,
        expiredAt: session.expiredAt,
      })
      await this.fetchProfile()
    } catch (error) {
      await this.signOut()
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
      })
      await this.fetchProfile()
    } catch (error) {
      await this.signOut()
      throw error
    }
  }

  render() {
    return <AuthContext.Provider value={this.state} {...this.props} />
  }
}
