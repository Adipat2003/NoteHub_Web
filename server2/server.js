// setup
const express = require('express')
const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())

// get routes
const commentsRoute = require('./routes/comments')

// use routes
app.use('/comments', commentsRoute)

// run server
app.listen(PORT, () => {
    console.log('Server running on PORT ' + PORT)
})