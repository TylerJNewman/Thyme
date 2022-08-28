const getDownloadCount = releases => {
  if (!releases) return null
  const total = releases?.assets?.reduce((count, release) => {
    return count + parseInt(release.download_count)
  }, 0)

  return total.toLocaleString('en-US')
}

export default getDownloadCount
