const getFolloweesCount = state => state.followeesCount

const getFollowersCount = state => state.followersCount

const getPostsCount = state => state.postsCount

export const statisticsSelectors = {
  getFolloweesCount,
  getFollowersCount,
  getPostsCount,
}
