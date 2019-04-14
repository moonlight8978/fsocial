import React from 'react'
import { IntlProvider } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { PersistedStorage } from '../../services/persisted-storage'
import { UserPreferencesUtils } from '../../utils'

import { translations } from './translations'
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
    window.addEventListener('beforeunload', this.persistState, false)
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.currentLocale === nextState.currentLocale
  }

  handleChangeLocale(newLocale) {
    if (!this.changeLocaleHandlers[newLocale]) {
      this.changeLocaleHandlers[newLocale] = () => {
        this.setState({ currentLocale: newLocale }, () => {
          this.persistState()
          window.location.reload()
        })
      }
    }
    return this.changeLocaleHandlers[newLocale]
  }

  persistState() {
    PersistedStorage.set('locale', _.pick(this.state, ['currentLocale']))
  }

  render() {
    const { children } = this.props
    const { currentLocale } = this.state
    const messages = translations[currentLocale]

    return (
      <Provider value={this.state}>
        <IntlProvider locale={currentLocale} messages={messages}>
          {children}
        </IntlProvider>
      </Provider>
    )
  }
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LocaleProvider }
