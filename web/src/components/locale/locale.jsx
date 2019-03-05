// @flow
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import _ from 'lodash'

import { PersistedStorage } from '../../services/persisted-storage'
import { UserPreferencesUtils } from '../../utils'

import { translations } from './translations'
import { defaultLocale } from './locale.constant'

type State = {
  currentLocale: string,
  changeLocale: (language: string) => void,
}

type Props = {
  children: React.Node,
}

const persistedState = PersistedStorage.get('locale')

const defaultState = {
  currentLocale: UserPreferencesUtils.getBrowserLocale() || defaultLocale,
  changeLocale: (key?: string) => {},
}

const initialState = _.merge({}, defaultState, persistedState)

export const LocaleContext = React.createContext<State>(initialState)

const { Provider, Consumer } = LocaleContext

export const LocaleConsumer = Consumer

export class LocaleProvider extends React.Component<Props, State> {
  constructor(props: Props) {
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

  changeLocaleHandlers: { [locale: string]: () => void }

  handleChangeLocale: (newLocale: string) => () => void

  handleChangeLocale(newLocale: string) {
    if (!this.changeLocaleHandlers[newLocale]) {
      this.changeLocaleHandlers[newLocale] = () => {
        this.setState({ currentLocale: newLocale }, this.persistState)
      }
    }
    return this.changeLocaleHandlers[newLocale]
  }

  persistState: () => void

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
