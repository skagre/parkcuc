const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));