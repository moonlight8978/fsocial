const ObjectKeySorter = {
  perform(flattenObject) {
    return Object.entries(flattenObject)
      .sort(([key1], [key2]) => (key1 < key2 ? -1 : 1))
      .reduce((hash, [key, value]) => {
        hash[key] = value
        return hash
      }, {})
  },
}

module.exports = {
  ObjectKeySorter,
}
