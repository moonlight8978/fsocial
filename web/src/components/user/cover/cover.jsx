import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './cover.module.scss'

const Cover = ({ className, ...rest }) => (
  <div className={classnames(styles.coverContainer, className)}>
    <img className={styles.coverThumb} alt="Cover" {...rest} />
  </div>
)

Cover.propTypes = {
  className: PropTypes.string,
}

Cover.defaultProps = {
  className: '',
}

export default Cover
