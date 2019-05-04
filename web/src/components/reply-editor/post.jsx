import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { RelativeTime } from '../relative-time'
import { InlineName, User } from '../user'
import { Text, Ellipsis } from '../atomics'
import { paths } from '../../config'

import styles from './post.module.scss'

export default class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
  }

  render() {
    const { post } = this.props
    const { creator, content, createdAt } = post

    return (
      <article className={styles.container}>
        <div className={styles.colLeft}>
          <User.Avatar user={creator} size={40} />
        </div>

        <div className={styles.colRight}>
          <header className={styles.header}>
            <Ellipsis className={styles.names}>
              <Link
                to={paths.user.resolve({
                  username: creator.username,
                })}
              >
                <InlineName
                  username={creator.username}
                  fullname={creator.fullname}
                />
                <Text color="secondary" className={styles.middot}>
                  &middot;
                </Text>
              </Link>
            </Ellipsis>
            <Text color="secondary">
              <RelativeTime fromTime={createdAt} />
            </Text>
          </header>

          <p>{content}</p>
        </div>
      </article>
    )
  }
}
