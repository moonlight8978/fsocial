const yaml = require('js-yaml')
const flatten = require('flat')

const YamlReader = {
  perform(io) {
    return flatten(yaml.safeLoad(io, 'utf8'))
  },
}

module.exports = {
  YamlReader,
}
