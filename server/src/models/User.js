const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;
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
        accept: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        pending: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        sent: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    tokens: [{
        _id: false,
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)