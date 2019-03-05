// @flow
import * as React from 'react'
import { Divider } from 'antd'
import classnames from 'classnames'

import styles from './box.module.scss'

type BoxProps = {
  title: string | React.Node,
  className: string,
  bordered: boolean,
  children: React.Node,
}

type BoxTitleProps = {
  children: React.Node,
}

export class Box extends React.Component<BoxProps> {
  static defaultProps = {
    title: '',
    className: '',
    bordered: false,
  }

  static BoxTitle = ({ children }: BoxTitleProps) => (
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
