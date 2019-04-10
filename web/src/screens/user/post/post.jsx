import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar } from 'antd'

import { withLoading, FluidLoading } from '../../../components/loading'
import { Box, Text, Ellipsis } from '../../../components/atomics'
import PostMedias from '../../../components/post-medias/post-medias'
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

class Post extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      post: {},
      rootReplies: [],
      subReplies: {},
    }
  }

  async componentDidMount() {
    const { match, finishLoading } = this.props
    try {
      const { data } = await PostApi.fetch(match.params.id)
      this.setState({ post: PostResource.Post.parse(data) })
      console.log(PostResource.Post.parse(data))
    } catch (error) {
      console.log(error)
    } finally {
      finishLoading()
    }
  }

  render() {
    const { isLoading } = this.props
    const { post, rootReplies, subReplies } = this.state

    if (isLoading) {
      return <FluidLoading />
    }

    const { creator, content, createdAt } = post

    return (
      <Box className={styles.box}>
        <ReplyProvider
          onCreate={(_post, { trackable }) => {
            const { root } = trackable
            this.setState({
              post: { ...post, repliesCount: root.repliesCount },
            })
            this.setState(state => ({
              rootReplies: [trackable, ...state.rootReplies],
            }))
          }}
        >
          <ReplyConsumer>
            {({ showModal }) => (
              <div>
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
                </article>

                <div className={replyStyles.list}>
                  {[1, 2, 3, 4].map(num => (
                    <article>
                      <div className={replyStyles.avatar}>avatar</div>
                      <div className={replyStyles.reply}>
                        <header>header</header>

                        <div>context</div>

                        <p>content</p>

                        <div>medias</div>

                        <div>actions button</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </ReplyConsumer>
        </ReplyProvider>
      </Box>
    )
  }
}

export default withLoading(withRouter(Post))
