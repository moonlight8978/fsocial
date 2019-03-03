export const AsyncUtils = {
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
}
