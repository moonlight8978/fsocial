import * as React from 'react'

export function withLoading(Component) {
  class WithLoading extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isLoading: true,
      }

      this.startLoading = this.changeLoading(true).bind(this)
      this.finishLoading = this.changeLoading(false).bind(this)
    }

    changeLoading(isLoading) {
      return () => {
        this.setState({ isLoading })
      }
    }

    render() {
      const { isLoading } = this.state

      return (
        <Component
          isLoading={isLoading}
          startLoading={this.startLoading}
          finishLoading={this.finishLoading}
        />
      )
    }
  }

  return WithLoading
}
