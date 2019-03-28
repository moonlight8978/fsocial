import { settings } from '../../config'

const User = {
  parse: user => ({
    fullname: user.fullname,
    username: user.username,
    id: user.id,
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
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    canUpdate: post.can_update,
    canDestroy: post.can_destroy,
    creator: User.parse(post.creator),
    medias: post.medias.map(media => Media.parse(media)),
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
