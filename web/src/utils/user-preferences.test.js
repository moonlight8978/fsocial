import { UserPreferencesUtils } from './user-preferences'

describe('.getBrowserLocale', function testGetBrowserLocale() {
  beforeEach(() => {
    this.languageGetter = jest.spyOn(window.navigator, 'languages', 'get')
    this.subject = UserPreferencesUtils.getBrowserLocale
  })

  test('return user preference language has highest priority', () => {
    this.languageGetter.mockReturnValue(['en-US', 'vi-VN'])
    expect(this.subject()).toBe('en')
  })
})
