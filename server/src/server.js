const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')
const isAuth = require('./middlewares/auth')
const router = require('./routers')



const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: process.env.CLIENT_CORS,
        methods: ["GET", "POST"],
        credentials: true
    }
})
httpServer.listen(process.env.SOCKET_IO)

app.use(isAuth)
app.use(router)
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/api',isAuth , graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

io.on('connection', (socket) => {
    console.log("shi")

    socket.on('disconnect', () => {
        console.log('disconnect')
    })
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = app