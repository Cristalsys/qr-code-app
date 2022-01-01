const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth.middleware')
const isAdmin = require('../middlewares/auth.admin')

const {
    getAuthenticatedUser,
    uploadImage,
    editUserDetails,
    getAllUsers,
    deleteUser
} = require('../controllers/user')


// http://localhost:5000/api/user
router.get('/', auth, isAdmin, getAllUsers)
router.get('/me', auth, getAuthenticatedUser)
router.post('/uploadImage', auth, uploadImage)
router.post('/editUserDetails', auth, editUserDetails)
router.delete('/:userId', auth, isAdmin, deleteUser)


module.exports = router