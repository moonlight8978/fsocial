import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './text.module.scss'

export function Text({ content, children, size, color }) {
  const sizeClassName = `size-${size}`
  const colorClassName = `color-${color}`

  return (
    <span className={classnames(styles[sizeClassName], styles[colorClassName])}>
      {children || content}
    </span>
  )
}

Text.defaultProps = {
  content: '',
  children: null,
  size: 'normal',
  color: 'primary',
}

Text.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['small', 'normal', 'large', 'xlarge', 'xxlarge']),
  color: PropTypes.oneOf(['primary', 'link', 'secondary', 'contrast']),
}
