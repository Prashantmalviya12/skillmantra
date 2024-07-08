const router = require('express').Router()
const Controller = require('../Controllers/Auth.controller')

router.post('/', Controller.userLogin)


module.exports = router