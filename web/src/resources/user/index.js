import { settings } from '../../config'

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

const DefaultAvatar = {
  parse: () => ({
    url: '/avatar-placeholder.png',
  }),
}

const DefaultCover = {
  parse: () => ({
    url: '/cover-placeholder.png',
  }),
}

const Profile = {
  parse: user => ({
    id: user.id,
    fullname: user.fullname,
    role: user.role,
    language: user.language,
    username: user.username,
    email: user.email,
    gender: user.gender,
    birthday: new Date(user.birthday).getTime(),
    description: user.description || '',
    avatar: user.avatar ? Media.parse(user.avatar) : DefaultAvatar.parse(),
    cover: user.cover ? Media.parse(user.cover) : DefaultCover.parse(),
    isCurrentUser: user.is_current_user || false,
    isFollowed: user.is_followed || false,
  }),
}

const ProfileOverall = {
  parse: user => ({
    fullname: user.fullname,
    username: user.username,
    id: user.id,
    isCurrentUser: user.is_current_user || false,
    isFollowed: user.is_followed || false,
    avatar: user.avatar ? Media.parse(user.avatar) : DefaultAvatar.parse(),
    cover: user.cover ? Media.parse(user.cover) : DefaultCover.parse(),
  }),
}

export const UserResource = {
  Profile,
  ProfileOverall,
}
