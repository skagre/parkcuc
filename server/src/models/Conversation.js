const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    name: {
        type: String
    },
    conversation_type: {
        type: String, // chat | group / myself
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true })

module.exports = mongoose.model('Conversation', conversationSchema)