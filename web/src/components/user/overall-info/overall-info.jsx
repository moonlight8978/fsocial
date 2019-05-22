import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { paths } from '../../../config'
import InlineName from '../inline-name'
import { Avatar } from '../avatar'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'

import styles from './overall-info.module.scss'

class OverallInfo extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.shape().isRequired,
    time: PropTypes.shape(),
    className: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    time: null,
    className: '',
  }

  render() {
    const { children, user, time, className } = this.props
    const { username, fullname } = user

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div className={styles.avatar}>
          <Avatar size="large" user={user} />
        </div>
        <div className={styles.header}>
          <Ellipsis className={styles.username}>
            <Link to={paths.user.resolve(user)}>
              <InlineName username={username} fullname={fullname} />
            </Link>
          </Ellipsis>

          {time && (
            <>
              <Text color="secondary" className={styles.nameSplitter}>
                &middot;
              </Text>
              <Text color="secondary">
                <RelativeTime fromTime={time} />
              </Text>
            </>
          )}

          {children}
        </div>
      </div>
    )
  }
}

export default OverallInfo
