const getSubReplies = parentId => state =>
  state.subRepliesHash[parentId.toString()] || []

export default {
  getSubReplies,
}
