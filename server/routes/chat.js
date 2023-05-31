const express = require("express");
const {
  accessChat,
  getChats,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  removeFromGroupChat,
} = require("../controllers/chat");
const verified = require("../middleware/auth");

const router = express.Router();

router.route("/").post(verified, accessChat).get(verified, getChats);

router.post("/group", verified, createGroupChat);

router.put("/rename", verified, renameGroupChat);

router.put("/groupAdd", verified, addToGroupChat);

router.put("/groupRemove", verified, removeFromGroupChat);

module.exports = router;
