const { AsyncErrorHandler } = require("../errorhandle/errorhandle");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  singup
let authSingup = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body);
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  console.log("this is existing data", existingUser);

  if (existingUser) {
    throw new AsyncErrorHandler(400, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  const user = new User({ username, email, password: hashedPassword });
  let output = await user.save();
  // console.log(output);
  res.status(200).json({
    success: true,
    data: "Accout is created",
  });
};

// login

let authLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ username });
  if (!user) {
    throw new AsyncErrorHandler(400, "UserName not exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new AsyncErrorHandler(400, "Password is wrong");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // console.log(token);

  // Save in Cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// logout

let authLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    data: "Logged out successfully",
  });
};

// check author

let checkAuthor = async (req, res) => {
  let userDecoded = req.user;
  console.log(userDecoded);
  res.status(200).json({
    success: true,
    data: userDecoded,
  });
};

module.exports = { authSingup, authLogin, checkAuthor, authLogout };
