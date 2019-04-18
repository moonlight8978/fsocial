import React from 'react'
import sanitizeHtml from 'sanitize-html'
import PropTypes from 'prop-types'

class SanitizedHtml extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  }

  sanitize() {
    const { content } = this.props

    return sanitizeHtml(content, {
      allowedTags: ['a'],
      allowedAttributes: {
        a: ['href', 'target', 'class'],
      },
    })
  }

  render() {
    return <span dangerouslySetInnerHTML={{ __html: this.sanitize() }} />
  }
}

export default SanitizedHtml
