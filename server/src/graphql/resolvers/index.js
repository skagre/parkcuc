const userResolvers = require('./user')
const conversationResolvers = require('./conversation')
const messageResolvers = require('./message')
const message = require('./message')

module.exports = {
    ...userResolvers,
    ...conversationResolvers,
    ...messageResolvers
}
