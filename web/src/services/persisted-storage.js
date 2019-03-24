// @flow
export const PersistedStorage = {
  set(key: string, data: Object): void {
    localStorage.setItem(key, JSON.stringify(data))
  },

  get(key: string): ?any {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {}
  },
}
