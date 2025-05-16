const express = require("express");
const router = express.Router();
const { home, register, login, user} = require("../controller/auth.controller.js");
const { signupSchema, loginSchema } = require("../validators/auth.validator.js");
const validate = require("../middlewares/validate.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js")


router.route('/').get(home);
router.route('/register').post(validate(signupSchema), register);
router.route('/login').post(validate(loginSchema), login);
router.route('/user').get(authMiddleware, user);


module.exports = router;