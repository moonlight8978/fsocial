const FollowingUserResource = {
  parse: user => ({
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    isCurrentUser: user.is_current_user,
    isFollowed: user.is_followed,
  }),
}

const FollowingUsersResource = {
  parse: users => users.map(user => FollowingUserResource.parse(user)),
}

export { FollowingUserResource, FollowingUsersResource }
