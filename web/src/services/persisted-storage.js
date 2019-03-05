export const PersistedStorage = {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
}
