// @flow
export const AsyncUtils = {
  async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
}
