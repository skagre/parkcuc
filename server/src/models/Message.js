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
    attachment: [{
        name: String,
        mime_type: String,
        size: String,
        url: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)