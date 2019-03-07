import React from 'react'
import _ from 'lodash'
import i18n from 'i18next'
import PropTypes from 'prop-types'

import { PersistedStorage } from '../../services/persisted-storage'
import { UserPreferencesUtils } from '../../utils'

import { defaultLocale } from './locale.constant'

const persistedState = PersistedStorage.get('locale')

const defaultState = {
  currentLocale: UserPreferencesUtils.getBrowserLocale() || defaultLocale,
  changeLocale: () => {},
}

const initialState = _.merge({}, defaultState, persistedState)

export const LocaleContext = React.createContext(initialState)

const { Provider, Consumer } = LocaleContext

export const LocaleConsumer = Consumer

class LocaleProvider extends React.Component {
  constructor(props) {
    super(props)

    this.changeLocaleHandlers = {}
    this.handleChangeLocale = this.handleChangeLocale.bind(this)
    this.persistState = this.persistState.bind(this)

    this.state = {
      ...initialState,
      // eslint-disable-next-line react/no-unused-state
      changeLocale: this.handleChangeLocale,
    }
  }

  componentDidMount() {
    i18n.changeLanguage(this.state.currentLocale)
    window.addEventListener('beforeunload', this.persistState, false)
  }

  handleChangeLocale(newLocale) {
    if (!this.changeLocaleHandlers[newLocale]) {
      this.changeLocaleHandlers[newLocale] = () => {
        this.setState({ currentLocale: newLocale }, this.persistState)
        i18n.changeLanguage(newLocale)
      }
    }
    return this.changeLocaleHandlers[newLocale]
  }

  persistState() {
    PersistedStorage.set('locale', _.pick(this.state, ['currentLocale']))
  }

  render() {
    const { children } = this.props

    return <Provider value={this.state}>{children}</Provider>
  }
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LocaleProvider }
