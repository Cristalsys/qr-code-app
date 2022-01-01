const {
    validateUserDetails
} = require('../utils/validators')

const User = require('../models/User')
const {cloudinary} = require('../utils/cloudinary');
const config = require('config')
const Post = require("../models/Post");
const History = require("../models/History");


const getAllUsers = async (req, res) => {
    try {
        console.log('wr')
        let user = await User.find()
            .select("-password")
        if (!user) {
            return res.status(500).json({message: 'you are not in system'})
        }

        res.json(user)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}


const getAuthenticatedUser = async (req, res) => {
    try {
        let user = await User.findById(req.user.userAuth._id)
            .select("-password")
        if (!user) {
            return res.status(500).json({message: 'you are not in system'})
        }

        res.json(user)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const uploadImage = async (req, res) => {
    try {

        const uploadResponse = await cloudinary.uploader.upload(req.body.avatar, {
            upload_preset: config.get('upload_preset'),
        });

        await User.findByIdAndUpdate(req.user.userAuth._id, {
            avatar: uploadResponse.url
        }, {new: true})
            .select('avatar')

        return res.json({avatar: uploadResponse.url})

    } catch (e) {
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    }

}


const editUserDetails = async (req, res) => {
    try {
        const {valid, errors} = validateUserDetails(req.body)
        if (!valid) return res.status(400).json(errors)

        const details = await User.findByIdAndUpdate(req.user.userAuth._id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            organization: req.body.organization
        }, {new: true})
            .select('firstName lastName ')

        return res.json(details)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e.code})
    }

}

const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)

        if (!user) {
            return res.status(422).json({message: 'user not found'})
        } else {
            await User.deleteOne({_id: req.params.userId})
            res.json({message: 'user has been deleted'})
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({error: e.code})
    }

}

module.exports = {
    getAuthenticatedUser,
    uploadImage,
    editUserDetails,
    getAllUsers,
    deleteUser
}