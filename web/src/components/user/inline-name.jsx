import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Text } from '../atomics'

import styles from './inline-name.module.scss'

const Middot = () => <span className={styles.middot}>&middot;</span>

function InlineName({ username, fullname, className }) {
  return (
    <span className={classnames(styles.name, { [className]: className })}>
      <Text bold className={styles.fullname}>
        {fullname}
      </Text>
      <Text color="secondary">
        <Middot />
      </Text>
      <Text color="secondary" className={styles.username}>
        @{username}
      </Text>
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

const PureInlineName = React.memo(InlineName)

PureInlineName.Middot = React.memo(Middot)

export default PureInlineName
