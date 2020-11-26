const userResolvers = require('./user')
const conversationResolvers = require('./conversation')

module.exports = {
    ...userResolvers,
    ...conversationResolvers
}
