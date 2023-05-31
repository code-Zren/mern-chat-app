const express = require("express");
const { registerUser, loginUser, allUsers } = require("../controllers/user");
const verified = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginUser);

router.route("/").post(registerUser).get(verified, allUsers);

module.exports = router;
