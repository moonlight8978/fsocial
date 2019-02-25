import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'

import './index.css'

import { App } from './app'

addLocaleData([...en, ...vi])

ReactDOM.render(<App />, document.getElementById('root'))
