import React from 'react'
import { IntlProvider } from 'react-intl'
import PropTypes from 'prop-types'

import { UserPreferencesUtils } from '../../utils'
import { translations } from './translations'
import { defaultLocale } from './locale.constant'

const { Provider, Consumer } = React.createContext({
  currentLocale: '',
  changeLocale: () => {},
})

const initialLocale = UserPreferencesUtils.getBrowserLocale() || defaultLocale

class LocaleProvider extends React.PureComponent {
  constructor(props) {
    super(props)

    this.changeLocaleHandlers = {}
    this.handleChangeLocale = this.handleChangeLocale.bind(this)

    this.state = {
      currentLocale: initialLocale,
      // eslint-disable-next-line react/no-unused-state
      changeLocale: this.handleChangeLocale,
    }
  }

  handleChangeLocale(newLocale) {
    if (!this.changeLocaleHandlers[newLocale]) {
      this.changeLocaleHandlers[newLocale] = () => {
        this.setState({ currentLocale: newLocale })
      }
    }
    return this.changeLocaleHandlers[newLocale]
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

export { LocaleProvider, Consumer as LocaleConsumer }
