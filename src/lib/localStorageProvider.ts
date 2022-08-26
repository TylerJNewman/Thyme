import {useSWRConfig} from 'swr'

const isServer = () => typeof window === 'undefined'

const localStorageProvider = () => {
  const {cache} = useSWRConfig()
  if (isServer()) return new Map()

  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    try {
      localStorage.setItem('app-cache', appCache)
    } catch (err) {
      if (err.name === 'QuotaExceededError') {
        cache.delete('app-cache')
        localStorage.removeItem('app-cache')
      }
    }
  })

  // We still use the map for write & read for performance.
  return map
}

export default localStorageProvider
