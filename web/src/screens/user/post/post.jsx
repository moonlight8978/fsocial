import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Avatar, Menu, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { paths } from '../../../config'
import {
  withLoading,
  FluidLoading,
  LoadingPropTypes,
} from '../../../components/loading'
import { Box, Text, Ellipsis } from '../../../components/atomics'
import { PostMedias } from '../../../components/post-medias'
import { FollowButton } from '../../../components/following'
import {
  ReplyButton,
  ShareButton,
  FavoriteButton,
} from '../../../components/post-actions'
import { WindowTitle } from '../../layout'
import { ReplyConsumer, ReplyProvider } from '../../../components/reply-editor'

import PostApi from './post-api'
import PostResource from './post-resource'
import styles from './post.module.scss'
import replyStyles from './reply.module.scss'
import Replies, { Reply } from './replies'
import SubReplies, { SubReply } from './sub-replies'
import { PostProvider, PostConsumer } from './post-context'
import selectors from './post-selectors'

class Post extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    match: PropTypes.shape().isRequired,
    setPost: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const { match, finishLoading, setPost } = this.props
    try {
      const { data: post } = await PostApi.fetch(match.params.id)
      setPost(PostResource.Post.parse(post))
      finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  handleReact = (_postId, post) => {
    const { setPost } = this.props
    setPost(post)
  }

  handleReply = (post, { trackable }) => {
    const { setPost, setReplies } = this.props
    setPost({ repliesCount: trackable.root.repliesCount })
    setReplies([trackable], 'before')
  }

  handleRemove = async () => {
    const { history, post } = this.props
    try {
      await PostApi.delete(post.id)
      history.push(paths.user.resolve({ username: post.creator.username }))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, post, intl } = this.props

    if (isLoading) {
      return <FluidLoading />
    }

    const {
      creator,
      content,
      createdAt,
      sharesCount,
      favoritesCount,
      canDestroy,
      id,
    } = post

    return (
      <Box className={styles.box}>
        <WindowTitle
          title={intl.formatMessage(
            {
              id: 'user.post.windowTitle',
            },
            {
              fullname: creator.fullname,
              username: creator.username,
              content,
            }
          )}
        />

        <ReplyProvider onCreate={this.handleReply}>
          <ReplyConsumer>
            {({ showModal }) => (
              <article className={styles.rootPost}>
                <header className={styles.header}>
                  <div className={styles.avatar}>
                    <Avatar src="/avatar-placeholder.png" size={50} />
                  </div>

                  <div className={styles.names}>
                    <Ellipsis>
                      <Link
                        to={paths.user.resolve({ username: creator.username })}
                      >
                        <Text size="large" bold hover hoverColor="link">
                          {creator.fullname}
                        </Text>
                      </Link>
                    </Ellipsis>
                    <Ellipsis>
                      <Text color="secondary">@{creator.username}</Text>
                    </Ellipsis>
                  </div>

                  <div className={styles.actions}>
                    <FollowButton user={creator} />

                    {canDestroy && (
                      <div className={styles.dropdown}>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key={id} onClick={this.handleRemove}>
                                <Text>
                                  <FormattedMessage id="user.post.delete" />
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
                    )}
                  </div>
                </header>

                <p className={styles.content}>
                  <Text size="xxlarge">{content}</Text>
                </p>

                <div className={styles.createTime}>
                  <Text color="secondary">{createdAt.toLocaleString()}</Text>
                </div>

                <PostMedias post={post} />

                <div className={styles.reactions}>
                  <ReplyButton post={post} showReplyModal={showModal} />

                  <ShareButton post={post} onChange={this.handleReact} />

                  <FavoriteButton post={post} onChange={this.handleReact} />
                </div>

                <div className={styles.detailStatistics}>
                  <div>
                    <Text bold>{sharesCount}</Text>
                    <span> </span>
                    <Text color="secondary">
                      <FormattedMessage id="user.post.statistics.sharesCount" />
                    </Text>
                  </div>
                  <div>
                    <Text bold>{favoritesCount}</Text>
                    <span> </span>
                    <Text color="secondary">
                      <FormattedMessage id="user.post.statistics.favoritesCount" />
                    </Text>
                  </div>
                </div>
              </article>
            )}
          </ReplyConsumer>
        </ReplyProvider>

        <PostConsumer>
          {context => {
            const {
              setPost,
              setReplies,
              replies,
              setSubReplies,
              changeReply,
              changeSubReply,
              removeReply,
              removeSubReply,
            } = context
            return (
              <Replies post={post} setReplies={setReplies}>
                <ReplyProvider
                  onCreate={(root, { trackable }) => {
                    changeReply(root.id, {
                      subRepliesCount: trackable.parent.subRepliesCount,
                    })
                    setSubReplies(root.id, [trackable], 'before')
                  }}
                >
                  <ReplyConsumer>
                    {({ showModal }) => (
                      <div className={replyStyles.list}>
                        {replies.map(reply => (
                          <Reply
                            key={reply.id}
                            reply={reply}
                            replyTo={post.creator}
                            onChange={changeReply}
                            showReplyModal={showModal}
                            onRemove={removeReply}
                            setPost={setPost}
                            root={post}
                          >
                            <SubReplies
                              parent={reply}
                              setSubReplies={setSubReplies}
                            >
                              {selectors
                                .getSubReplies(reply.id)(context)
                                .map(subReply => (
                                  <SubReply
                                    subReply={subReply}
                                    key={subReply.id}
                                    replyTo={reply.creator}
                                    onChange={(subReplyId, newSubReply) =>
                                      changeSubReply(
                                        reply.id,
                                        subReplyId,
                                        newSubReply
                                      )
                                    }
                                    onRemove={removeSubReply}
                                    setReply={changeReply}
                                    parent={reply}
                                  />
                                ))}
                            </SubReplies>
                          </Reply>
                        ))}
                      </div>
                    )}
                  </ReplyConsumer>
                </ReplyProvider>
              </Replies>
            )
          }}
        </PostConsumer>
      </Box>
    )
  }
}

const PostScreen = injectIntl(withLoading(withRouter(Post)))

export default props => (
  <PostProvider>
    <PostConsumer>
      {({ setPost, post, setReplies }) => (
        <PostScreen
          {...props}
          setPost={setPost}
          post={post}
          setReplies={setReplies}
        />
      )}
    </PostConsumer>
  </PostProvider>
)
