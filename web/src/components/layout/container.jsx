// @flow
import * as React from 'react'

import styles from './container.module.scss'

export function Container({ children }: { children: React.Node }) {
  return <div className={styles.container}>{children}</div>
}
