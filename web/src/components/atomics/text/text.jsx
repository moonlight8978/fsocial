import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './text.module.scss'

export function Text({
  content,
  children,
  size,
  color,
  bold,
  className,
  hoverColor,
  hover,
}) {
  const sizeClassName = `size-${size}`
  const colorClassName = `color-${color}`
  const hoverColorClassName = `hover-color-${hoverColor}`

  return (
    <span
      className={classnames(styles[sizeClassName], styles[colorClassName], {
        [styles.bold]: bold,
        [className]: className,
        [styles[hoverColorClassName]]: hover,
      })}
    >
      {children !== null ? children : content}
    </span>
  )
}

Text.defaultProps = {
  content: '',
  children: null,
  size: 'normal',
  color: 'primary',
  bold: false,
  className: '',
  hover: false,
  hoverColor: 'primary',
}

Text.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['small', 'normal', 'large', 'xlarge', 'xxlarge']),
  color: PropTypes.oneOf(['primary', 'link', 'secondary', 'contrast']),
  bold: PropTypes.bool,
  className: PropTypes.string,
  hover: PropTypes.bool,
  hoverColor: PropTypes.oneOf(['primary', 'link', 'secondary', 'contrast']),
}
