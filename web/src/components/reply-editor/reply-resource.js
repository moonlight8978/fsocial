import { settings } from '../../config'
import { UserResource } from '../../resources/user'

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

const Ancestor = {
  parse: post => ({
    id: post.id,
    repliesCount: post.replies_count,
    subRepliesCount: post.sub_replies_count,
    favoritesCount: post.favorites_count,
    sharesCount: post.shares_count,
    isFavorited: post.is_favorited,
    isShared: post.is_shared,
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
    creator: UserResource.Profile.parse(post.creator),
    medias: post.medias.map(media => Media.parse(media)),
    repliesCount: post.replies_count,
    subRepliesCount: post.sub_replies_count,
    favoritesCount: post.favorites_count,
    sharesCount: post.shares_count,
    isFavorited: post.is_favorited,
    isShared: post.is_shared,
    root: Ancestor.parse(post.root),
    parent: post.parent && Ancestor.parse(post.parent),
  }),
}

export const Activity = {
  parse: activity => ({
    id: activity.id,
    trackable: Post.parse(activity.trackable),
    trackableType: activity.trackable_type,
    trackableId: activity.trackable_id,
    key: activity.key,
    createdAt: activity.created_at,
  }),
}

export const Activities = {
  parse: activities => activities.map(activity => Activity.parse(activity)),
}
