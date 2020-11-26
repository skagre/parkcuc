const Conversation = require('../../models/Conversation')

module.exports = {
    // createConversation: async (args, req) => {
    //     if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')
    //     try {
    //         const userA = req.user._id
    //         const userB = args.id

    //         const isConversationExists = Conversation.findOne({ 
    //             $and: [
    //                 { $or: [
    //                     { conversation_type: args.conversation_type }
    //                 ] },
    //                 { $or: [
    //                     { paticipants: { $all: [userA, userB] } }
    //                 ] }
    //             ]
    //         })
    //         if (!isConversationExists) {
    //             const newConversation = new Conversation({
    //                 conversation_type: args.conversation_type,
    //                 paticipants: args.
    //             })
    //         }
    //     } catch (err) {

    //     }
    // }
}