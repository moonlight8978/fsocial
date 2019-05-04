import { settings } from '../../../config'
import { UserResource } from '../../../resources/user'

const PostAncestor = {
  parse: post => ({
    id: post.id,
    creator: UserResource.ProfileOverall.parse(post.creator),
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
    reportsCount: post.reports_count,
    root: post.root && PostAncestor.parse(post.root),
    parent: post.parent && PostAncestor.parse(post.parent),
  }),
}

const Posts = {
  parse: posts => posts.map(post => Post.parse(post)),
}

export default {
  Posts,
}
