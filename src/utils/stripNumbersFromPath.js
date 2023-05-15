const stripNumbers = (val) => {
  if (!val) return
  const pathsDirectories = val.split('/')

  let pathArray = []

  pathsDirectories.map((el) => {
    if (el.length > 0) {
      pathArray.push(el.replace(/[0-9]+-/g, ''))
    }
  })
  return `/${pathArray.join('/')}`
}

module.exports = stripNumbers
