require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding");

    const existing = await Admin.findOne({ email: "admin@think.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    // ❗ DO NOT HASH PASSWORD HERE
    const admin = new Admin({
      email: "admin@think.com",
      password: "admin123",
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    console.log("Login Email: admin@think.com");
    console.log("Login Password: admin123");

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });