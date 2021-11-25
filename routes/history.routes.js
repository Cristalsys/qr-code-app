const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth.middleware')

const {
    addHistory,
    getHistories,
    getHistory,
    deleteAllHistory,
    deleteHistory
} = require('../controllers/history')


// http://localhost:5000/api/history
router.post('/addHistory', auth, addHistory)
router.get('/', auth, getHistories)
router.get('/:id', auth, getHistory)
router.delete('/', auth, deleteAllHistory)
router.delete('/deleteHistory/:deleteId', auth, deleteHistory)

module.exports = router