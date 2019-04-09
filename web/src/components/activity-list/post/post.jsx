import React from 'react'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { paths } from '../../../config'
import { InlineName } from '../../user'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'
import { FavoriteButton, ShareButton, ReplyButton } from '../../post-actions'
import PostMedias from '../../post-medias/post-medias'

import styles from './post.module.scss'

class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
    showReplyModal: PropTypes.func.isRequired,
  }

  render() {
    const { post, showReplyModal, onChange } = this.props
    const { id, creator, content, createdAt } = post

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

          <PostMedias post={post} />

          <div className={styles.actions}>
            <ReplyButton post={post} showReplyModal={showReplyModal} />

            <ShareButton post={post} onChange={onChange} />

            <FavoriteButton post={post} onChange={onChange} />
          </div>
        </div>
      </>
    )
  }
}

export default Post
