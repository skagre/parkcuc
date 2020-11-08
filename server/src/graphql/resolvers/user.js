const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')


module.exports = {
    register: async args => {
        try {
            const isUserExists = await User.findOne({ email: args.input.email })
            if (isUserExists) throw new Error('Email đã được đăng ký !')

            const hashedPassword = await bcrypt.hash(args.input.password, 10)

            const user = new User({
                name: args.input.name,
                email: args.input.email,
                password: hashedPassword,
                logs: {
                    created_at: Date.now()
                }
            })

            const result = await user.save()
            return result._id
        } catch (err) {
            throw err
        }
    },
    login: async (_, args) => {
        console.log(_)
        return User.findOne(args)
    }
}