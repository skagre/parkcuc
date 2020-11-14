const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const friendSchema = mongoose.Schema({
    requester: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    recipient: { 
        type: Schema.Types.ObjectId, 
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