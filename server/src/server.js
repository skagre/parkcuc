const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')
const isAuth = require('./middlewares/auth')

const app = express()

app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/api',isAuth , graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

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

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
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

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
})

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        return res.json(file);
    })
})

app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'attachments' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err })
        }
    })
})

module.exports = app