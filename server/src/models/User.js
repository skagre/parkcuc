const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: value => {
            if (!validator.isLength(value, { max: 30 })) 
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
        default: null,
        trim: true
    },
    avatar: {
        type: String,
        default: null,
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
        last_login: {
            type: Date,
            default: null
        },
        last_password_reset: {
            type: Date,
            default: null
        }
    },
    friends: {
        accepted: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        pending: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        sent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    notifications: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        no_type: {
            type: String,
            required: true
        },
        has_read: {
            type: Boolean,
            default: false
        }
    }],
    tokens: [{
        _id: false,
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)