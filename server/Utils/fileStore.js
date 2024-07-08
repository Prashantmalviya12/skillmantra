const multer = require('multer')
const fs = require('fs')
const path = require('path')
const axios = require('axios')



var store = multer.diskStorage({
    destination: function (req, file, cb) {
        const dateObj = new Date()
        const month = dateObj.getUTCMonth() + 1
        const day = dateObj.getUTCDate()
        const year = dateObj.getUTCFullYear()
        if (!fs.existsSync('./uploads/' + year)) {
            fs.mkdirSync('./uploads/' + year)
        }
        if (!fs.existsSync('./uploads/' + year + '/' + month)) {
            fs.mkdirSync('./uploads/' + year + '/' + month)
        }
        cb(null, './uploads/' + year + '/' + month)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '_' + path.basename(generateRandomString(12), path.extname(file.originalname)) + path.extname(file.originalname))
    }
})

module.exports = {
    upload: multer({ storage: store }).single("file"),
    uploadImage: multer({ storage: store }).single("image")
}