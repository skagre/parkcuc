const userResolvers = require('./user')
const friendResolvers = require('./friend')

module.exports = {
    ...userResolvers,
    ...friendResolvers
}
