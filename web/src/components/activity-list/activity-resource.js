import { settings } from '../../config'

const User = {
  parse: user => ({
    fullname: user.fullname,
    username: user.username,
    id: user.id,
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

const Sharing = {
  parse: sharing => ({
    id: sharing.id,
    canUpdate: sharing.can_update,
    canDestroy: sharing.can_destroy,
    creator: User.parse(sharing.creator),
    post: Post.parse(sharing.post),
  }),
}

const Favorite = {
  parse: favorite => ({
    id: favorite.id,
    canUpdate: favorite.can_update,
    canDestroy: favorite.can_destroy,
    creator: User.parse(favorite.creator),
    post: Post.parse(favorite.post),
  }),
}

const Trackable = {
  factory: activityType => {
    if (activityType === 'Favorite') {
      return Favorite
    }
    if (activityType === 'Sharing') {
      return Sharing
    }
    return Post
  },
}

export const Activity = {
  parse: activity => ({
    id: activity.id,
    trackable: Trackable.factory(activity.trackable_type).parse(
      activity.trackable
    ),
    trackableType: activity.trackable_type,
    trackableId: activity.trackable_id,
    key: activity.key,
    createdAt: activity.created_at,
  }),
}

export const Activities = {
  parse: activities => activities.map(activity => Activity.parse(activity)),
}
