const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    conversation_type: {
        type: String, // chat | group | myself
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    emoji: {
        type: String,
        default: '👍'
    },
    blocker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Conversation', conversationSchema)