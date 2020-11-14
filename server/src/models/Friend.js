const mongoose = require('mongoose')


const friendSchema = mongoose.Schema({
    requester: { 
        type: String, 
        ref: 'User'
    },
    recipient: { 
        type: String, 
        ref: 'User'
    },
    status: {
        type: Number,
        enums: [
            1,    //'requested',
            2,    //'pending',
            3,    //'friends'
        ]
    },
    create_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Friend', friendSchema)