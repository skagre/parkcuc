const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

module.exports = {
    sendMessage: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const conversation = await Conversation.findOne(
                {
                    $and: [
                        { $or: [
                            { _id: args.conversation_id }
                        ] },
                        { $or: [
                            { paticipants: req.user._id }
                        ] }
                    ]
                }
            )

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
    fetchMessage: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const message = await Message.find({
                conversation: args.conversation_id
            })
            return message
        } catch (err) {
            throw err
        }
    }
}