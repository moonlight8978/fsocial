import React from 'react'
import { Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'

import { paths } from '../../../config'
import { InlineName, User } from '../../user'
import { Text, Ellipsis } from '../../atomics'
import { RelativeTime } from '../../relative-time'
import { FavoriteButton, ShareButton, ReplyButton } from '../../post-actions'
import { PostContent } from '../../post-content'
import PostMedias from '../../post-medias/post-medias'
import ActivityApi from '../activity-api'

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

  handleReport = async () => {
    const { post } = this.props
    try {
      await ActivityApi.reportPost(post.id)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { post, showReplyModal, onChange } = this.props
    const { id, creator, content, createdAt, canDestroy } = post

    return (
      <>
        <div className={styles.avatar}>
          <User.Avatar size="large" user={creator} />
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

            <div className={styles.dropdown}>
              <Dropdown
                overlay={
                  <Menu>
                    {canDestroy && (
                      <Menu.Item key="remove" onClick={this.handleRemove}>
                        <Text>
                          <FormattedMessage id="activityList.item.delete" />
                        </Text>
                      </Menu.Item>
                    )}
                    <Menu.Item key="report" onClick={this.handleReport}>
                      <Text>
                        <FormattedMessage id="activityList.item.report" />
                      </Text>
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
