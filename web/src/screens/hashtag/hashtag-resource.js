const User = {
  parse: user => ({
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    isCurrentUser: user.is_current_user,
  }),
}

const Hashtag = {
  parse: hashtag => ({
    id: hashtag.id,
    name: hashtag.name,
    description: hashtag.description,
    creator: User.parse(hashtag.creator),
  }),
}

export default Hashtag
