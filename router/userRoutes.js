const { Router } = require("express");
const controller = require("../controller/userController");
const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.get("/email/:email", controller.getUserByEmail);
router.delete("/:id", controller.removeUser);
router.put("/:id", controller.updateUser);
router.post("/login", controller.getUserByEmail)

module.exports = router;
