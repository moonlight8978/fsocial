import humps from 'humps'

export const CaseConverter = {
  camelize(object) {
    return humps.camelizeKeys(object)
  },

  decamelize(object) {
    return humps.decamelizeKeys(object)
  },
}
