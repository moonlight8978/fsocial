import React from 'react'
import PropTypes from 'prop-types'

import styles from './box.module.scss'

export default class BoxList extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return <div className={styles.boxList}>{this.props.children}</div>
  }
}
