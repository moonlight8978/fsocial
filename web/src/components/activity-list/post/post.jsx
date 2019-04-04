import React from 'react'
import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { InlineName } from '../../user'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'
import { paths } from '../../../config'

import Medias from './medias'
import styles from './post.module.scss'

class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
  }

  render() {
    const { post } = this.props
    const { id, medias, creator, content, createdAt } = post

    return (
      <>
        <div className={styles.avatar}>
          <Avatar size="large" src="/avatar-placeholder.png" />
        </div>

        <div className={styles.post}>
          <header>
            <Ellipsis className={styles.username}>
              <Link to={paths.user.resolve(creator)}>
                <InlineName
                  username={creator.username}
                  fullname={creator.fullname}
                />
              </Link>
            </Ellipsis>
            <Text color="secondary" className={styles.nameSplitter}>
              &middot;
            </Text>
            <Link to={paths.post.resolve({ username: creator.username, id })}>
              <Text color="secondary" hover hoverColor="link">
                <RelativeTime fromTime={createdAt} />
              </Text>
            </Link>
          </header>

          <p>
            <Text>{content}</Text>
          </p>

          <Medias medias={medias} />

          <div className={styles.actions}>
            <Button
              className={classnames(styles.actionButton, styles.replyButton)}
            >
              <Text color="secondary">
                <FontAwesomeIcon size="lg" icon={['far', 'comment']} />
                <span className={styles.actionCount}>25</span>
              </Text>
            </Button>
            <Button
              className={classnames(styles.actionButton, styles.retweetButton)}
            >
              <Text color="secondary">
                <FontAwesomeIcon
                  size="lg"
                  icon="retweet"
                  className={styles.retweetIcon}
                />
                <span className={styles.actionCount}>25</span>
              </Text>
            </Button>
            <Button
              className={classnames(styles.actionButton, styles.favoriteButton)}
            >
              <Text color="secondary">
                <FontAwesomeIcon size="lg" icon={['far', 'heart']} />
                <span className={styles.actionCount}>25</span>
              </Text>
            </Button>
          </div>
        </div>
      </>
    )
  }
}

export default Post
