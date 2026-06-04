const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();
let app = express();

// router import

let RouterListing = require("./routes/listingRouter");
let RouterReview = require("./routes/reviewRouter");
let RouterUser = require("./routes/userRouter");
const { AsyncErrorHandler } = require("./errorhandle/errorhandle");

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connected mongoDB

let mongoURL = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(mongoURL);
}

main()
  .then(() => console.log("mongoDB connected sucessfully"))
  .catch((err) => console.log(err));

// connected to the frontend

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//

app.use("/api/listing", RouterListing);
app.use("/api/listing/review", RouterReview);
app.use("/api/auth", RouterUser);
// error middleware

app.use((req, res, next) => {
  next(new AsyncErrorHandler(404, "page not founded"));
});

app.use((err, req, res, next) => {
  let { statuscode = 500, message } = err;

  res.status(statuscode).send(message);
});

// create server

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
