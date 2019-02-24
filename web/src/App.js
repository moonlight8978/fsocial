import React from 'react'
import { FormattedMessage } from 'react-intl'

import { LocaleConsumer } from './components/locale'

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <FormattedMessage id="helloWorld" />

        <LocaleConsumer>
          {({ changeLocale }) => (
            <>
              <button onClick={changeLocale('vi')}>Tiếng Việt</button>
              <button onClick={changeLocale('en')}>English</button>
            </>
          )}
        </LocaleConsumer>
      </div>
    )
  }
}

export default App
