import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Always delete and recreate to ensure password is in sync
    await User.deleteOne({ email: "admin@solx.com" });
    console.log("Cleared old admin (if any)");

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "SolX Admin",
      email: "admin@solx.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("   Email:    admin@solx.com");
    console.log("   Password: Admin@123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
