const express = require("express");
const { sendMessage, allMessages } = require("../controllers/message");
const verified = require("../middleware/auth");

const router = express.Router();

router.post("/", verified, sendMessage);

router.get("/:chatId", verified, allMessages);

module.exports = router;
