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

export class Text extends React.Component<Props> {
  static defaultProps = {
    content: '',
    children: null,
    size: 'normal',
    color: 'primary',
  }

  render() {
    const { content, children, size, color } = this.props
    const sizeClassName = `size-${size}`
    const colorClassName = `color-${color}`

    return (
      <span
        className={classnames(styles[sizeClassName], styles[colorClassName])}
      >
        {children || content}
      </span>
    )
  }
}
