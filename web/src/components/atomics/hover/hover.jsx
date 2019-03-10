import React from 'react'
import PropTypes from 'prop-types'

import styles from './hover.module.scss'

class Hover extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    content: null,
  }

  render() {
    const { content, children } = this.props

    return (
      <div className={styles.hoverWrapper}>
        <div className={styles.hoverContent}>{content}</div>
        <div className={styles.defaultContent}>{children}</div>
      </div>
    )
  }
}

export default Hover
