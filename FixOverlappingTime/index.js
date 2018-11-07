const fixOverlappingEntries = require('./toggl/fixOverlappingEntries')

module.exports = async function azureFunc(context) {
  fixOverlappingEntries(context)

  const timeStamp = new Date().toISOString()
  context.log('The timer ran!', timeStamp)
}
