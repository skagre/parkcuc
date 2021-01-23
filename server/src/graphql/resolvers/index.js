const userResolvers = require('./user')
const conversationResolvers = require('./conversation')
const messageResolvers = require('./message')

module.exports = {
    ...userResolvers,
    ...conversationResolvers,
    ...messageResolvers
}
