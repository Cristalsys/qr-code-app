const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const rsa = require('node-rsa')


const {
    validateSignupData,
    validateLoginData
} = require('../utils/validators')


const signup = async (req, res) => {
    try {

        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            organization: req.body.organization
        }


        const {valid, errors} = validateSignupData(newUser)

        if (!valid) return res.status(400).json(errors)
        const candidate = await User.findOne({email: newUser.email})
        if (candidate) {
            res.status(400).json({general: 'Email is already in use'})
        }

        let key = await new rsa({b: 512}).generateKeyPair()
        let publicKey = await key.exportKey("public")
        let privateKey = await key.exportKey("private")

        const hashedPassword = await bcrypt.hash(newUser.password, 12)
        const user = new User({
            email: newUser.email,
            password: hashedPassword,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            organization: newUser.organization,
            publicKey,
            privateKey

        })
        await user.save()

        const token = jwt.sign(
            {userAuth: user},
            config.get('jwtSecret'),
            {expiresIn: '5h'}
        )

        res.json({token})

    } catch (e) {
        console.log(e)
        res.status(500).json({error: e.code})
    }

}

const signin = async (req, res) => {
    try {
        const auth_user = {
            email: req.body.email,
            password: req.body.password
        }
        const {valid, errors} = validateLoginData(auth_user)

        if (!valid) return res.status(404).json(errors)
        const user = await User.findOne({email: auth_user.email})
        if (!user) {
            return res.status(404).json({general: 'Wrong credentials, please try again'})
        }
        let isMatch = await bcrypt.compare(auth_user.password, user.password)
        if (!isMatch) {
            return res.status(404).json({general: 'Wrong credentials, please try again'})
        }

        const token = jwt.sign(
            {userAuth: user},
            config.get('jwtSecret'),
            {expiresIn: '5h'}
        )

        res.status(200).json({token, userId: user.id})

    } catch (e) {
        console.log(e)
        return res
            .status(403)
            .json({general: 'Wrong credentials, please try again'});
    }
}

module.exports =
    {
        signup,
        signin,
    }