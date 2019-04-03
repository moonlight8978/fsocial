// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import { library } from '@fortawesome/fontawesome-svg-core'
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from './components/locale'
import { AuthProvider } from './components/auth'
import './index.scss'
import App from './app'

addLocaleData([...en, ...vi])

library.add(fas, far, fab)

const root = document.getElementById('root')
if (root !== null) {
  ReactDOM.render(
    <LocaleProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LocaleProvider>,
    root
  )
}
