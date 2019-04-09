import { settings } from '../../../config'

const User = {
  parse: user => ({
    fullname: user.fullname,
    username: user.username,
    id: user.id,
    isFollowed: user.is_followed,
    isCurrentUser: user.is_current_user,
  }),
}

const Media = {
  parse: media => ({
    filename: media.filename,
    url: `${settings.server.host}${media.path}`,
    path: media.path,
    metadata: {
      width: media.metadata.width,
      height: media.metadata.height,
    },
  }),
}

const Post = {
  parse: post => ({
    id: post.id,
    rootId: post.root_id,
    parentId: post.parent_id,
    content: post.content,
    createdAt: new Date(post.created_at),
    updatedAt: new Date(post.updated_at),
    canUpdate: post.can_update,
    canDestroy: post.can_destroy,
    creator: User.parse(post.creator),
    medias: post.medias.map(media => Media.parse(media)),
    repliesCount: post.replies_count,
    favoritesCount: post.favorites_count,
    sharesCount: post.shares_count,
    isFavorited: post.is_favorited,
    isShared: post.is_shared,
  }),
}

const Reply = {
  parse: reply => ({
    id: reply.id,
  }),
}

const Replies = {
  parse: replies => replies.map(reply => Reply.parse(reply)),
}

export default {
  Post,
  Reply,
  Replies,
}
