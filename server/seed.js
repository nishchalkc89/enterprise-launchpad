require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
  
  await mongoose.disconnect();
}

seed().catch(console.error);
