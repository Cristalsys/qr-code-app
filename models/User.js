const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: {
        type: String,
        default: 'https://previews.123rf.com/images/pandavector/pandavector1609/pandavector160900800/63731494-man-with-beard-icon-cartoon-single-avatar-peaople-icon-from-the-big-avatar-collection-.jpg'
    },
    organization: {type: String},
    publicKey: {type: String, required: true},
    privateKey: {type: String, required: true},
    role: { type: Number, default: 0 }
})

module.exports = model('User', schema)