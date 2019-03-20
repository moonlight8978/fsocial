import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from './components/locale'
import { AuthProvider } from './components/auth'
import { FollowingProvider } from './components/following'
import { Routes } from './screens'

export class App extends React.Component {
  render() {
    return (
      <LocaleProvider>
        <AuthProvider>
          <FollowingProvider>
            <BrowserRouter>
              <div className="App">
                <Routes />
              </div>
            </BrowserRouter>
          </FollowingProvider>
        </AuthProvider>
      </LocaleProvider>
    )
  }
}
