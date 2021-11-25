const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    body: {type: String},
    createdAt: {type: Date, default: Date.now()},
    filePath: {type: String, default: 'uploads\\2021-03-07T21-48-25.821ZnoImage.png'},
    expirationDate: {type: Date},
    signature: {type: String}
})

module.exports = model('Post', schema)