const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

module.exports = {
    sendMessage = async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.id
            
            const isConversationExists = Conversation.findOne()
        } catch (err) {
            
        }
    }
}