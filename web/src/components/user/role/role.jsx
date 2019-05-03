import React from 'react'
import classnames from 'classnames'

import styles from './role.module.scss'

const Role = ({ role, className }) => {
  const roleClassName = role === 'admin' ? styles.admin : styles.user

  return (
    <span className={classnames(styles.role, roleClassName, className)}>
      {role}
    </span>
  )
}

export default Role
