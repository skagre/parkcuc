const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')
const isAuth = require('./middlewares/auth')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const User = require('./models/User')
const { PeerServer } = require('peer');
const Message = require('./models/Message')
const peerServer = PeerServer({ port: 9000, path: '/myapp' });



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
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/api',isAuth , graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

io.on('connection', (socket) => {
    socket.on('join', (conversation) => {
        socket.join(conversation)
    })

    socket.on('sendMessage', params => {
        io.to(params.conversation).emit('message', { message: params.message })
        io.to(params.conversation).emit('lastMessage', { message: params.message })
    })

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

let conn = mongoose.createConnection(process.env.MONGO_URL)
let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('attachments')
})

let storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err)
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname)
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'attachments'
                    };
                    resolve(fileInfo)
                })
            }
        )
    }
})
const upload = multer({ storage })

app.post('/upload/avatar', upload.single('file'), async (req, res) => {
    if (!req.isAuth) return res.status(401).json({
        err: 'Oops! Not authorized to access this resource.'
    })
    if (!req.file) return res.status(400).json({
        err: 'Oops! No file upload.'
    })
    if (req.file.size > 4 * 1024 * 1024) return res.status(400).json({
        err: 'Oops! Maximum allowed size for uploaded files (4MB).'
    })
    await User.findOneAndUpdate(
        { _id: req.user._id }, 
        { avatar: req.file.filename }
    )
    res.json({ file: req.file })
})

app.post('/upload/attachments', upload.array('file', 25), async (req, res) => {
    if (!req.isAuth) return res.status(401).json({
        err: 'Oops! Not authorized to access this resource.'
    })
    if (req.files.length === 0) return res.status(400).json({
        err: 'Oops! No files upload.'
    })

    const reqFiles = []
    req.files.forEach(file => {
        if (file.size > 25 * 1024 * 1024) return res.status(400).json({
            err: 'Oops! Maximum allowed size for uploaded files (25MB).'
        })
        reqFiles.push(file)
    })

    const message = new Message({
        sender: req.user._id,
        conversation: req.body.conversation,
        attachments: reqFiles
    })
    const result = await message.save()
    io.to(req.body.conversation).emit('message', { message: result })
    io.to(req.body.conversation).emit('lastMessage', { message: result })
    res.json({ file: req.files })
})

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'No files exist'
        })
    }
        return res.json(files);
    })
})

app.get('/attachment/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res)
    })
})

app.get('/file/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res)
    })
})

app.delete('/attachment/:id', (req, res) => {
    if (!req.isAuth) return res.status(401).json({
        err: 'Oops! Not authorized to access this resource.'
    })
    gfs.remove({ _id: req.params.id, root: 'attachments' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err })
        }
    })
})

module.exports = app