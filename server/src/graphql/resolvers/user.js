const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

module.exports = {
    register: async args => {
        try {
            const isUserExists = await User.findOne({ email: args.email })
            if (isUserExists) throw new Error('Oops! This Email address is already registered.')
            const hashedPassword = await bcrypt.hash(args.password, 10)

            const user = new User({
                name: args.name,
                email: args.email,
                password: hashedPassword
            })
            const result = await user.save()

            return { ...result._doc, password: null }
        } catch (err) {
            throw err
        }
    },
    login: async args => {
        try {
            const user = await User.findOne({
                $or: [
                    { email: args.emailOrSomething },
                    { username: args.emailOrSomething }
                ]
            })
            if (!user) throw new Error('Oops! Invalid login credentials.')
            
            const isPasswordMatch = await bcrypt.compare(args.password, user.password)
            if (!isPasswordMatch) throw new Error('Oops! Invalid login credentials.')
    
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY)
    
            user.tokens = user.tokens.concat({ token: token })
            await user.save()
    
            return { user_id: user._id, avatar: user.avatar, token: token }
        } catch (err) {
            throw err
        }
    },
    logout: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()

            return 'success'
        } catch (err) {
            throw err
        }
    },
    logoutAll: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()

            return 'success'
        } catch (err) {
            throw err
        }
    },
    imStatus: async (args, req) => {
        return !req.isAuth ? false : true
    },
    fetchUserInfo: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userInfo = await User.findOne({
                _id: req.user._id
            }).select({ _id: 1, email: 1, name: 1, username: 1, avatar: 1 })
            return userInfo
        } catch (err) {
            throw err
        }
    },
    sendFriendRequest: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id

            
            if (userA.toString() === userB.toString()) throw new Error('Oops! Can\'t send a friend request to yourself.')

            const isExistsRequest = await User.findOne({ 
                $and: [
                    { $or: [
                        { _id: userA }
                    ] },
                    { $or: [
                        { 'friends.accepted': userB },
                        { 'friends.pending': userB },
                        { 'friends.sent': userB }
                    ] }
                ]
            })
            if (isExistsRequest) throw new Error('Oops ! Failed to send a friend request.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $addToSet: { 'friends.sent': userB } }
            )
                
            await User.findOneAndUpdate(
                { _id: userB }, 
                { $addToSet: { 'friends.pending': userA } }
            )

            return 'success'
        } catch (err) {
            throw err
        }
    },
    acceptFriendRequest: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id

            const isPendingRequest = await User.findOne({
                $and: [
                    { $or: [
                        { _id: userA }
                    ] },
                    { $or: [
                        { 'friends.pending': userB }
                    ] }
                ]
            })
            if (!isPendingRequest) throw new Error('Oops ! Failed to accepted friend request.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.pending': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $addToSet: { 'friends.accepted': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.sent': userA } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $addToSet: { 'friends.accepted': userA } }
            )

            return 'success'
        } catch (err) {
            throw err
        }
    },
    deleteFriendRequest: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id

            const isExistsRequest = await User.findOne({ 
                $and: [
                    { $or: [
                        { _id: userA }
                    ] },
                    { $or: [
                        { 'friends.pending': userB },
                        { 'friends.sent': userB }
                    ] }
                ]
            })
            if (!isExistsRequest) throw new Error('Oops ! Failed to delete friend request.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.pending': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.sent': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.pending': userA } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.sent': userA } }
            )

            return 'success'
        } catch (err) {
            throw err
        }
    },
    unfriend: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const userA = req.user._id
            const userB = args.user_id

            const isFriend = await User.findOne({ 
                $and: [
                    { $or: [
                        { _id: userA }
                    ] },
                    { $or: [
                        { 'friends.accepted': userB }
                    ] }
                ]
            })
            if (!isFriend) throw new Error('Oops ! Failed to unfriend.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.accepted': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.accepted': userA } }
            )

            return 'success'
        } catch (err) {
            throw err
        }
    },
    fetchFriendLists: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const { offset = 0, limit = 20 } = args
            const count = await User.countDocuments({ _id: { $in: req.user.friends.accepted } })
            const users =  await User.find({ _id: { $in: req.user.friends.accepted } }).skip(offset).limit(limit)
            return {
                count,
                data: [...users.map(user => {
                    return { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }
                })]
            }
        } catch (err) {
            throw err
        }
    },
    fetchPendingRequests: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const { offset = 0, limit = 20 } = args
            const count = await User.countDocuments({ _id: { $in: req.user.friends.pending } })
            const users =  await User.find({ _id: { $in: req.user.friends.pending } }).skip(offset).limit(limit)

            return {
                count,
                data: [...users.map(user => {
                    return { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }
                })]
            }
        } catch (err) {
            throw err
        }
    },
    fetchSentRequests: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const { offset = 0, limit = 20 } = args
            const count = await User.countDocuments({ _id: { $in: req.user.friends.sent } })
            const users =  await User.find({ _id: { $in: req.user.friends.sent } }).skip(offset).limit(limit)

            return {
                count,
                data: [...users.map(user => {
                    return { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }
                })]
            }
        } catch (err) {
            throw err
        }
    },
    findFriend: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            if (args.search === '') return []
            const { offset = 0, limit = 20 } = args
            const users =  await User.find({
                $and: [
                    { $or: [
                        { _id: { $ne: req.user._id } }
                    ] },
                    { $or: [
                        { name: { $regex: args.search, $options: 'i' } },
                        { username: args.search },
                        { email: args.search }
                    ] }
                ]
            }).skip(offset).limit(limit)

            return [...users.map(user => {
                let status = 'new'
                if (user.friends.pending.includes(req.user._id))
                    status = 'sent'
                else if (user.friends.accepted.includes(req.user._id))
                    status = 'friend'

                return { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, status: status }
            })]

        } catch (err) {
            throw err
        }
    },
}