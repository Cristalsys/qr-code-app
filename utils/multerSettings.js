const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
        || file.mimetype === 'application/pdf'
    ) {
        cb(null, true)
    } else {
        cb(new Error('only image or png'), false)
    }
}

const upload = multer({
    storage, limits: {fileSize: 1024 * 1024 * 5}, fileFilter
})

module.exports = upload