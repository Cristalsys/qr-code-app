const History = require('../models/History')

const addHistory = async (req, res) => {
    try {
        const {post} = req.body
        const user = req.user.userAuth._id


        let history = new History({
            post,
            user
        })

        await history.save()

        history = await history.populate({path: 'user', select: "firstName avatar "})
            .populate({path: 'post', select: "body"}).execPopulate()

        res.json(history)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'something went wrong'})
    }
}

const getHistories = async (req, res) => {
    try {
        let histories = await History.find()
            .sort({createdAt: -1})
            .populate({
                path: 'user',
                select: 'firstName avatar'
            })
            .populate({
                path: 'post',
                select: 'body'
            })

        const user = req.user.userAuth._id
        histories = histories.filter(history => history.user._id.toString() === user.toString())
        res.json(histories)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const getHistory = async (req, res) => {
    try {
        const history = await History.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'firstName avatar organization'
            }).populate({
                path: 'post',
                select: 'body expirationDate'
            })

        if (!history) {
            return res.status(400).json({message: 'history not found'})
        }

        res.json(history)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const deleteAllHistory = async (req, res) => {
    try {
        const result = await History.remove()
        res.json(result)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const deleteHistory = async (req, res) => {
    try {
        const result = await History.findByIdAndRemove({_id: req.params.deleteId})

        res.json(result)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

module.exports = {
    addHistory,
    getHistories,
    getHistory,
    deleteAllHistory,
    deleteHistory
}