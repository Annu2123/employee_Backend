const mongoose = require('mongoose');

const configdb = async () => {
  try {
    const db =  mongoose.connect(
      "mongodb+srv://anubrathnike_db_user:reFnCg3kIFuQgz2h@employee.piqjrjy.mongodb.net/?appName=employee"
    
    );
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
};

module.exports = configdb;
