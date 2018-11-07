const TogglClient = require('toggl-api')

module.exports = new TogglClient({ apiToken: process.env.TOGGL_TOKEN })
