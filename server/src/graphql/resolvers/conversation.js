const Conversation = require('../../models/Conversation')

module.exports = {
    createConversation: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const participantList = args.participant_id

            if ([...new Set(participantList)].length !== participantList.length)
                return null

            const isMyself = userA.toString() === participantList[0].toString()

            let type = null
            if (participantList.length === 1)
                if (isMyself) type = 'myself'
                else type = 'chat'
            if (participantList.length > 1)
                type = 'group' 
                
            const isExistsConversation = await Conversation.findOne({
                $and: [
                    { $or: [
                        { conversation_type: type }
                    ] },
                    { $or: [
                        { participants: { $all: [].concat.apply(userA, participantList) } }
                    ] },
                    { $or: [
                        { participants: { $size: participantList.length + 1 } },
                    ] }
                ]
            })
            
            if (isExistsConversation) return isExistsConversation._id
            
            const conversation = new Conversation({
                conversation_type: type,
                participants: isMyself ? [].concat.apply(userA, participantList) : [].concat.apply(userA)
            })

            result = await conversation.save()
            return result._id

        } catch (err) {
            throw err
        }
    },
    fetchConversationLists: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const conversationLists = await Conversation.find(
                { participants: { $in: req.user._id } }
            )

            console.log(conversationLists)
        } catch (err) {
            throw err
        }
    }
}