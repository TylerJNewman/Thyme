async function fetchJson(...args) {
  try {
    const response = await fetch(...args)

    if (response.ok) {
      const data = await response.json()
      return data
    }

    const error = new Error(response.statusText)
    error.response = response
    // error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = {message: error.message}
    }
    throw error
  }
}

export default fetchJson
