const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')


module.exports = {
    register: async args => {
        try {
            const isUserExists = await User.findOne({ email: args.input.email })
            if (isUserExists) throw new Error('Oops! This Email address is already registered.')

            const hashedPassword = await bcrypt.hash(args.input.password, 10)

            const user = new User({
                name: args.input.name,
                email: args.input.email,
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
}