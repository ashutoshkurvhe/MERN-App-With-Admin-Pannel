const express = require("express");
const adminController = require("../controller/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const adminMiddleware = require("../middlewares/admin.middleware")

const router = express.Router();

router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUsersById);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// router.route("/users/promoteUser/:id").patch(authMiddleware, adminMiddleware, adminController.promoteUserById);

// router.route("/users/demoteUser/:id").patch(authMiddleware, adminMiddleware, adminController.demoteUserById);

router.route("/users/updateAdminRole/:id").patch(authMiddleware, adminMiddleware, adminController.updateAdminRoleById);

router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);


module.exports = router;