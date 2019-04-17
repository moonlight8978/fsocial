import React from 'react'
import sanitizeHtml from 'sanitize-html'

class SanitizedHtml extends React.PureComponent {
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
