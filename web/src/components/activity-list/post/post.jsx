import React from 'react'
import { Avatar, Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { paths } from '../../../config'
import { InlineName } from '../../user'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'
import { FavoriteButton, ShareButton, ReplyButton } from '../../post-actions'
import { PostContent } from '../../post-content'
import PostMedias from '../../post-medias/post-medias'

import styles from './post.module.scss'

class Post extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
    showReplyModal: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  handleRemove = () => {
    const { onRemove, post } = this.props
    onRemove(post)
  }

  render() {
    const { post, showReplyModal, onChange } = this.props
    const { id, creator, content, createdAt, canDestroy } = post

    return (
      <>
        <div className={styles.avatar}>
          <Avatar size="large" src="/avatar-placeholder.png" />
        </div>

        <div className={styles.post}>
          <header className={styles.header}>
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

            {canDestroy && (
              <div className={styles.dropdown}>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="remove" onClick={this.handleRemove}>
                        <Text>Delete post</Text>
                      </Menu.Item>
                      <Menu.Item key="report" onClick={this.handleReport}>
                        <Text>Report post</Text>
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="ant-dropdown-link" href="#">
                    {' '}
                    <Text color="secondary" hover hoverColor="link">
                      <FontAwesomeIcon icon="angle-down" />
                    </Text>
                  </a>
                </Dropdown>
              </div>
            )}
          </header>

          <PostContent content={content} />

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
