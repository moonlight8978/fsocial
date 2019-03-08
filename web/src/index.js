// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import { library } from '@fortawesome/fontawesome-svg-core'
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

import { App } from './app'

addLocaleData([...en, ...vi])

library.add(fas)

const root = document.getElementById('root')
if (root !== null) {
  ReactDOM.render(<App />, root)
}
