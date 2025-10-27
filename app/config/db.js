const mongoose = require('mongoose');

const configdb = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb://adminAnu:anu123@localhost:27017/?authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
};

module.exports = configdb;
