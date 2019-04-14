import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

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

  render() {
    const { isLoading, post } = this.props

    if (isLoading) {
      return <FluidLoading />
    }

    const { creator, content, createdAt, sharesCount, favoritesCount } = post

    return (
      <Box className={styles.box}>
        <div>
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
                        <Text size="large" bold>
                          {creator.fullname}
                        </Text>
                      </Ellipsis>
                      <Ellipsis>
                        <Text color="secondary">@{creator.username}</Text>
                      </Ellipsis>
                    </div>

                    <div className={styles.actions}>
                      <FollowButton user={creator} />
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
                setReplies,
                replies,
                setSubReplies,
                changeReply,
                changeSubReply,
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
                              replyTo={reply.creator}
                              onChange={changeReply}
                              showReplyModal={showModal}
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
        </div>
      </Box>
    )
  }
}

const PostScreen = withLoading(withRouter(Post))

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
