const mongoose = require("mongoose");
const bulkData = require("./data.js");
const Listing = require("../models/list.js");
async function main() {
  await mongoose.connect(
    "mongodb+srv://helloworld52980_db_user:airbnb123@cluster0.jbd5ohu.mongodb.net/?appName=Cluster0"
  );
}

main()
  .then((res) => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

let initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(bulkData.data);
  console.log("data was inilialize");
};

initDB()
  .then((res) => console.log("done data"))
  .catch((err) => console.log(err));
