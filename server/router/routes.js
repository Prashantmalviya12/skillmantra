const express = require("express");
const router = express.Router();
const controller = require("../Controllers/auth-controllers")
const multer = require("multer")

router.get("/" ,controller.home)

                            //  Role Master
router.post("/addRole",controller.addRole)
router.put("/updateRole/:id", controller.updateRole);
router.get("/allRoles" ,controller.allRoles)
router.get("/updateRole/:id" ,controller.selectedRoles)
router.delete("/deleteRole/:id", controller.deleteRole);

                              // Client Master

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/addClient", upload.single('image'), controller.addClientDetails);
router.put('/updateClient/:id', upload.single('image'), controller.updateClientDetails);
// router.put('/updateclient/:id', controller.updateClientDetails);
router.get("/allclients" ,controller.allClients)
router.get('/updateclient/:id', controller.updateClientId);
router.delete('/clients/:id', controller.deleteClient);

                            // UserManagement
router.post('/login', controller.userLogin);
router.post('/addUser', controller.addUser);
router.put('/updateUser/:id', controller.updateUser);
router.get("/allUsers" ,controller.allUsers)
router.get('/updateUser/:id', controller.selectedUser);
router.delete('/deleteUser/:id', controller.deleteUser);



module.exports =router