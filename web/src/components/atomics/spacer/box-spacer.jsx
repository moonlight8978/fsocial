import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './box-spacer.module.scss'

export default class BoxSpacer extends React.PureComponent {
  static propTypes = {
    top: PropTypes.bool,
    bottom: PropTypes.bool,
  }

  static defaultProps = {
    top: false,
    bottom: true,
  }

  render() {
    const { bottom, top } = this.props

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.top]: top,
          [styles.bottom]: bottom,
        })}
      >
        <div className={styles.inner} />
      </div>
    )
  }
}
