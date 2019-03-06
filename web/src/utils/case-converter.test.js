import { CaseConverter } from './case-converter'

describe('.camelize', function testCamelize() {
  beforeAll(() => {
    this.subject = CaseConverter.camelize
  })

  test('object', () => {
    const object = {
      user_name: 123,
      pass_word: 123,
    }
    expect(this.subject(object)).toEqual({
      userName: 123,
      passWord: 123,
    })
  })

  test('nested object', () => {
    const object = {
      current_user: {
        expired_at: 123,
        token: 123,
      },
    }
    expect(this.subject(object)).toEqual({
      currentUser: {
        expiredAt: 123,
        token: 123,
      },
    })
  })

  test('array', () => {
    const object = [{ current_user: 1 }, { current_user: 2 }]
    expect(this.subject(object)).toEqual([
      { currentUser: 1 },
      { currentUser: 2 },
    ])
  })
})

describe('.decamelize', function testDecamelize() {
  beforeAll(() => {
    this.subject = CaseConverter.decamelize
  })

  test('object', () => {
    const object = {
      userName: 123,
      passWord: 123,
    }
    expect(this.subject(object)).toEqual({
      user_name: 123,
      pass_word: 123,
    })
  })

  test('nested object', () => {
    const object = {
      currentUser: {
        expiredAt: 123,
        token: 123,
      },
    }
    expect(this.subject(object)).toEqual({
      current_user: {
        expired_at: 123,
        token: 123,
      },
    })
  })

  test('array', () => {
    const object = [{ currentUser: 1 }, { currentUser: 2 }]
    expect(this.subject(object)).toEqual([
      { current_user: 1 },
      { current_user: 2 },
    ])
  })
})
