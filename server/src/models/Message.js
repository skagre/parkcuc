const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String
    },
    unsend: {
        type: String, // everyone || myself
        default: null
    },
    attachments: []
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)