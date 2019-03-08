import { ObjectUtils } from './object-utils'

describe('.pick', function testPick() {
  beforeEach(() => {
    this.subject = ObjectUtils.pick
  })

  test('return whole object if without paths', () => {
    expect(this.subject({ a: 1, b: 1 })).toEqual({ a: 1, b: 1 })
  })

  test('return sliced object', () => {
    expect(this.subject({ a: 1, b: 1 }, ['a'])).toEqual({ a: 1 })
  })
})
