import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar } from 'antd'

import { withLoading, FluidLoading } from '../../../components/loading'
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

class Post extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      post: {},
      error: null,
    }
  }

  async componentDidMount() {
    const { match, finishLoading } = this.props
    try {
      const { data: post } = await PostApi.fetch(match.params.id)
      this.setState({
        post: PostResource.Post.parse(post),
      })
    } catch (error) {
      this.setState({ error })
      console.log(error)
    } finally {
      finishLoading()
    }
  }

  render() {
    const { isLoading } = this.props
    const { post } = this.state

    if (isLoading) {
      return <FluidLoading />
    }

    const { creator, content, createdAt, sharesCount, favoritesCount } = post

    return (
      <Box className={styles.box}>
        <div>
          <ReplyProvider
            onCreate={(_post, { trackable }) => {
              const { root } = trackable
              this.setState({
                post: { ...post, repliesCount: root.repliesCount },
              })
            }}
          >
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
                    <ReplyButton
                      post={post}
                      showReplyModal={() => showModal(post)}
                    />

                    <ShareButton
                      post={post}
                      onChange={(postId, newPost) =>
                        this.setState({ post: newPost })
                      }
                    />

                    <FavoriteButton
                      post={post}
                      onChange={(postId, newPost) =>
                        this.setState({ post: newPost })
                      }
                    />
                  </div>

                  <div className={styles.detailStatistics}>
                    <div>
                      <Text bold>{sharesCount}</Text>
                      <span> </span>
                      <Text color="secondary">Shares</Text>
                    </div>
                    <div>
                      <Text bold>{favoritesCount}</Text>
                      <span> </span>
                      <Text color="secondary">Favorites</Text>
                    </div>
                  </div>
                </article>
              )}
            </ReplyConsumer>
          </ReplyProvider>

          <Replies post={post}>
            {({ replies, error, handleChange }) => (
              <ReplyProvider
                onCreate={(post, { trackable }) => {
                  handleChange(post.id, {
                    subRepliesCount: trackable.parent.subRepliesCount,
                  })
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
                          onChange={handleChange}
                          showReplyModal={showModal}
                        >
                          <SubReplies parent={reply}>
                            {({ subReplies, handleChange }) =>
                              subReplies.map(subReply => (
                                <SubReply
                                  subReply={subReply}
                                  key={subReply.id}
                                  replyTo={reply.creator}
                                  onChange={handleChange}
                                />
                              ))
                            }
                          </SubReplies>
                        </Reply>
                      ))}
                    </div>
                  )}
                </ReplyConsumer>
              </ReplyProvider>
            )}
          </Replies>
        </div>
      </Box>
    )
  }
}

export default withLoading(withRouter(Post))
