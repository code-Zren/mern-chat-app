const asyncHandler = require("express-async-handler");
const MessageModel = require("../Models/Message");
const UserModel = require("../Models/User");
const ChatModel = require("../Models/Chat");

const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    next(error);
  }
});

const allMessages = asyncHandler(async (req, res, next) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = { sendMessage, allMessages };
