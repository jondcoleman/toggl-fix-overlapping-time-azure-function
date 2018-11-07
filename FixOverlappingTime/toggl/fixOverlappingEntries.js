const toggl = require('./toggleClient')
const util = require('util')
const Moment = require('moment')
const MomentRange = require('moment-range')

const moment = MomentRange.extendMoment(Moment)
// const logger = require('./logger')
const getDetailedReportData = require('./getDetailedReportData')
const findOverlappingEntries = require('./findOverlappingEntries')

toggl.updateTimeEntry = util.promisify(toggl.updateTimeEntry)
module.exports = function fixOverlappingEntries(context) {
  getDetailedReportData()
    .then(data => {
      const overlappingEntries = findOverlappingEntries(data)
      context.log(JSON.stringify(overlappingEntries, null, 2))
      overlappingEntries.forEach(x => {
        const start = moment(x.timeEntry.start)
        const stop = moment(x.overlappingEntry.start).format()
        const duration = moment.range(start, stop).diff('seconds')
        const updatedEntry = { stop, duration }
        toggl
          .updateTimeEntry(x.timeEntry.id, updatedEntry) // set the end time to the next start time
          .then(response => context.log('updated entry', JSON.stringify(response)))
          .catch(err => context.log(err))
      })
    })
    .catch(err => context.log(err))
}
