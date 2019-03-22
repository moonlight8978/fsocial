const User = {
  parse: data => ({
    id: data.id,
    fullname: data.fullname,
    username: data.username,
  }),
}

export const FolloweesSuggestionResource = {
  User,
}
