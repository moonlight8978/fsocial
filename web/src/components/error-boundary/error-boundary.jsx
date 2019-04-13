import React from 'react'

class ErrorBoundary extends React.PureComponent {
  state = {
    error: null,
  }

  componentDidCatch(error) {
    this.setState({ error })
    console.log(error)
  }

  render() {
    if (this.state.error) {
      return <div>Something went wrong</div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
