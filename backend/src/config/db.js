const mongoose = require("mongoose");

// Connects to MongoDB using the connection string from the environment.
// Works with either a local MongoDB server or a MongoDB Atlas cluster.
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment");
  }

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}

module.exports = connectDB;
