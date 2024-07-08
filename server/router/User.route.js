const router = require('express').Router()
const Controller = require('../Controllers/User.controller')

router.post('/', Controller.addUser)

router.get("/:id", Controller.selectedUser);

router.get("/",  Controller.allUsers);

router.put("/:id",  Controller.updateUser);

router.delete("/:id", Controller.deleteUser);


module.exports = router