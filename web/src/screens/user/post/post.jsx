import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar } from 'antd'

import { withLoading, FluidLoading } from '../../../components/loading'
import { Box, Text } from '../../../components/atomics'
import PostMedias from '../../../components/post-medias/post-medias'
import { FollowButton } from '../../../components/following'
import {
  ReplyButton,
  ShareButton,
  FavoriteButton,
} from '../../../components/post-actions'

import PostApi from './post-api'
import PostResource from './post-resource'

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
    const { post } = this.state

    if (isLoading) {
      return <FluidLoading />
    }

    const { creator, content } = post

    return (
      <Box>
        <div>
          <Avatar src="/avatar-placeholder.png" size={50} />
          <div>
            <Text size="large" bold>
              {creator.fullname}
            </Text>

            <Text color="secondary">@{creator.username}</Text>

            <FollowButton user={creator} />

            <p>
              <Text size="xlarge">{content}</Text>
            </p>

            <PostMedias post={post} />

            <div>
              <ReplyButton post={post} showReplyModal={() => {}} />

              <ShareButton
                post={post}
                onChange={(postId, newPost) => this.setState({ post: newPost })}
              />

              <FavoriteButton
                post={post}
                onChange={(postId, newPost) => this.setState({ post: newPost })}
              />
            </div>
          </div>
        </div>
      </Box>
    )
  }
}

export default withLoading(withRouter(Post))
