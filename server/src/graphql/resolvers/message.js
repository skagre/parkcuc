const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

module.exports = {
    init: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        const userA = req.user._id
        console.log('userA:', userA)

        const conversations = await Conversation.find({
            paticipants: { $in: userA }
        }).limit(20)
    },
    sendMessage: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const conversation = await Conversation.findOne({
                $and: [
                    { $or: [
                        { _id: args.conversation_id }
                    ] },
                    { $or: [
                        { participants: { $in: req.user._id } }
                    ] }
                ]
            })
            
            if (!conversation) throw new Error('Oops! Failed to send message.')

            const message = new Message({
                sender: req.user._id,
                conversation: args.conversation_id,
                body: args.body
            })
            await message.save()

            return 'success'
        } catch (err) {
            throw err
        }
    },
    fetchMessages: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id
            const { offset = 0, limit = 20 } = args
            const conversation = await Conversation.findOne({
                participants: { $all: [userA, userB] }
            })
            if (!conversation) return []

            const messages = await Message.find({
                conversation: conversation._id
            }).skip(offset).limit(limit)
            
            return messages
        } catch (err) {
            throw err
        }
    }
}