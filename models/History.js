const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    post: {type: Types.ObjectId, ref: 'Post'},
    user: {type: Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
})

module.exports = model('History', schema)