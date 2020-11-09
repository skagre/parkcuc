const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: value => {
            if (!validator.isLength(value, { max: 10 })) 
                throw new Error('Oops! Your name too long.')
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value))
                throw new Error('Oops! Invalid Email address.')
        }
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true
    },
    state: {
        online: {
            type: Boolean,
            default: false
        },
        available: {
            type: Boolean,
            default: false
        }
    },
    logs: {
        created_at: {
            type: Date,
            default: Date.now()
        },
        last_login: {
            type: Date,
            default: null
        },
        last_password_reset: {
            type: Date,
            default: null
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)