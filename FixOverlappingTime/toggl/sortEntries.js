const moment = require('moment')

module.exports = function sortEntries(entries) {
  entries.sort((a, b) => {
    const aStart = moment(a.start)
    const bStart = moment(b.start)
    if (aStart.isBefore(bStart)) return -1
    if (bStart.isBefore(aStart)) return 1
    return 0
  })
  return entries
}
