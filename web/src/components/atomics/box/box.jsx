import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import classnames from 'classnames'

import styles from './box.module.scss'

export class Box extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
    bordered: PropTypes.bool,
  }

  static defaultProps = {
    title: null,
    className: '',
    bordered: false,
  }

  static BoxTitle = ({ children }) => (
    <div className={styles.boxTitle}>{children}</div>
  )

  render() {
    const { children, title, className, bordered } = this.props

    return (
      <div
        className={classnames(styles.box, className, {
          [styles.bordered]: bordered,
        })}
      >
        {title && (
          <>
            <Box.BoxTitle>{title}</Box.BoxTitle>
            <Divider className={styles.divider} />
          </>
        )}
        {children}
      </div>
    )
  }
}

Box.BoxTitle.propTypes = {
  children: PropTypes.node.isRequired,
}
