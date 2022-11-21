const express = require("express");
const router = express.Router();
const { addUser, loginUser } = require("../controllers/UserController");
router.post("/add-user", addUser);
router.post("/login-user", loginUser);

module.exports = router;
