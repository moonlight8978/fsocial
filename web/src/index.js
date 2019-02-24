import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'

import './index.css'

import { LocaleProvider } from './components/locale'
import App from './App'

addLocaleData([...en, ...vi])

ReactDOM.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>,
  document.getElementById('root')
)
