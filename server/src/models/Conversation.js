const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    name: {
        type: String
    },
    members: [],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Conversation', conversationSchema)