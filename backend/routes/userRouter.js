const express = require("express");
const { catchAsync, AsyncErrorHandler } = require("../errorhandle/errorhandle");
const {
  authSingup,
  authLogin,
  checkAuthor,
  authLogout,
} = require("../controller/user");
const { verifyToken } = require("../middleware/auth");

let router = express.Router();

router.post("/singup", catchAsync(authSingup));
router.post("/login", catchAsync(authLogin));
router.get("/checkaouth", verifyToken, catchAsync(checkAuthor));
router.get("/logout", catchAsync(authLogout));

//
module.exports = router;
