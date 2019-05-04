import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Text } from '../../atomics'

import styles from './role.module.scss'

const Role = ({ role, className }) => {
  const roleClassName = role === 'admin' ? styles.admin : styles.user

  return (
    <Text
      className={classnames(styles.role, roleClassName, className)}
      size="small"
      bold
    >
      {role}
    </Text>
  )
}

Role.propTypes = {
  role: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Role.defaultProps = {
  className: '',
}

export default Role
