import React from 'react'
import classnames from 'classnames'

import styles from './cover.module.scss'

const Cover = ({ className, ...rest }) => (
  <div className={classnames(styles.coverContainer, className)}>
    <img className={styles.coverThumb} alt="Cover" {...rest} />
  </div>
)

export default Cover
