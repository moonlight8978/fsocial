import { settings } from '../../../config'
import { UserResource } from '../../../resources/user'

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
    creator: UserResource.ProfileOverall.parse(post.creator),
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
    rootId: reply.root_id,
    parentId: reply.parent_id,
    content: reply.content,
    createdAt: new Date(reply.created_at),
    updatedAt: new Date(reply.updated_at),
    canUpdate: reply.can_update,
    canDestroy: reply.can_destroy,
    creator: UserResource.ProfileOverall.parse(reply.creator),
    medias: reply.medias.map(media => Media.parse(media)),
    repliesCount: reply.replies_count,
    subRepliesCount: reply.sub_replies_count,
    favoritesCount: reply.favorites_count,
    sharesCount: reply.shares_count,
    isFavorited: reply.is_favorited,
    isShared: reply.is_shared,
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
