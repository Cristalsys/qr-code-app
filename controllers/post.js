const {
    validatePostDetails
} = require('../utils/validators')

const rsa = require('node-rsa')
const Post = require('../models/Post')
const History = require('../models/History')
const User = require('../models/User')

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({createdAt: -1})
            .populate({
                path: 'user',
                select: 'firstName lastName avatar organization'
            })

        res.json(posts)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const getMyPosts = async (req, res) => {
    try {
        let posts = await Post.find()
            .sort({createdAt: -1})
            .populate({
                path: 'user',
                select: 'firstName avatar lastName organization'
            })

        const user = req.user.userAuth._id
        posts = posts.filter(post => post.user._id.toString() === user.toString())
        res.json(posts)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const createPost = async (req, res) => {
    try {

        const {body, expirationDate} = req.body
        const user = req.user.userAuth._id


        const {valid, errors} = validatePostDetails(req.body)
        if (!valid) return res.status(400).json(errors)


        let findUser = await User.findById({_id: user})

        let privateKey = await new rsa({b: 512})

        privateKey.importKey(findUser.privateKey)

        const signature = await privateKey.encryptPrivate(body, "base64")

        let post = new Post({
            body,
            user,
            expirationDate,
            signature
        })

        await post.save()

        res.json(post)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'something went wrong'})
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'firstName avatar lastName organization'
            })

        if (!post) {
            return res.status(400).json({message: 'post not found'})
        }

        res.json(post)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

const deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(422).json({message: 'post not found'})
        } else {
            if (post.user._id.toString() === req.user.userAuth._id.toString()) {
                const result = await post.remove()
                await History.deleteMany({post: post._id})
                res.json(result)
            }
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({error: 'Something went wrong'});
    }

}

const editPostDetails = async (req, res) => {
    try {
        const {valid, errors} = validatePostDetails(req.body)
        if (!valid) return res.status(400).json(errors)

        let findUser = await User.findById({_id: req.user.userAuth._id})

        let privateKey = await new rsa({b: 512})

        privateKey.importKey(findUser.privateKey)

        const signature = await privateKey.encryptPrivate(req.body.body, "base64")

        const details = await Post.findByIdAndUpdate(req.params.postId, {
            body: req.body.body,
            expirationDate: req.body.expirationDate,
            signature
        }, {new: true})
            .select('body expirationDate')

        return res.json(details)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e.code})
    }

}

const uploadImagePost = async (req, res) => {
    try {
        const filepath = req.file.path
        const filePath = await Post.findByIdAndUpdate(req.params.postId, {
            filePath: filepath
        }, {new: true})
            .select('filePath')

        return res.json(filePath)

    } catch (e) {
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    }

}

const checkValidity = async (req, res) => {
    try {
        const {body} = req.body
        const firstPublicKey = body.indexOf('publicKey')
        const firstSignature = body.indexOf('signature')
        const text = body.slice(4, firstPublicKey)
        const publicKey = body.slice(firstPublicKey + 9, firstSignature)
        const signature = body.slice(firstSignature + 9, body.length)
        let publicKeyRsa = await new rsa({b: 512})

        publicKeyRsa.importKey(publicKey)

        const decrypted = await publicKeyRsa.decryptPublic(signature, 'utf-8')
        const post = await Post.findOne(({signature}))

        return (text === decrypted) ? res.status(200).json({message: 'document id valid', postId: post._id})
            : res.status(400).json({message: 'document not valid'})

    } catch (e) {
        console.error(e);
        return res.status(404).json({message: 'document not valid'});
    }
}

module.exports = {
    getAllPost,
    getMyPosts,
    createPost,
    getPost,
    deletePost,
    editPostDetails,
    uploadImagePost,
    checkValidity
}