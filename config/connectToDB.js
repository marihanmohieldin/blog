const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI);
    console.log("Connected To MongoDB Successfully!");
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error);
  }
};

module.exports = { connectToDB };
