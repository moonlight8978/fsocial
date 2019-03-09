import React from 'react'

import { Layout, Navbar } from '../layout'

export class Home extends React.Component {
  render() {
    return (
      <Layout hasNavbar navbar={<Navbar />}>
        <div>Home</div>
      </Layout>
    )
  }
}
