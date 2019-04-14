import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

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
