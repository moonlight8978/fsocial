import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Text } from '../atomics'

import styles from './inline-name.module.scss'

function InlineName({ username, fullname, className }) {
  return (
    <span className={classnames(styles.name, { [className]: className })}>
      <Text bold className={styles.fullname}>
        {fullname}
      </Text>
      <Text className={styles.middot}>&middot;</Text>
      <Text color="secondary">@{username}</Text>
    </span>
  )
}

InlineName.propTypes = {
  username: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  className: PropTypes.string,
}

InlineName.defaultProps = {
  className: '',
}

export default InlineName
