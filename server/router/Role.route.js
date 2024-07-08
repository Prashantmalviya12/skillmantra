const router = require('express').Router()
const Controller = require('../Controllers/Role.controller')

router.post('/', Controller.addRole)

router.get("/:id",  Controller.selectedRoles);

router.get("/",  Controller.allRoles);

router.put("/:id", Controller.updateRole);

router.delete("/:id",  Controller.deleteRole);



module.exports = router

