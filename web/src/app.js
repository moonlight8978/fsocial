import React from 'react'
import { FormattedMessage } from 'react-intl'

import { LocaleProvider } from './components/locale'

export class App extends React.PureComponent {
  render() {
    return (
      <LocaleProvider>
        <div className="App">
          <FormattedMessage id="helloWorld" />
        </div>
      </LocaleProvider>
    )
  }
}
