const { ObjectKeySorter } = require('./object-key-sorter')

describe('perform', function testPerform() {
  beforeEach(() => {
    this.subject = ObjectKeySorter.perform
  })

  test('short keys of flatten object ascending', () => {
    const object = {
      d: 123,
      'abc.d': 123,
      e: 123,
      'abc.a': 123,
    }
    const resultKeys = Object.keys(this.subject(object))

    expect(resultKeys[0]).toBe('abc.a')
    expect(resultKeys[1]).toBe('abc.d')
    expect(resultKeys[2]).toBe('d')
    expect(resultKeys[3]).toBe('e')
  })
})
