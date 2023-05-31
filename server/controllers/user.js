const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const allUsers = asyncHandler(async (req, res, next) => {
  const key = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await UserModel.find(key).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json("All fields are required!");
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json("User already exists");
    }
    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: passwordHashed,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        // token: jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
        //   expiresIn: "1d", }),
      });
    } else {
      res.status(400).json("Failed to register account");
    }
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json("All fields are required!");

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json("Invalid Password");

    if (user && isMatch) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: "1d",
        }),
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { allUsers, registerUser, loginUser };
