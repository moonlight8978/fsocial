const Hashtag = {
  parse: hashtag => ({
    id: hashtag.id,
    name: hashtag.name,
    description: hashtag.description,
    postsCount: hashtag.posts_count,
  }),
}

const Hashtags = {
  parse: hashtags => hashtags.map(hashtag => Hashtag.parse(hashtag)),
}

export default {
  Hashtags,
  Hashtag,
}
