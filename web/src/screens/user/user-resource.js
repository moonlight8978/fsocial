const UserResource = {
  parse: user => ({
    id: user.id,
    fullname: user.fullname,
    role: user.role,
    language: user.language,
    username: user.username,
    email: user.email,
    gender: user.gender,
    birthday: user.birthday,
    description: user.description,
    isCurrentUser: user.is_current_user,
    isFollowed: user.is_followed,
  }),
}

export default UserResource
