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
    
            return { user_id: user._id, token: token }
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
                        { 'friends.accept': userB },
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
            if (!isPendingRequest) throw new Error('Oops ! Failed to accept friend request.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.pending': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $addToSet: { 'friends.accept': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.sent': userA } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $addToSet: { 'friends.accept': userA } }
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
                        { 'friends.accept': userB }
                    ] }
                ]
            })
            if (!isFriend) throw new Error('Oops ! Failed to unfriend.')

            await User.findOneAndUpdate(
                { _id: userA }, 
                { $pull: { 'friends.accept': userB } }
            )

            await User.findOneAndUpdate(
                { _id: userB }, 
                { $pull: { 'friends.accept': userA } }
            )

            return 'success'
        } catch (err) {
            throw err
        }
    },
    fetchFriendList: async (args, req) => {
        if (!req.isAuth) throw new Error('Oops! Not authorized to access this resource.')

        try {
            const { offset, limit } = args
            const users =  await User.find({ _id: { $in: req.user.friends.accept } }).skip(offset).limit(limit) 
            const a = users.map(user => {
                return { id: user._id, name: user.name, email: user.email }
            })
            console.log(a)
        } catch (err) {
            throw err
        }
    }
}