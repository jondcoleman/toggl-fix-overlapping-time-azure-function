const util = require('util')
const toggl = require('./toggleClient')
const moment = require('moment')

toggl.detailedReport = util.promisify(toggl.detailedReport)

function getDetailedReportData(startDate, endDate) {
  // dates default to current week
  const start = startDate || moment().startOf('week')
  const end = endDate || moment().endOf('week')

  function getDetailedReport(options, data) {
    const page = options.page
    return toggl.detailedReport(options).then(res => {
      const fullData = data.concat(res.data)
      if (res.data.length >= 50) {
        const newOptions = Object.assign({}, options)
        newOptions.page = page + 1
        return getDetailedReport(newOptions, fullData)
      }
      return fullData
    })
  }

  const options = {
    page: 1,
    workspaceId: process.env.TOGGL_WORKSPACE,
    since: start.format(),
    until: end.format()
  }

  return getDetailedReport(options, [])
}

module.exports = getDetailedReportData
