// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const debounce = (func, delay, {leading} = {}) => {
  let timerId

  return (...args) => {
    if (!timerId && leading) {
      func(...args)
    }
    clearTimeout(timerId)

    timerId = setTimeout(() => func(...args), delay)
  }
}
