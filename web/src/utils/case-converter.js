// @flow
import humps from 'humps'

export const CaseConverter = {
  camelize<T>(object: T): T {
    return humps.camelizeKeys(object)
  },

  decamelize(object: Object | Array<Object>): Object | Array<Object> {
    return humps.decamelizeKeys(object)
  },
}
