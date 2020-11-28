const Conversation = require('../../models/Conversation')

module.exports = {
    createConversation: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id

            if (userA.toString() === userB.toString()) {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'chat' }
                        ] },
                        { $or: [
                            { paticipants: [userA] }
                        ] }
                    ]
                })
                if (!isExistsConversation) {
                    const conversation = new Conversation({
                        conversation_type: 'chat',
                        paticipants: [userA]
                    })
                    await conversation.save()
                }
            } 
            else {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'chat' }
                        ] },
                        { $or: [
                            { paticipants: [userA, userB] },
                            { paticipants: [userB, userA] }
                        ] }
                    ]
                })
                if (!isExistsConversation) {
                    const conversation = new Conversation({
                        conversation_type: 'chat',
                        paticipants: [userA, userB]
                    })
                    await conversation.save()
                }
            }
            
            return 'success'
        } catch (err) {
            throw err
        }
    }
}