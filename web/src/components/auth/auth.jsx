/* eslint-disable react/no-unused-state */
import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import { PersistedStorage } from '../../services/persisted-storage'

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
      const { data } = await axios.post('http://localhost:60001/api/v1/users', {
        user,
      })
      this.setState(
        {
          token: data.token,
          expiredAt: new Date('9999-09-09').getTime(),
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
