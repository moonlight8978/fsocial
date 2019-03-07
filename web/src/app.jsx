import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from './components/locale'
import { Routes } from './screens/routes'
import { AuthProvider } from './components/auth'

export class App extends React.Component<Props> {
  render() {
    return (
      <LocaleProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="App">
              <Routes />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </LocaleProvider>
    )
  }
}
