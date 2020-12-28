const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

module.exports = {
    sendMessage: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            if (!args.body && !args.attachment) throw new Error('Oops! Body is empty.')

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

            return message
        } catch (err) {
            throw err
        }
    },
    fetchMessages: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id
            
            if (userA.toString() === userB.toString())
                throw new Error('Oops! Can\'t fetch messages.')

            const { offset = 0, limit = 20 } = args
            const conversation = await Conversation.findOne({
                participants: { $all: [userA, userB] }
            })
            if (!conversation) return []

            const messages = await Message.find({
                conversation: conversation._id
            }).skip(offset).limit(limit)
            
            return {
                conversation: conversation._id,
                data: messages
            }
        } catch (err) {
            throw err
        }
    },
    fetchAttachments: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id
            
            if (userA.toString() === userB.toString())
                throw new Error('Oops! Can\'t fetch messages.')

            const { offset = 0, limit = 20 } = args
            const conversation = await Conversation.findOne({
                participants: { $all: [userA, userB] }
            })
            if (!conversation) return []

            const files = await Message.find({
                $and: [
                    { $or: [ { conversation: conversation._id } ]},
                    { $or: [ { $nor: [
                        { attachments: { $size: 0 } },
                        { unsend: 'everyone' },
                        { sender: req.user._id, unsend: 'onlyme' },
                    ] } ]  }
                ]
                
            }).select({ _id: 0, attachments: 1 }).skip(offset).limit(limit)
    
            const attachmentLists = files.map(file => file.attachments)

            const arr = []
            attachmentLists.forEach(element => {
                element.forEach(e => {
                    arr.push(e)
                })
            })
            
            return arr
        } catch (err) {
            throw err
        }
    },
    unsendMessage: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const type = ['onlyme', 'everyone']
            if (!type.includes(args.type)) throw new Error('Oops! Can\'t unsend message.')

            const message = await Message.findOneAndUpdate(
                {   
                    _id: args.message_id,
                    sender: req.user._id
                },
                { unsend: args.type }
            )
            if (!message) throw new Error('Oops! Can\'t unsend message.')
            
            return message
        } catch (err) {
            throw err
        }
    },
}