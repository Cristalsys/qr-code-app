const express = require('express')
const config = require('config')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const path = require("path");

const app = express()



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

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, './client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client', 'build', 'index.html'))
    })

}

const PORT = process.env.PORT || 5000


async function start() {

    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
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

