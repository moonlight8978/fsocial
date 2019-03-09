import React from 'react'
import PropTypes from 'prop-types'

class WindowTitle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.setDocumentTitle()
  }

  setDocumentTitle() {
    document.title = this.props.title
  }

  render() {
    return null
  }
}

export default WindowTitle
