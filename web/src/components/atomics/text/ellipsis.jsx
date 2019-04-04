import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './ellipsis.module.scss'

const Ellipsis = ({ children, className }) => (
  <div className={classnames(styles.ellipsis, className)}>{children}</div>
)

Ellipsis.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  className: PropTypes.string,
}

Ellipsis.defaultProps = {
  className: '',
}

export default Ellipsis
