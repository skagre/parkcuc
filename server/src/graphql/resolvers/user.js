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
            return result._id
        } catch (err) {
            throw err
        }
    },
    login: async args => {
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
        user.tokens = user.tokens.concat({ token })
        await user.save()

        return { userID: user._id, token: token }
    },
    logout: async args => {
        
    }
}