const router = require('express').Router()
const Controller = require('../Controllers/Client.controller')
const {verifyAccessToken} = require('../Utils/jwtHelper')
const multer = require("multer")
 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// router.post('/',Controller.addClientDetails)
router.post("/", upload.single('image'), Controller.addClientDetails);
router.put('/:id', upload.single('image'), Controller.updateClientDetails);


router.get("/:id",  Controller.updateClientId);

router.get("/", Controller.allClients);

// router.put("/:id",Controller.updateClientDetails);

router.delete("/:id", Controller.deleteClient);



module.exports = router