const Conversation = require('../../models/Conversation')
const User = require('../../models/User')

module.exports = {
    createConversation: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const participantList = args.participant_id

            if (participantList.length === 1) {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'chat' }
                        ] },
                        { $or: [
                            { participants: { $all: [].concat.apply(userA, participantList) } },
                            { participants: { $size: participantList.length } }
                        ] }
                    ]
                })

                console.log(isExistsConversation)
                
                if (isExistsConversation) return isExistsConversation._id
                
                const conversation = new Conversation({
                    conversation_type: 'chat',
                    participants: [].concat.apply(userA, participantList)
                })

                result = await conversation.save()
                return result._id

            } else if (participantList.length > 1) {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'group' }
                        ] },
                        { $or: [
                            { participants: { $all: [].concat.apply(userA, participantList) } }
                        ] },
                        { $or: [
                            { participants: { $size: participantList.length } }
                        ] }
                    ]
                })
                console.log(isExistsConversation)
                if (isExistsConversation) return isExistsConversation._id
                

                const conversation = new Conversation({
                    conversation_type: 'group',
                    participants: [].concat.apply(userA, participantList)
                })
                result = await conversation.save()
                return result._id

                


            } else {
                return null
            }

            return false
            if (userA.toString() === userB.toString()) {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'chat' }
                        ] },
                        { $or: [
                            { participants: [userA] }
                        ] }
                    ]
                })
                if (!isExistsConversation) {
                    const conversation = new Conversation({
                        conversation_type: 'chat',
                        participants: [userA]
                    })
                    result = await conversation.save()
                }
            } 
            else {
                const isExistsConversation = await Conversation.findOne({
                    $and: [
                        { $or: [
                            { conversation_type: 'chat' }
                        ] },
                        { $or: [
                            { participants: [userA, userB] },
                            { participants: [userB, userA] }
                        ] }
                    ]
                })
                if (!isExistsConversation) {
                    const conversation = new Conversation({
                        conversation_type: 'chat',
                        participants: [userA, userB]
                    })
                    
                    result = await conversation.save()
                }
            }
            if (result)
                return { ...result._id }
            return "null"
        } catch (err) {
            throw err
        }
    }
}