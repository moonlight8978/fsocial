import _ from 'lodash'

export const ObjectUtils = {
  pick(object, paths = null) {
    if (!paths) {
      return object
    }
    return _.pick(object, paths)
  },
}
