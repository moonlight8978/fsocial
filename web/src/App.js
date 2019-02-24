import React from 'react'
import { FormattedMessage } from 'react-intl'

import { LocaleProvider, LocaleConsumer } from './components/locale'

class App extends React.PureComponent {
  render() {
    return (
      <LocaleProvider>
        <div className="App">
          <FormattedMessage id="helloWorld" />

          <LocaleConsumer>
            {({ changeLocale }) => (
              <>
                <button onClick={changeLocale('vi')} type="button">
                  Tiếng Việt
                </button>
                <button onClick={changeLocale('en')} type="button">
                  English
                </button>
              </>
            )}
          </LocaleConsumer>
        </div>
      </LocaleProvider>
    )
  }
}

export default App
