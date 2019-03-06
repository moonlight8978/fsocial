// @flow
export const UserPreferencesUtils = {
  getBrowserLocale(): string {
    const language =
      (navigator.languages && navigator.languages[0]) || navigator.language
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
    return languageWithoutRegionCode
  },
}
