const fs = require('fs')
const path = require('path')

const { YamlReader } = require('./yaml-reader')

describe('perform', function testPerform() {
  beforeEach(() => {
    this.subject = YamlReader.perform
  })

  test('parse the yml and transform to flatten object', () => {
    const data = fs.readFileSync(
      path.join(__dirname, 'yaml-reader.test-data.yml')
    )
    const resultKeys = Object.keys(this.subject(data))

    expect(resultKeys[0]).toBe('b')
    expect(resultKeys[1]).toBe('a.b')
    expect(resultKeys[2]).toBe('a.a')
    expect(resultKeys[3]).toBe('c')
  })
})
