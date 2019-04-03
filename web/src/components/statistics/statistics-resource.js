export const StatisticsResource = {
  parse: statistics => ({
    followersCount: statistics.followers_count,
    followeesCount: statistics.followees_count,
    postsCount: statistics.posts_count,
    sharesCount: statistics.shares_count,
    favoritesCount: statistics.favorites_count,
    repliesCount: statistics.replies_count,
  }),
}
