const sortEntries = require('./sortEntries')
const moment = require('moment')

module.exports = function findOverlappingEntries(entries) {
  return sortEntries(entries).reduce((accumulator, entry, index, arr) => {
    if (index === arr.length - 1) return accumulator // last record, just return

    const end = moment(entry.end)
    const nextEntry = arr[index + 1]
    const nextStart = moment(nextEntry.start)

    // check for an overlapping entry
    if (nextStart.isBefore(end)) {
      accumulator.push({
        timeEntry: entry,
        overlappingEntry: nextEntry
      })
    }
    return accumulator
  }, [])
}
