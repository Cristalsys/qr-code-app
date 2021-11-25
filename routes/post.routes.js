const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth.middleware')
const upload = require('../utils/multerSettings')

const {
    getAllPost,
    getMyPosts,
    createPost,
    getPost,
    deletePost,
    editPostDetails,
    uploadImagePost,
    checkValidity

} = require('../controllers/post')


// http://localhost:5000/api/post
router.get('/', getAllPost)
router.get('/myPosts', auth, getMyPosts)
router.get('/:id', getPost)
router.post('/createPost', auth, createPost)
router.delete('/:id', auth, deletePost)
router.post('/editPostDetails/:postId', auth, editPostDetails)
router.post('/uploadImagePost/:postId', upload.single('productFile'), auth, uploadImagePost)
router.post('/checkValidity', auth, checkValidity)

module.exports = router