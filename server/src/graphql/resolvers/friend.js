const Friend = require('../../models/Friend')
const User = require('../../models/User')

module.exports = {
    addFriend: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        if (req.user._id.toString() === args.id.toString()) throw new Error('Oops! Can\'t send a friend request to yourself.')

        try {
            const userA = req.user._id
            const userB = args.id

            const docA = await Friend.findOneAndUpdate(
                { requester: userA, recipient: userB }, 
                { $set: { status: 1 } }, 
                { upsert: true, new: true }
            )
                
            const docB = await Friend.findOneAndUpdate(
                { requester: userB, recipient: userA }, 
                { $set: { status: 2 } }, 
                { upsert: true, new: true }
            )

            const updateUserA = await User.findOneAndUpdate(
                { _id: userA },
                { $push: { friends: docA._id }}
            )

            const updateUserB = await User.findOneAndUpdate(
                { _id: userB },
                { $push: { friends: docB._id }}
            )
            
            console.log(userB)

            return 'success'
        } catch (err) {
            throw err
        }
    },
}