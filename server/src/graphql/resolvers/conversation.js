const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')
const User = require('../../models/User')

module.exports = {
    createConversation: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const participantList = args.participant_id

            const isValidateID = await User.findOne({
                _id: args.participant_id
            })
            if (!isValidateID) return null
            

            const isMyself = userA.toString() === participantList[0].toString()
            if (participantList.length === 1)
                if (isMyself) type = 'myself'
                else type = 'chat'
            if (participantList.length > 1)
                type = 'group'     


            participantList.unshift(userA.toString())
            if ([...new Set(participantList)].length !== participantList.length)
                return null
            
        
            const isExistsConversation = await Conversation.findOne({
                $and: [
                    { $or: [
                        { conversation_type: type }
                    ] },
                    { $or: [
                        { participants: { $all: participantList } }
                    ] }
                ]
            }).populate('participants')
            
            if (isExistsConversation) 
                return { 
                    _id: isExistsConversation._id,
                    name: isExistsConversation.name,
                    type: isExistsConversation.conversation_type,
                    participants: isExistsConversation.participants
                }
            
            const conversation = new Conversation({
                conversation_type: type,
                participants: participantList
            })

            result = await conversation.save().then(
                conversation => conversation.populate('participants').execPopulate()
            )

            return { 
                _id: result._id,
                name: result.name,
                type: result.conversation_type,
                participants: result.participants
            }

        } catch (err) {
            throw err
        }
    },
    fetchConversationLists: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const { offset = 0, limit = 20 } = args
            const conversationLists = await Conversation.find({ 
                participants: { $in: req.user._id } 
            }).skip(offset).limit(limit).populate('participants')

            const arr = await Promise.all(conversationLists.map(async conversation => {
                const lastMessage = await Message.findOne({
                    conversation: conversation._id
                }).sort({ updatedAt : -1 })

                if (!lastMessage) return []

                let contact = null
                if (conversation.conversation_type === 'chat') {
                    const info = conversation.participants.filter(participant => participant._id.toString() !== req.user._id.toString())[0]
                    contact = {
                        _id: info._id,
                        email: info.email,
                        name: info.name,
                        avatar: info.avatar,
                        status: info.status
                    }
                } 

                
                let obj = {
                    conversation: {
                        name: conversation.name,
                        conversation_type: conversation.conversation_type,
                        emoji: conversation.emoji,
                        blocker: conversation.blocker,
                        _id: conversation._id,
                        contact: contact
                    },
                    lastMessage
                }
                
                return obj
            }))

            return arr.sort((a, b) =>  b.lastMessage.createdAt - a.lastMessage.createdAt)
        } catch (err) {
            throw err
        }
    },
    changeEmoji: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: args.conversation_id },
                { emoji: args.emoji },
                { new: true }
            )
            
            return conversation
        } catch (err) {
            throw err
        }
    },
    blockMessages: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: args.conversation_id },
                { blocker: req.user._id },
                { new: true }
            )
            
            return conversation
        } catch (err) {
            throw err
        }
    }
}