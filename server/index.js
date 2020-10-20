const app = require('./src/server')

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})