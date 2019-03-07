import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

import { App } from './app'
import './components/locale/locale-initializer'

library.add(fas)

const root = document.getElementById('root')
if (root !== null) {
  ReactDOM.render(<App />, root)
}
