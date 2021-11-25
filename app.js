const express = require('express')
const config = require('config')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const app = express()

const PORT = config.get('port') || 5000

// middleware
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors())

// routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/post', require('./routes/post.routes'))
app.use('/api/history', require('./routes/history.routes'))

async function start() {

    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`App has been start on PORT ${PORT} ... `)
        })
    } catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }

}

start()

