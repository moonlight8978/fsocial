// @flow
import * as React from 'react'
import classnames from 'classnames'

import styles from './text.module.scss'

type Sizes = 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge'

type Colors = 'primary' | 'link' | 'secondary' | 'contrast'

type Props = {
  content: string,
  children: ?React.Node,
  size: Sizes,
  color: Colors,
}

export function Text({ content, children, size, color }: Props) {
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
