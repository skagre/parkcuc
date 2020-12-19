const express = require('express')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const User = require('../models/User')
const mongoose = require('mongoose')
const router = express.Router()

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

router.post('/upload/avatar', upload.single('file'), async (req, res) => {
    if (!req.isAuth) return res.status(401).json({
        err: 'Oops! Not authorized to access this resource.'
    })
    if (!req.file) return res.status(400).json({
        err: 'Oops! No file upload.'
    })
    await User.findOneAndUpdate(
        { _id: req.user._id }, 
        { avatar: req.file.filename }
    )
    res.json({ file: req.file })
})

router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
        return res.status(404).json({
            err: 'No files exist'
        })
    }
        return res.json(files);
    })
})

router.get('/image/:filename', (req, res) => {
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

router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        return res.json(file);
    })
})

router.delete('/files/:id', (req, res) => {
    if (!req.isAuth) return res.status(401).json({
        err: 'Oops! Not authorized to access this resource.'
    })
    gfs.remove({ _id: req.params.id, root: 'attachments' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err })
        }
    })
})

router.get('/', (req, res) => {
    res.send("sa")
})

module.exports = router